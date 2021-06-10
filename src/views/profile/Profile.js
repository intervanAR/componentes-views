import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Grid,
  FormControl,
  MenuItem,
  Input,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  BlockComponent,
  Button,
  Header,
  MessageComponent,
  GridContainer,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput,
  PageStyle,
} from "@hugo-85/autogestion-components";
import PhoneIcon from "@material-ui/icons/Phone";
import MaskedInput from "react-text-mask";
import countries from "countries-list";
import { reNombre } from "../../lib/expRegulares";
import Autocomplete from "@material-ui/lab/Autocomplete";

const styles = (theme) => ({
  ...PageStyle(theme),
});

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
};

function Profile(props) {
  const { classes, headerProps, parametros } = props;
  const [data, setData] = useState({
    nombre: "",
    tipo_documento: "",
    nro_documento: "",
    mail: "",
    pais: "",
    provincia: "",
    localidad: "",
    cod_postal: "",
    calle: "",
    nro: "",
    telefono1: "",
    telefono2: "",
    campo1: "",
    campo2: "",
    AU_PERFIL_LBL_CAMPO3: "",
  });
  const [tipos_documentos] = useState(props.tipos_documentos || []);

  const countriesList = Object.keys(countries.countries);
  const [provincias, setProvincias] = useState([]);
  const [provinciasList, setProvinciasList] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [localidadesList, setLocalidadesList] = useState([]);
  const [message, setMessage] = useState({
    message: null,
    color: null,
  });
  const [loading, setLoading] = useState(false);

  const [validate, setValidate] = useState({
    nombre: {
      error: false,
      helpText: "",
    },
    nro_documento: {
      error: false,
      helpText: "",
    },
  });

  const styles = {
    defaultSelect: {
      marginTop: "9px",
    },
    defaultCombo: {
      marginTop: "9px",
    },
  };

  const getGeofData = (data) => {
    setLoading(true);
    Axios.get(
      "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre"
    ).then((resp) => {
      let provs = resp.data.provincias;
      provs.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));

      var aux = provs.map((p) => {
        return { id: p.nombre, nombre: p.nombre };
      });

      setProvincias(aux);
      setProvinciasList(Object.keys(aux).map((p) => aux[p].id));

      if (data.pais === "AR" && data.provincia) {
        var id = data.provincia;

        Axios.get(
          `https://apis.datos.gob.ar/georef/api/localidades?provincia=${id}&campos=id,nombre,municipio&max=2000`
        ).then((resp) => {
          let locs = resp.data.localidades;
          locs.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
          /*var aux = locs.reduce((acc, current) => {
            const x = acc.find((item) =>
              item.municipio.nombre !== null &&
              current.municipio.nombre !== null
                ? item.nombre +
                    " - Municipio: " +
                    item.municipio.nombre.toUpperCase() ===
                  current.nombre +
                    " - Municipio: " +
                    current.municipio.nombre.toUpperCase()
                : false
            );
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);*/

          var aux = locs.map((l) => {
            return {
              id: l?.municipio?.nombre
                ? l.nombre + " - Municipio: " + l.municipio.nombre
                : l.nombre,
              nombre: l?.municipio?.nombre
                ? l.nombre + " - Municipio: " + l.municipio.nombre
                : l.nombre,
              municipio: l.municipio,
            };
          });

          setLocalidades(aux);
          setLocalidadesList(Object.keys(aux).map((p) => aux[p].id));
        });
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (props?.data) {
      const aux = { ...props.data };
      if (!aux.tipo_documento || aux.tipo_documento === "")
        aux.tipo_documento = tipos_documentos[0].tipoDocumento;

      setData(aux);
      getGeofData(aux);
    } else getGeofData();
  }, []);

  const validarItem = (value, key) => {
    const validate2 = { error: false, message: "" };
    if (key === "nombre") {
      validate2.error = !reNombre.test(value);
      validate2.error
        ? (validate2.helpText = "Nombre inválido.")
        : (validate2.helpText = "");
    }
    return validate2;
  };

  const handleOnChangeValue = (e) => {
    const res = validarItem(e.target.value, e.target.id);
    setValidate({ ...validate, [e.target.id]: res });
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleOnChangeSelect = (e) => {
    //console.log(e);
    //const res = validarItem(e.value, e.name);
    //setValidate({ ...validate, [e.name]: res });
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const habilitarDocumento = () => {
    return data.tipoDocumento !== undefined || data.tipoDocumento != null
      ? false
      : true;
  };

  const handleChangePais = (id) => {
    setData({ ...data, pais: id, provincia: "", localidad: "" });
  };

  const handleChangeProvincia = (nombre) => {
    if (!nombre || nombre === "") return;

    setLoading(true);
    setData({ ...data, provincia: nombre, localidad: "" });

    Axios.get(
      `https://apis.datos.gob.ar/georef/api/localidades?provincia=${nombre}&campos=id,nombre,municipio&max=2000`
    ).then((resp) => {
      let locs = resp.data.localidades;
      locs.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
      //locs = locs.filter(l => l.categoria.indexOf('compuesta') === -1);
      /*locs = locs.filter((l) => {
        if (l.categoria.indexOf("Entidad") === -1) return l;
        else {
          if (l.municipio.id !== null) return l;
        }
      });*/
      //console.log("locs", locs);
      /*var aux = locs.reduce((acc, current) => {
        const x = acc.find((item) =>
          item.municipio.nombre !== null && current.municipio.nombre !== null
            ? item.nombre +
                " - Municipio: " +
                item.municipio.nombre.toUpperCase() ===
              current.nombre +
                " - Municipio: " +
                current.municipio.nombre.toUpperCase()
            : false
        );
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);*/

      var aux = locs.map((l) => {
        return {
          id: l?.municipio?.nombre
            ? l.nombre + " - Municipio: " + l.municipio.nombre
            : l.nombre,
          nombre: l?.municipio?.nombre
            ? l.nombre + " - Municipio: " + l.municipio.nombre
            : l.nombre,
          municipio: l.municipio,
        };
      });

      setLocalidades(aux);
      setLocalidadesList(Object.keys(aux).map((p) => aux[p].id));
      setLoading(false);
    });
  };

  const handleTelefono = (e, tel) => {
    let aux = e.target.value
      .replace("(", "")
      .replace(")", "")
      .replace("+", "")
      .replace(/\s/g, "");

    setData({ ...data, [tel]: aux });
  };

  const saveData = () => {
    var errores = 0;
    Object.values(validate).map((v) => (v.error ? errores++ : true));

    if (errores > 0) {
      setMessage({ messageColor: "error", message: "Hay campos incorrectos." });
      return;
    }

    if (data.pais === "AR" && !data.provincia) {
      setMessage({
        messageColor: "error",
        message: "Debe ingresar una provincia.",
      });
      return;
    }

    const perfil = {
      nombre: data.nombre,
      mail: data.mail,
      tipoDocumento: data.tipoDocumento,
      nroDocumento: data.nroDocumento,
      pais: data.pais || "AR",
      provincia: data.provincia,
      localidad: data.localidad,
      cod_postal: data.cod_postal,
      calle: data.calle,
      nro: data.nro,
      telefono1: data.telefono1,
      telefono2: data.telefono2,
      campo1: data.campo1,
      campo2: data.campo2,
      campo3: data.campo3,
    };

    props.onSavePerfil(perfil);
  };

  const useStyles = makeStyles((theme) => ({
    saveButton: {
      backgroundColor: theme?.palette?.primary?.main || "grey",
      color: theme?.palette?.primary?.contrastText || "white",
    },
  }));
  const classes2 = useStyles();

  return (
    <BlockComponent blocking={loading}>
      <Header {...headerProps} showTitle={true}>
        <div></div>
      </Header>
      <MessageComponent {...message} />
      <div className={classes.wrapper}>
        <Grid container spacing={4}>
          <Card className={classes.card}>
            <CardHeader>Datos Personales</CardHeader>
            <CardBody>
              <form autoComplete="off" className={classes.root}>
                <Grid container>
                  <GridItem xs={12} sm={8}>
                    <CustomInput
                      labelText="Apellido y Nombre"
                      helpText={validate.nombre.helpText}
                      error={validate.nombre.error}
                      id="nombre"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        type: "text",
                        value: data.nombre || "",
                        onChange: handleOnChangeValue,
                      }}
                    />
                  </GridItem>
                </Grid>

                <Grid container>
                  <GridItem xs={12} sm={4}>
                    <FormControl
                      className={classes.formControl}
                      fullWidth={true}
                      style={styles.defaultSelect}
                    >
                      <InputLabel htmlFor="tipo_documento">
                        Tipo Documento
                      </InputLabel>
                      <Select
                        //native {...this.bindValue('tipo_documento')}
                        id="tipo_documento"
                        name="tipo_documento"
                        inputProps={{
                          id: "tipo_documento",
                        }}
                        className={classes.selectEmpty}
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        onChange={handleOnChangeSelect}
                        value={data.tipo_documento}
                      >
                        {tipos_documentos.map((tipo, index) => {
                          return (
                            <MenuItem key={index} value={tipo.tipoDocumento}>
                              {" "}
                              {tipo.descripcion}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={4}>
                    <CustomInput
                      labelText="Número"
                      id="nroDocumento"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: habilitarDocumento(),
                        required: true,
                        type: "number",
                        value: data.nroDocumento || "",
                        onChange: handleOnChangeValue,
                      }}
                    />
                  </GridItem>
                </Grid>

                <Grid container>
                  <GridItem xs={12} sm={8}>
                    <CustomInput
                      labelText="Correo Electrónico"
                      id="mail"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        required: true,
                        type: "mail",
                        value: data.mail,
                      }}
                    />
                  </GridItem>
                </Grid>

                <Grid container>
                  <GridItem xs={12} sm={6}>
                    <Autocomplete
                      id="pais"
                      name="pais"
                      options={countriesList}
                      getOptionLabel={(option) =>
                        !option ? "---" : countries.countries[option].name
                      }
                      value={data.pais}
                      onChange={(event, newValue) => handleChangePais(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          style={styles.defaultCombo}
                          label="Pais"
                          margin="normal"
                        />
                      )}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={6}>
                    {data.pais === "AR" ? (
                      provincias.length > 0 ? (
                        <Autocomplete
                          id="provincia"
                          name="provincia"
                          required
                          options={provinciasList}
                          getOptionLabel={(option) => {
                            var prov = provincias.find((p) => p.id === option);

                            if (prov) return prov.nombre;
                            else "---";
                          }}
                          value={data.provincia || null}
                          onChange={(event, newValue) =>
                            handleChangeProvincia(newValue)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              style={styles.defaultCombo}
                              label="Provincia"
                              margin="normal"
                            />
                          )}
                        />
                      ) : (
                        <div></div>
                      )
                    ) : (
                      <CustomInput
                        labelText="Provincia"
                        id="provincia"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          type: "text",
                          onChange: handleOnChangeValue,
                          value: data.provincia,
                        }}
                      />
                    )}
                  </GridItem>

                  <GridItem xs={12} sm={9}>
                    {data.pais === "AR" ? (
                      localidades.length > 0 ? (
                        <Autocomplete
                          id="localidad"
                          name="localidad"
                          options={localidadesList}
                          getOptionLabel={(option) => {
                            if (localidades.length > 0) {
                              var loc = localidades.find(
                                (l) => l.id === option
                              );

                              if (loc) return loc.nombre;
                            }

                            return "---";
                          }}
                          value={data.localidad || null}
                          onChange={(event, newValue) =>
                            setData({
                              ...data,
                              localidad: newValue,
                            })
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              style={styles.defaultCombo}
                              label="Localidad"
                              margin="normal"
                            />
                          )}
                        />
                      ) : (
                        <CustomInput
                          labelText="Localidad"
                          id="localidadno"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            required: true,
                            disabled: true,
                            type: "text",
                            onChange: handleOnChangeValue,
                            value: "",
                          }}
                        />
                      )
                    ) : (
                      <CustomInput
                        labelText="Localidad"
                        id="localidad"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          type: "text",
                          onChange: handleOnChangeValue,
                          value: data.localidad,
                        }}
                      />
                    )}
                  </GridItem>

                  <GridItem xs={12} sm={3}>
                    <CustomInput
                      labelText="Codigo Postal"
                      error={validate.nombre.error}
                      id="cod_postal"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        type: "text",
                        onChange: handleOnChangeValue,
                        value: data.cod_postal,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={8}>
                    <CustomInput
                      labelText="Calle"
                      id="calle"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        type: "text",
                        onChange: handleOnChangeValue,
                        value: data.calle,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={2}>
                    <CustomInput
                      labelText="Nro"
                      id="nro"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        required: true,
                        type: "text",
                        onChange: handleOnChangeValue,
                        value: data.nro,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={4}>
                    <FormControl>
                      <InputLabel htmlFor="telefono1">Telefono1</InputLabel>
                      <Input
                        value={data.telefono1}
                        onChange={(e) => handleTelefono(e, "telefono1")}
                        name="textmask"
                        id="telefono1"
                        inputComponent={TextMaskCustom}
                        startAdornment={
                          <InputAdornment position="start">
                            <PhoneIcon /> +
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={4}>
                    <FormControl>
                      <InputLabel htmlFor="telefono2">Telefono2</InputLabel>
                      <Input
                        value={data.telefono2}
                        onChange={(e) => handleTelefono(e, "telefono2")}
                        name="textmask"
                        id="telefono2"
                        inputComponent={TextMaskCustom}
                        startAdornment={
                          <InputAdornment position="start">
                            <PhoneIcon /> +
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </GridItem>

                  {parametros && parametros?.AU_PERFIL_CAMPO1?.valor === "S" ? (
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        labelText={
                          parametros?.AU_PERFIL_LBL_CAMPO1
                            ? parametros.AU_PERFIL_LBL_CAMPO1.valor
                            : "Campo 1"
                        }
                        id="campo1"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          type: "text",
                          value: data.campo1,
                          onChange: handleOnChangeValue,
                        }}
                      />
                    </GridItem>
                  ) : null}

                  {parametros && parametros?.AU_PERFIL_CAMPO2?.valor === "S" ? (
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        labelText={
                          parametros?.AU_PERFIL_LBL_CAMPO2
                            ? parametros.AU_PERFIL_LBL_CAMPO2.valor
                            : "Campo 2"
                        }
                        id="campo2"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          type: "text",
                          value: data.campo2,
                          onChange: handleOnChangeValue,
                        }}
                      />
                    </GridItem>
                  ) : null}

                  {parametros && parametros?.AU_PERFIL_CAMPO3?.valor === "S" ? (
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        labelText={
                          parametros?.AU_PERFIL_LBL_CAMPO3
                            ? parametros.AU_PERFIL_LBL_CAMPO3.valor
                            : "Campo 3"
                        }
                        id="campo3"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          type: "text",
                          value: data.campo3,
                          onChange: handleOnChangeValue,
                        }}
                      />
                    </GridItem>
                  ) : null}
                </Grid>

                <GridContainer
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="flex-start"
                >
                  <GridItem>
                    <Button onClick={saveData} className={classes2.saveButton}>
                      Guardar
                    </Button>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Grid>
      </div>
    </BlockComponent>
  );
}

export default withStyles(styles)(Profile);
