import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  IconButton,
  TableContainer,
  Grid,
  Paper,
  Checkbox,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import { MainContext } from "../../contexts/MainContext";
import axios from "../../boot/axios";
import Swal from "sweetalert2";
import { EmployeeForm } from "./EmployeeForm";

export const UserScreen = () => {
  const { setLoading } = React.useContext(MainContext);
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [action, setAction] = React.useState("");
  const [user, setUser] = React.useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    cellphone: "",
    ci: "",
    rol_id: "",
    active: true,
  });

  const handleDelete = (id) => {
    axios
      .delete("/v1/products/" + id)
      .then((response) => {
        handleModify(response.data);
        Swal.fire({
          title: "Success!",
          text: "Eliminado Correctamente",
          icon: "success",
          confirmButtonText: "ok",
          color: "green",
        });
      })
      .catch((e) => {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: e.response.data.message,
          icon: "error",
          confirmButtonText: "ok",
          color: "red",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    setLoading(true);
    axios
      .get("/v1/user-rols/employees")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((e) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleModify = (element) => {
    var data = users;
    let compare = data.filter((item) => item.id === element.id);
    compare.length > 0
      ? (data = data.map((item) => {
          if (item.id === element.id) {
            item = element;
          }
          return item;
        }))
      : data.push(element);
    setUsers(data);
  };

  return (
    <React.Fragment>
      <Grid container justifyContent="center" margin="10px">
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              setAction("CREATE");
              setUser({
                id: "",
                name: "",
                lastname: "",
                cellphone: "",
                email: "",
                ci: "",
                rol_id: "",
                active: true,
              });
              setOpen(true);
            }}
          >
            Registrar Empleado
          </Button>
        </Grid>
      </Grid>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <TableContainer sx={{ maxHeight: "75vh" }}>
          <Table stickyHeader sx={{ width: "100%" }} size="small">
            <TableHead>
              <TableRow>
                {Object.keys(user).map((item) => {
                  return (
                    <TableCell sx={{ width: "20%" }} align="center">
                      {item}
                    </TableCell>
                  );
                })}
                <TableCell sx={{ width: "20%" }} align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.lastname}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.ci}</TableCell>
                  <TableCell>{row.cellphone}</TableCell>
                  <TableCell>{row.birthdate}</TableCell>
                  <TableCell>{row.address1}</TableCell>
                  <TableCell>{row.rol}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        setAction("UPDATE");
                        setUser({
                          id: row.id,
                          name: row.name,
                          lastname: row.lastname,
                          email: row.email,
                          ci: row.ci,
                          rol_id: row.rol_id,
                          password: row.password,
                          confirm_password: row.confirm_password,
                          active: row.active,
                        });
                        setOpen(!open);
                      }}
                    >
                      <ModeEditIcon sx={{ color: "orange" }} />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(row.id);
                      }}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))} */}

              {users.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow>
                    {Object.keys(user).map((item, index) => {
                      return (
                        <TableCell
                          key={index}
                          sx={{ width: "20%" }}
                          align="center"
                        >
                          {item !== "active" ? (
                            row[item]
                          ) : (
                            <Checkbox
                              size="small"
                              readOnly
                              checked={row[item]}
                            />
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          setAction("UPDATE");
                          setUser({
                            id: row.id,
                            name: row.name,
                            lastname: row.lastname,
                            cellphone: row.cellphone,
                            email: row.email,
                            ci: row.ci,
                            rol_id: row.rol_id,
                            active: row.active,
                          });
                          setOpen(!open);
                        }}
                      >
                        <ModeEditIcon sx={{ color: "orange" }} />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(row.id);
                        }}
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {open && (
        <EmployeeForm
          data={user}
          openData={open}
          action={action}
          handleModify={handleModify}
          handleClose={() => setOpen(false)}
        ></EmployeeForm>
      )}
    </React.Fragment>
  );
};
