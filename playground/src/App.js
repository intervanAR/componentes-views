import React from "react";
import { Profile } from "autogestion-views";

const App = () => {
  const tipos_documentos = [
    {
      tipoDocumento: "1",
      descripcion: "DNI",
      ID_EMPRESA: "1",
      RC_CODIGO_EXTERNO: "1",
    },
    {
      tipoDocumento: "7",
      descripcion: "CUIT-CUIL",
      ID_EMPRESA: "1",
      RC_CODIGO_EXTERNO: "7",
    },
  ];
  return (
    <div>
      <h2>P R O F I L E</h2>
      <Profile
        classes={{
          wrapper: "",
        }}
        tipos_documentos={tipos_documentos}
        data={{
          calle: "Buenos Aires",
          campo1: "nada 1",
          campo2: "nada 2",
          campo3: "nada 3",
          cod_postal: "8500",
          fotoUrl:
            "https://l h5.googleusercontent.com/-B2Om4YacV1Q/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckhzIVhXdd7u5ICCvyjMu84agUgrA/photo.jpg",
          id: "Lc85UjTPP8PweiZDAFIJI6omfmi1",
          id_empresa: "1",
          localidad: "06070010000",
          mail: "hugomargiotta@gmail.com",
          nombre: "Hugo Margiotta",
          nro: "181",
          nroDocumento: "30672913663",
          pais: "AR",
          provincia: "Río Negro",
          telefono1: "29(2042)533-3333",
          telefono2: null,
          tipoDocumento: "1",
          usuario: "Lc85UjTPP8PweiZDAFIJI6omfmi1",
        }}
      />
    </div>
  );
};

export default App;
