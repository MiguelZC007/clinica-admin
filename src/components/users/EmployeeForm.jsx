import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { useForm } from "../../hooks/useForm";
import axios from "../../boot/axios";
import { MainContext } from "../../contexts/MainContext";

export const EmployeeForm = ({
  action,
  openData,
  data,
  handleClose,
  handleModify,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    maxHeight: "70vh",
    overflow: "auto",
  };
  const { loading, setLoading } = React.useContext(MainContext);
  const [open] = React.useState(openData);
  const [rols, setRols] = React.useState([]);
  const [formValues, handleInputChange] = useForm(data);
  const {
    id,
    name,
    lastname,
    email,
    cellphone,
    ci,
    active,
    rol_id,
    rol,
    password,
    confirm_password,
  } = formValues;

  React.useEffect(() => {
    setLoading(true);
    axios
      .get("/v1/rols")
      .then((response) => {
        setRols(response.data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (action === "CREATE") {
      axios
        .post("/v1/auth/register/employee", {
          name: name,
          lastname: lastname,
          email: email,
          cellphone: cellphone,
          ci: ci,
          active: active,
          rol_id: rol_id,
          password: password,
          confirm_password: confirm_password,
        })
        .then((response) => {
          handleModify(response.data.user);
          handleClose();
        })
        .catch((e) => console.log(e));
    }
    if (action === "UPDATE") {
      axios
        .put("/v1/user-rols/user/" + id, {
          name: name,
          lastname: lastname,
          email: email,
          cellphone: cellphone,
          ci: ci,
          active: active,
          rol_id: rol_id,
          password: password,
          confirm_password: confirm_password,
        })
        .then((response) => {
          handleModify(response.data.user);
          handleClose();
        })
        .catch((e) => console.log(e));
    }
  };

  const formValidator = () => {
    return true;
  };

  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 400 }}>
          <Grid container component="main">
            <Typography component="h1" variant="h5">
              Empleado
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={handleInputChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="lastname"
                name="lastname"
                autoComplete="lastname"
                autoFocus
                value={lastname}
                onChange={handleInputChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="cellphone"
                label="cellphone"
                name="cellphone"
                autoComplete="cellphone"
                autoFocus
                value={cellphone}
                onChange={handleInputChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="ci"
                label="ci"
                name="ci"
                autoComplete="ci"
                autoFocus
                value={ci}
                onChange={handleInputChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleInputChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="password"
                name="password"
                autoComplete="password"
                autoFocus
                value={password}
                onChange={handleInputChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="confirm_password"
                label="confirm_password"
                name="confirm_password"
                autoComplete="confirm_password"
                autoFocus
                value={confirm_password}
                onChange={handleInputChange}
              />

              <Select
                fullWidth
                id="rol_id"
                name="rol_id"
                value={rol_id}
                label="Rol"
                onChange={handleInputChange}
              >
                {rols.map((rol) => {
                  return (
                    <MenuItem key={rol.id} value={rol.id}>
                      {rol.name}
                    </MenuItem>
                  );
                })}
              </Select>

              <FormControlLabel
                control={
                  <Checkbox
                    name="active"
                    label="active"
                    id="active"
                    checked={active}
                    onChange={handleInputChange}
                  />
                }
                label="Active"
              />

              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Guardar
              </Button>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
