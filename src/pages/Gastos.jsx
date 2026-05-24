import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import formatCurrency from "../utils/formatCurrency";
function Gastos() {

  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");

  const [gastos, setGastos] = useState(() => {

    const gastosGuardados =
      localStorage.getItem("gastos");

    return gastosGuardados
      ? JSON.parse(gastosGuardados)
      : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "gastos",
      JSON.stringify(gastos)
    );

  }, [gastos]);

  const totalGastos = gastos.reduce(
    (total, gasto) => total + Number(gasto.monto),
    0
  );

  function agregarGasto() {

    if (!descripcion || !monto) {
      return;
    }

    const nuevoGasto = {
        descripcion,
        monto,
        categoria,
        fecha: new Date().toISOString()
    };

    setGastos([...gastos, nuevoGasto]);

    setDescripcion("");
    setMonto("");
    setCategoria("");
  }

  function eliminarGasto(indexEliminar) {

    const nuevosGastos = gastos.filter(
      (_, index) => index !== indexEliminar
    );

    setGastos(nuevosGastos);
  }

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Gastos
      </h1>

      <div className="bg-red-500 p-4 rounded-xl mb-6">
        <h2 className="text-xl font-bold">
          Total gastos: {formatCurrency(totalGastos)}
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
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="p-3 rounded-lg bg-slate-700 outline-none"
            >

            <option value="">
                Selecciona categoría
            </option>

            <option value="Comida">
                🍔 Comida
            </option>

            <option value="Transporte">
                ⛽ Transporte
            </option>

            <option value="Servicios">
                📱 Servicios
            </option>

            <option value="Ocio">
                🎮 Ocio
            </option>

            </select>

          <button
            onClick={agregarGasto}
            className="bg-red-500 p-3 rounded-lg font-bold"
          >
            Agregar gasto
          </button>

        </div>

      </div>

      <div className="flex flex-col gap-4">

        {gastos.map((gasto, index) => (

          <div
            key={index}
            className="bg-slate-800 p-4 rounded-xl"
          >
            <h3 className="font-bold">
              {gasto.descripcion}
            </h3>
            <p className="text-slate-400 text-sm">
            {gasto.categoria}
            </p>

            <p className="text-red-400">
              {formatCurrency(gasto.monto)}
            </p>

            <button
              onClick={() => eliminarGasto(index)}
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

export default Gastos;