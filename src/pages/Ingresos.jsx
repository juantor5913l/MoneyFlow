import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import  formatCurrency from "../utils/formatCurrency";
function Ingresos() {

  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");

  const [ingresos, setIngresos] = useState(() => {

    const ingresosGuardados =
      localStorage.getItem("ingresos");

   return ingresosGuardados
     ? JSON.parse(ingresosGuardados)
     : [];

 });

 useEffect(() => {

  localStorage.setItem(
    "ingresos",
    JSON.stringify(ingresos)
  );

}, [ingresos]);

  const totalIngresos = ingresos.reduce(
  (total, ingreso) => total + Number(ingreso.monto),
  0
);

function agregarIngreso() {

  if (!descripcion || !monto) {
    return;
  }

  const nuevoIngreso = {
    descripcion,
    monto,
    fecha: new Date().toISOString(),
    categoria: "Ingreso"
};

  setIngresos([...ingresos, nuevoIngreso]);

  setDescripcion("");
  setMonto("");
}
function eliminarIngreso(indexEliminar) {

  const nuevosIngresos = ingresos.filter(
    (_, index) => index !== indexEliminar
  );

  setIngresos(nuevosIngresos);
}

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Ingresos
      </h1>

      <div className="bg-green-500 p-4 rounded-xl mb-6">
            <h2 className="text-xl font-bold">
                Total ingresos: {formatCurrency(totalIngresos)}
            </h2>
        </div>

      <div className="bg-slate-800 p-6 rounded-2xl mb-6">

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="p-3 rounded-lg bg-slate-700 outline-none"
          />

          <input
            type="number"
            placeholder="Monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="p-3 rounded-lg bg-slate-700 outline-none"
          />

          <button
            onClick={agregarIngreso}
            className="bg-green-500 p-3 rounded-lg font-bold"
          >
            Agregar ingreso
          </button>

        </div>

      </div>

      <div className="flex flex-col gap-4">

        {ingresos.map((ingreso, index) => (

          <div
            key={index}
            className="bg-slate-800 p-4 rounded-xl"
          >
            <h3 className="font-bold">
              {ingreso.descripcion}
            </h3>

            <p className="text-green-400">
              {formatCurrency(ingreso.monto)}
            </p>
            <button
              onClick={() => eliminarIngreso(index)}
              className="bg-red-500 p-2 rounded-lg font-bold mt-2"
            >
              Eliminar
            </button>
          </div>
          

        ))}

      </div>

    </MainLayout>
  );
}

export default Ingresos;