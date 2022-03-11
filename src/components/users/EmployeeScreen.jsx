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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { MainContext } from "../../contexts/MainContext";
import axios from "../../boot/axios";
import Swal from "sweetalert2";
import { EmployeeForm } from "./EmployeeForm";
import * as moment from "moment";

export const EmployeeScreen = () => {
  const { setLoading } = React.useContext(MainContext);
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [action, setAction] = React.useState("");
  const [user, setUser] = React.useState({
    id: "",
    name: "",
    lastname: "",
    mother_lastname: "",
    birthdate: "",
    cellphone: "",
    ci: "",
    gender: "",
    address1: "",
    zone: "",
    state: "",
    city: "",
    country: "",
    email: "",
    assword: "",
    blood_type: "",
    contact_name: "",
    contact_phone: "",
    relationship: "",
    underlying_disease: "",
    registration_age: "",
    observations: "",
    about_us: "",
    createdAt: "",
    updatedAt: "",
    active: true,
  });

  const handleDelete = (id) => {
    axios
      .delete("/v1/users/" + id)
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

  const handleActive = (id) => {
    console.log("activando", id);
    axios
      .put("/v1/users/" + id, { active: true })
      .then((response) => {
        handleModify(response.data);
        Swal.fire({
          title: "Success!",
          text: "Activado Correctamente",
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
      .get("/v1/users")
      .then((response) => {
        let data = [];
        if (response.data.length > 0) {
          response.data.map((item) => {
            item.createdAt = formatDate(item.createdAt);
            item.updatedAt = formatDate(item.updatedAt);
            item.birthdate = formatDate(item.birthdate);
            data.push(item);
          });
        }
        setUsers(data);
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

  function formatDate(isoDate) {
    if (isoDate !== "" && isoDate !== null) {
      console.log("isoDate", isoDate);
      var d = new Date(isoDate).getDate();
      var m = new Date(isoDate).getMonth();
      var y = new Date(isoDate).getFullYear();
      m++;
      console.log(d, m, y);
      if (d < 10) {
        d = `0${d}`;
      }
      if (m < 10) {
        m = `0${m}`;
      }

      console.log("result", `${d}-${m}-${y}`);
      return `${d}-${m}-${y}`;
    } else {
      return "";
    }
  }

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
                mother_lastname: "",
                birthdate: "",
                cellphone: "",
                ci: "",
                gender: "",
                address1: "",
                zone: "",
                state: "",
                city: "",
                country: "",
                email: "",
                blood_type: "",
                contact_name: "",
                contact_phone: "",
                relationship: "",
                underlying_disease: "",
                registration_age: "",
                observations: "",
                about_us: "",
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
              {users.map((row) => {
                return (
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
                              mother_lastname: row.mother_lastname,
                              birthdate: row.birthdate,
                              cellphone: row.cellphone,
                              ci: row.ci,
                              gender: row.gender,
                              address1: row.address1,
                              zone: row.zone,
                              state: row.state,
                              city: row.city,
                              country: row.country,
                              email: row.email,
                              blood_type: row.blood_type,
                              contact_name: row.contact_name,
                              contact_phone: row.contact_phone,
                              relationship: row.relationship,
                              underlying_disease: row.underlying_disease,
                              registration_age: row.registration_age,
                              observations: row.observations,
                              about_us: row.about_us,
                              active: row.active,
                            });
                            setOpen(!open);
                          }}
                        >
                          <ModeEditIcon sx={{ color: "orange" }} />
                        </IconButton>
                        {row.active ? (
                          <IconButton
                            onClick={(e) => {
                              e.preventDefault();
                              setLoading(true);
                              handleDelete(row.id);
                            }}
                          >
                            <DeleteIcon sx={{ color: "red" }} />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={(e) => {
                              e.preventDefault();
                              setLoading(true);
                              handleActive(row.id);
                            }}
                          >
                            <CheckCircleIcon sx={{ color: "green" }} />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
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
