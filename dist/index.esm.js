import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, Input, InputAdornment } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { PageStyle, BlockComponent, Header, MessageComponent, Card, CardHeader, CardBody, GridItem, CustomInput, GridContainer, Button, CardFooter } from '@hugo-85/autogestion-components';
import PhoneIcon from '@material-ui/icons/Phone';
import MaskedInput from 'react-text-mask';
import countries from 'countries-list';
import Autocomplete from '@material-ui/lab/Autocomplete';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

//export const reNombre = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
var reNombre = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ'])?$/; //Patente nueva (> 2016) ó patente vieja (< 2016)

var _excluded = ["inputRef"];

var styles = function styles(theme) {
  return _objectSpread2({}, PageStyle(theme));
};

var TextMaskCustom = function TextMaskCustom(props) {
  var inputRef = props.inputRef,
      other = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/React.createElement(MaskedInput, _extends({}, other, {
    ref: function ref(_ref) {
      inputRef(_ref ? _ref.inputElement : null);
    },
    mask: ["(", /[1-9]/, /\d/, ")", " ", "(", /[1-9]/, /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
    placeholderChar: "\u2000",
    showMask: true
  }));
};

function Profile(props) {
  var _parametros$AU_PERFIL, _parametros$AU_PERFIL2, _parametros$AU_PERFIL3;

  var classes = props.classes,
      headerProps = props.headerProps,
      parametros = props.parametros;

  var _useState = useState({
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
    AU_PERFIL_LBL_CAMPO3: ""
  }),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = useState(props.tipos_documentos || []),
      _useState4 = _slicedToArray(_useState3, 1),
      tipos_documentos = _useState4[0];

  var countriesList = Object.keys(countries.countries);

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      provincias = _useState6[0],
      setProvincias = _useState6[1];

  var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      provinciasList = _useState8[0],
      setProvinciasList = _useState8[1];

  var _useState9 = useState([]),
      _useState10 = _slicedToArray(_useState9, 2),
      localidades = _useState10[0],
      setLocalidades = _useState10[1];

  var _useState11 = useState([]),
      _useState12 = _slicedToArray(_useState11, 2),
      localidadesList = _useState12[0],
      setLocalidadesList = _useState12[1];

  var _useState13 = useState({
    message: null,
    color: null
  }),
      _useState14 = _slicedToArray(_useState13, 2),
      message = _useState14[0],
      setMessage = _useState14[1];

  var _useState15 = useState(false),
      _useState16 = _slicedToArray(_useState15, 2),
      loading = _useState16[0],
      setLoading = _useState16[1];

  var _useState17 = useState({
    nombre: {
      error: false,
      helpText: ""
    },
    nro_documento: {
      error: false,
      helpText: ""
    }
  }),
      _useState18 = _slicedToArray(_useState17, 2),
      validate = _useState18[0],
      setValidate = _useState18[1];

  var styles = {
    defaultSelect: {
      marginTop: "9px"
    },
    defaultCombo: {
      marginTop: "9px"
    }
  };

  var getGeofData = function getGeofData(data) {
    setLoading(true);
    Axios.get("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre").then(function (resp) {
      var provs = resp.data.provincias;
      provs.sort(function (a, b) {
        return a.nombre > b.nombre ? 1 : -1;
      });
      var aux = provs.map(function (p) {
        return {
          id: p.nombre,
          nombre: p.nombre
        };
      });
      setProvincias(aux);
      setProvinciasList(Object.keys(aux).map(function (p) {
        return aux[p].id;
      }));

      if (data.pais === "AR" && data.provincia) {
        var id = data.provincia;
        Axios.get("https://apis.datos.gob.ar/georef/api/localidades?provincia=".concat(id, "&campos=id,nombre,municipio&max=2000")).then(function (resp) {
          var locs = resp.data.localidades;
          locs.sort(function (a, b) {
            return a.nombre > b.nombre ? 1 : -1;
          });
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

          var aux = locs.map(function (l) {
            var _l$municipio, _l$municipio2;

            return {
              id: l !== null && l !== void 0 && (_l$municipio = l.municipio) !== null && _l$municipio !== void 0 && _l$municipio.nombre ? l.nombre + " - Municipio: " + l.municipio.nombre : l.nombre,
              nombre: l !== null && l !== void 0 && (_l$municipio2 = l.municipio) !== null && _l$municipio2 !== void 0 && _l$municipio2.nombre ? l.nombre + " - Municipio: " + l.municipio.nombre : l.nombre,
              municipio: l.municipio
            };
          });
          setLocalidades(aux);
          setLocalidadesList(Object.keys(aux).map(function (p) {
            return aux[p].id;
          }));
        });
      }

      setLoading(false);
    });
  };

  useEffect(function () {
    if (props !== null && props !== void 0 && props.data) {
      var aux = _objectSpread2({}, props.data);

      if (!aux.tipo_documento || aux.tipo_documento === "") aux.tipo_documento = tipos_documentos[0].tipoDocumento;
      setData(aux);
      getGeofData(aux);
    } else getGeofData();
  }, []);

  var validarItem = function validarItem(value, key) {
    var validate2 = {
      error: false,
      message: ""
    };

    if (key === "nombre") {
      validate2.error = !reNombre.test(value);
      validate2.error ? validate2.helpText = "Nombre inválido." : validate2.helpText = "";
    }

    return validate2;
  };

  var handleOnChangeValue = function handleOnChangeValue(e) {
    var res = validarItem(e.target.value, e.target.id);
    setValidate(_objectSpread2(_objectSpread2({}, validate), {}, _defineProperty({}, e.target.id, res)));
    setData(_objectSpread2(_objectSpread2({}, data), {}, _defineProperty({}, e.target.id, e.target.value)));
  };

  var handleOnChangeSelect = function handleOnChangeSelect(e) {
    //console.log(e);
    //const res = validarItem(e.value, e.name);
    //setValidate({ ...validate, [e.name]: res });
    setData(_objectSpread2(_objectSpread2({}, data), {}, _defineProperty({}, e.target.name, e.target.value)));
  };

  var habilitarDocumento = function habilitarDocumento() {
    return data.tipoDocumento !== undefined || data.tipoDocumento != null ? false : true;
  };

  var handleChangePais = function handleChangePais(id) {
    setData(_objectSpread2(_objectSpread2({}, data), {}, {
      pais: id,
      provincia: "",
      localidad: ""
    }));
  };

  var handleChangeProvincia = function handleChangeProvincia(nombre) {
    if (!nombre || nombre === "") return;
    setLoading(true);
    setData(_objectSpread2(_objectSpread2({}, data), {}, {
      provincia: nombre,
      localidad: ""
    }));
    Axios.get("https://apis.datos.gob.ar/georef/api/localidades?provincia=".concat(nombre, "&campos=id,nombre,municipio&max=2000")).then(function (resp) {
      var locs = resp.data.localidades;
      locs.sort(function (a, b) {
        return a.nombre > b.nombre ? 1 : -1;
      }); //locs = locs.filter(l => l.categoria.indexOf('compuesta') === -1);

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

      var aux = locs.map(function (l) {
        var _l$municipio3, _l$municipio4;

        return {
          id: l !== null && l !== void 0 && (_l$municipio3 = l.municipio) !== null && _l$municipio3 !== void 0 && _l$municipio3.nombre ? l.nombre + " - Municipio: " + l.municipio.nombre : l.nombre,
          nombre: l !== null && l !== void 0 && (_l$municipio4 = l.municipio) !== null && _l$municipio4 !== void 0 && _l$municipio4.nombre ? l.nombre + " - Municipio: " + l.municipio.nombre : l.nombre,
          municipio: l.municipio
        };
      });
      setLocalidades(aux);
      setLocalidadesList(Object.keys(aux).map(function (p) {
        return aux[p].id;
      }));
      setLoading(false);
    });
  };

  var handleTelefono = function handleTelefono(e, tel) {
    var aux = e.target.value.replace("(", "").replace(")", "").replace("+", "").replace(/\s/g, "");
    setData(_objectSpread2(_objectSpread2({}, data), {}, _defineProperty({}, tel, aux)));
  };

  var saveData = function saveData() {
    var errores = 0;
    Object.values(validate).map(function (v) {
      return v.error ? errores++ : true;
    });

    if (errores > 0) {
      setMessage({
        messageColor: "error",
        message: "Hay campos incorrectos."
      });
      return;
    }

    if (data.pais === "AR" && !data.provincia) {
      setMessage({
        messageColor: "error",
        message: "Debe ingresar una provincia."
      });
      return;
    }

    var perfil = {
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
      campo3: data.campo3
    };
    props.onSavePerfil(perfil);
  };

  var useStyles = makeStyles(function (theme) {
    var _theme$palette, _theme$palette$primar, _theme$palette2, _theme$palette2$prima;

    return {
      saveButton: {
        backgroundColor: (theme === null || theme === void 0 ? void 0 : (_theme$palette = theme.palette) === null || _theme$palette === void 0 ? void 0 : (_theme$palette$primar = _theme$palette.primary) === null || _theme$palette$primar === void 0 ? void 0 : _theme$palette$primar.main) || "grey",
        color: (theme === null || theme === void 0 ? void 0 : (_theme$palette2 = theme.palette) === null || _theme$palette2 === void 0 ? void 0 : (_theme$palette2$prima = _theme$palette2.primary) === null || _theme$palette2$prima === void 0 ? void 0 : _theme$palette2$prima.contrastText) || "white"
      }
    };
  });
  var classes2 = useStyles();
  return /*#__PURE__*/React.createElement(BlockComponent, {
    blocking: loading
  }, /*#__PURE__*/React.createElement(Header, _extends({}, headerProps, {
    showTitle: true
  }), /*#__PURE__*/React.createElement("div", null)), /*#__PURE__*/React.createElement(MessageComponent, message), /*#__PURE__*/React.createElement("div", {
    className: classes.wrapper
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 4
  }, /*#__PURE__*/React.createElement(Card, {
    className: classes.card
  }, /*#__PURE__*/React.createElement(CardHeader, null, "Datos Personales"), /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement("form", {
    autoComplete: "off",
    className: classes.root
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 8
  }, /*#__PURE__*/React.createElement(CustomInput, {
    labelText: "Apellido y Nombre",
    helpText: validate.nombre.helpText,
    error: validate.nombre.error,
    id: "nombre",
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      required: true,
      type: "text",
      value: data.nombre || "",
      onChange: handleOnChangeValue
    }
  }))), /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 4
  }, /*#__PURE__*/React.createElement(FormControl, {
    className: classes.formControl,
    fullWidth: true,
    style: styles.defaultSelect
  }, /*#__PURE__*/React.createElement(InputLabel, {
    htmlFor: "tipo_documento"
  }, "Tipo Documento"), /*#__PURE__*/React.createElement(Select //native {...this.bindValue('tipo_documento')}
  , {
    id: "tipo_documento",
    name: "tipo_documento",
    inputProps: {
      id: "tipo_documento"
    },
    className: classes.selectEmpty,
    MenuProps: {
      className: classes.selectMenu
    },
    onChange: handleOnChangeSelect,
    value: data.tipo_documento
  }, tipos_documentos.map(function (tipo, index) {
    return /*#__PURE__*/React.createElement(MenuItem, {
      key: index,
      value: tipo.tipoDocumento
    }, " ", tipo.descripcion);
  })))), /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 4
  }, /*#__PURE__*/React.createElement(CustomInput, {
    labelText: "N\xFAmero",
    id: "nroDocumento",
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      disabled: habilitarDocumento(),
      required: true,
      type: "number",
      value: data.nroDocumento || "",
      onChange: handleOnChangeValue
    }
  }))), /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 8
  }, /*#__PURE__*/React.createElement(CustomInput, {
    labelText: "Correo Electr\xF3nico",
    id: "mail",
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      disabled: true,
      required: true,
      type: "mail",
      value: data.mail
    }
  }))), /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 6
  }, /*#__PURE__*/React.createElement(Autocomplete, {
    id: "pais",
    name: "pais",
    options: countriesList,
    getOptionLabel: function getOptionLabel(option) {
      return !option ? "---" : countries.countries[option].name;
    },
    value: data.pais,
    onChange: function onChange(event, newValue) {
      return handleChangePais(newValue);
    },
    renderInput: function renderInput(params) {
      return /*#__PURE__*/React.createElement(TextField, _extends({}, params, {
        style: styles.defaultCombo,
        label: "Pais",
        margin: "normal"
      }));
    }
  })), /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 6
  }, data.pais === "AR" ? provincias.length > 0 ? /*#__PURE__*/React.createElement(Autocomplete, {
    id: "provincia",
    name: "provincia",
    required: true,
    options: provinciasList,
    getOptionLabel: function getOptionLabel(option) {
      var prov = provincias.find(function (p) {
        return p.id === option;
      });
      if (prov) return prov.nombre;
    },
    value: data.provincia || null,
    onChange: function onChange(event, newValue) {
      return handleChangeProvincia(newValue);
    },
    renderInput: function renderInput(params) {
      return /*#__PURE__*/React.createElement(TextField, _extends({}, params, {
        style: styles.defaultCombo,
        label: "Provincia",
        margin: "normal"
      }));
    }
  }) : /*#__PURE__*/React.createElement("div", null) : /*#__PURE__*/React.createElement(CustomInput, {
    labelText: "Provincia",
    id: "provincia",
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      required: true,
      type: "text",
      onChange: handleOnChangeValue,
      value: data.provincia
    }
  })), /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 9
  }, data.pais === "AR" ? localidades.length > 0 ? /*#__PURE__*/React.createElement(Autocomplete, {
    id: "localidad",
    name: "localidad",
    options: localidadesList,
    getOptionLabel: function getOptionLabel(option) {
      if (localidades.length > 0) {
        var loc = localidades.find(function (l) {
          return l.id === option;
        });
        if (loc) return loc.nombre;
      }

      return "---";
    },
    value: data.localidad || null,
    onChange: function onChange(event, newValue) {
      return setData(_objectSpread2(_objectSpread2({}, data), {}, {
        localidad: newValue
      }));
    },
    renderInput: function renderInput(params) {
      return /*#__PURE__*/React.createElement(TextField, _extends({}, params, {
        style: styles.defaultCombo,
        label: "Localidad",
        margin: "normal"
      }));
    }
  }) : /*#__PURE__*/React.createElement(CustomInput, {
    labelText: "Localidad",
    id: "localidadno",
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      required: true,
      disabled: true,
      type: "text",
      onChange: handleOnChangeValue,
      value: ""
    }
  }) : /*#__PURE__*/React.createElement(CustomInput, {
    labelText: "Localidad",
    id: "localidad",
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      required: true,
      type: "text",
      onChange: handleOnChangeValue,
      value: data.localidad
    }
  })), /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 3
  }, /*#__PURE__*/React.createElement(CustomInput, {
    labelText: "Codigo Postal",
    error: validate.nombre.error,
    id: "cod_postal",
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      required: true,
      type: "text",
      onChange: handleOnChangeValue,
      value: data.cod_postal
    }
  })), /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 8
  }, /*#__PURE__*/React.createElement(CustomInput, {
    labelText: "Calle",
    id: "calle",
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      required: true,
      type: "text",
      onChange: handleOnChangeValue,
      value: data.calle
    }
  })), /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 2
  }, /*#__PURE__*/React.createElement(CustomInput, {
    labelText: "Nro",
    id: "nro",
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      required: true,
      type: "text",
      onChange: handleOnChangeValue,
      value: data.nro
    }
  })), /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 4
  }, /*#__PURE__*/React.createElement(FormControl, null, /*#__PURE__*/React.createElement(InputLabel, {
    htmlFor: "telefono1"
  }, "Telefono1"), /*#__PURE__*/React.createElement(Input, {
    value: data.telefono1,
    onChange: function onChange(e) {
      return handleTelefono(e, "telefono1");
    },
    name: "textmask",
    id: "telefono1",
    inputComponent: TextMaskCustom,
    startAdornment: /*#__PURE__*/React.createElement(InputAdornment, {
      position: "start"
    }, /*#__PURE__*/React.createElement(PhoneIcon, null), " +")
  }))), /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 4
  }, /*#__PURE__*/React.createElement(FormControl, null, /*#__PURE__*/React.createElement(InputLabel, {
    htmlFor: "telefono2"
  }, "Telefono2"), /*#__PURE__*/React.createElement(Input, {
    value: data.telefono2,
    onChange: function onChange(e) {
      return handleTelefono(e, "telefono2");
    },
    name: "textmask",
    id: "telefono2",
    inputComponent: TextMaskCustom,
    startAdornment: /*#__PURE__*/React.createElement(InputAdornment, {
      position: "start"
    }, /*#__PURE__*/React.createElement(PhoneIcon, null), " +")
  }))), parametros && (parametros === null || parametros === void 0 ? void 0 : (_parametros$AU_PERFIL = parametros.AU_PERFIL_CAMPO1) === null || _parametros$AU_PERFIL === void 0 ? void 0 : _parametros$AU_PERFIL.valor) === "S" ? /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 6
  }, /*#__PURE__*/React.createElement(CustomInput, {
    labelText: parametros !== null && parametros !== void 0 && parametros.AU_PERFIL_LBL_CAMPO1 ? parametros.AU_PERFIL_LBL_CAMPO1.valor : "Campo 1",
    id: "campo1",
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      required: true,
      type: "text",
      value: data.campo1,
      onChange: handleOnChangeValue
    }
  })) : null, parametros && (parametros === null || parametros === void 0 ? void 0 : (_parametros$AU_PERFIL2 = parametros.AU_PERFIL_CAMPO2) === null || _parametros$AU_PERFIL2 === void 0 ? void 0 : _parametros$AU_PERFIL2.valor) === "S" ? /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 6
  }, /*#__PURE__*/React.createElement(CustomInput, {
    labelText: parametros !== null && parametros !== void 0 && parametros.AU_PERFIL_LBL_CAMPO2 ? parametros.AU_PERFIL_LBL_CAMPO2.valor : "Campo 2",
    id: "campo2",
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      required: true,
      type: "text",
      value: data.campo2,
      onChange: handleOnChangeValue
    }
  })) : null, parametros && (parametros === null || parametros === void 0 ? void 0 : (_parametros$AU_PERFIL3 = parametros.AU_PERFIL_CAMPO3) === null || _parametros$AU_PERFIL3 === void 0 ? void 0 : _parametros$AU_PERFIL3.valor) === "S" ? /*#__PURE__*/React.createElement(GridItem, {
    xs: 12,
    sm: 6
  }, /*#__PURE__*/React.createElement(CustomInput, {
    labelText: parametros !== null && parametros !== void 0 && parametros.AU_PERFIL_LBL_CAMPO3 ? parametros.AU_PERFIL_LBL_CAMPO3.valor : "Campo 3",
    id: "campo3",
    formControlProps: {
      fullWidth: true
    },
    inputProps: {
      required: true,
      type: "text",
      value: data.campo3,
      onChange: handleOnChangeValue
    }
  })) : null), /*#__PURE__*/React.createElement(GridContainer, {
    container: true,
    direction: "row",
    justify: "flex-end",
    alignItems: "flex-start"
  }, /*#__PURE__*/React.createElement(GridItem, null, /*#__PURE__*/React.createElement(Button, {
    onClick: saveData,
    className: classes2.saveButton
  }, "Guardar"))))), /*#__PURE__*/React.createElement(CardFooter, null)))));
}

var Profile$1 = withStyles(styles)(Profile);

export { Profile$1 as Profile };
