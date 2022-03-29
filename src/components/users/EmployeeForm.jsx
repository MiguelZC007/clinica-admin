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
    mother_lastname,
    birthdate,
    cellphone,
    ci,
    gender,
    address1,
    zone,
    state,
    city,
    country,
    email,
    password,
    blood_type,
    contact_name,
    contact_phone,
    relationship,
    underlying_disease,
    registration_age,
    observations,
    about_us,
    active,
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
        .post("/v1/users", {
          name: name,
          lastname: lastname,
          mother_lastname: mother_lastname,
          birthdate: birthdate,
          cellphone: cellphone,
          ci: ci,
          gender: gender,
          address1: address1,
          zone: zone,
          state: state,
          city: city,
          password: password,
          country: country,
          email: email,
          blood_type: blood_type,
          contact_name: contact_name,
          contact_phone: contact_phone,
          relationship: relationship,
          underlying_disease: underlying_disease,
          registration_age: registration_age,
          observations: observations,
          about_us: about_us,
          active: active,
        })
        .then((response) => {
          handleModify(response.data.user);
          handleClose();
        })
        .catch((e) => console.log(e));
    }
    if (action === "UPDATE") {
      axios
        .put("/v1/users/" + id, {
          name: name,
          lastname: lastname,
          mother_lastname: mother_lastname,
          birthdate: birthdate,
          cellphone: cellphone,
          ci: ci,
          gender: gender,
          address1: address1,
          zone: zone,
          state: state,
          city: city,
          country: country,
          email: email,
          blood_type: blood_type,
          contact_name: contact_name,
          password: password,
          contact_phone: contact_phone,
          relationship: relationship,
          underlying_disease: underlying_disease,
          registration_age: registration_age,
          observations: observations,
          about_us: about_us,
          active: active,
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
