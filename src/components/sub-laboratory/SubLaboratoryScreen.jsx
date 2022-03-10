import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Checkbox,
  IconButton,
  Grid,
  Paper,
  TableContainer,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MainContext } from "../../contexts/MainContext";
import axios from "../../boot/axios";
import Swal from "sweetalert2";
import { SubLaboratoryForm } from "./SubLaboratoryForm";

export const SubLaboratoryScreen = () => {
  const { setLoading } = React.useContext(MainContext);
  const [open, setOpen] = React.useState(false);
  const [subLaboratorys, setSubLaboratorys] = React.useState([]);
  const [action, setAction] = React.useState("");
  const [image, setImage] = React.useState("");
  const [subLaboratory, setSubLaboratory] = React.useState({
    id: "",
    name: "",
    product_id: "",
    category_id: "",
    reference_value_id: "",
  });

  const handleDelete = (id) => {
    axios
      .delete("/v1/analysis/" + id)
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
      .get("/v1/analysis")
      .then((response) => {
        setSubLaboratorys(response.data);
      })
      .catch((e) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleModify = (element) => {
    var data = subLaboratorys;
    let compare = data.filter((item) => item.id === element.id);
    compare.length > 0
      ? (data = data.map((item) => {
          if (item.id === element.id) {
            item = element;
          }
          return item;
        }))
      : data.push(element);
    setSubLaboratorys(data);
  };

  return (
    <React.Fragment>
      <Grid container justifyContent="center" margin="10px">
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              setAction("CREATE");
              setSubLaboratory({
                id: "",
                name: "",
                product_id: "",
                reference_value_id: "",
              });
              setOpen(true);
            }}
          >
            Crear Sub Laboratorio
          </Button>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <TableContainer sx={{ maxHeight: "70vh" }}>
          <Table size="small" stickyHeader sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                {Object.keys(subLaboratory).map((item, index) => {
                  return (
                    item !== "id" && (
                      <TableCell
                        key={index}
                        sx={{ width: "20%" }}
                        align="center"
                      >
                        {item}
                      </TableCell>
                    )
                  );
                })}
                <TableCell sx={{ width: "20%" }} align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subLaboratorys.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow>
                    {Object.keys(subLaboratory).map((item, index) => {
                      return (
                        item !== "id" && (
                          <TableCell
                            key={index}
                            sx={{ width: "20%" }}
                            align="center"
                          >
                            {item !== "state" ? (
                              row[item]
                            ) : (
                              <Checkbox
                                size="small"
                                readOnly
                                checked={row[item]}
                              />
                            )}
                          </TableCell>
                        )
                      );
                    })}
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          setAction("UPDATE");
                          setSubLaboratory({
                            id: row.id,
                            name: row.name,
                            product_id: row.product_id,
                            category_id: row.category_id,
                            reference_value_id: row.reference_value_id,
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
        <SubLaboratoryForm
          data={subLaboratory}
          openData={open}
          action={action}
          handleModify={handleModify}
          handleClose={() => setOpen(false)}
        />
      )}
    </React.Fragment>
  );
};
