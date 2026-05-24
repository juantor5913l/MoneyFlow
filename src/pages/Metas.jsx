import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import formatCurrency from "../utils/formatCurrency";

function Metas() {

  const [titulo, setTitulo] = useState("");
  const [objetivo, setObjetivo] = useState("");

  const [metas, setMetas] = useState(() => {

    const metasGuardadas =
      localStorage.getItem("metas");

    return metasGuardadas
      ? JSON.parse(metasGuardadas)
      : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "metas",
      JSON.stringify(metas)
    );

  }, [metas]);

  const ingresos =
    JSON.parse(localStorage.getItem("ingresos")) || [];

  const gastos =
    JSON.parse(localStorage.getItem("gastos")) || [];

  const totalIngresos = ingresos.reduce(
    (total, ingreso) => total + Number(ingreso.monto),
    0
  );

  const totalGastos = gastos.reduce(
    (total, gasto) => total + Number(gasto.monto),
    0
  );

  const saldoDisponible =
    totalIngresos - totalGastos;

  function agregarMeta() {

    if (!titulo || !objetivo) {
      return;
    }

    const nuevaMeta = {
      titulo,
      objetivo
    };

    setMetas([...metas, nuevaMeta]);

    setTitulo("");
    setObjetivo("");
  }

  function eliminarMeta(indexEliminar) {

    const nuevasMetas = metas.filter(
      (_, index) => index !== indexEliminar
    );

    setMetas(nuevasMetas);
  }

  return (
    <MainLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-extrabold">
          Metas Financieras
        </h1>

        <p className="text-slate-400 mt-2">
          Organiza tus objetivos de ahorro
        </p>

      </div>

      <div className="bg-slate-900 border border-slate-800 shadow-2xl p-8 rounded-3xl mb-8">

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Nombre de la meta"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-blue-500 text-white"
          />

          <input
            type="number"
            placeholder="Monto objetivo"
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            className="bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none focus:border-blue-500 text-white"
          />

          <button
            onClick={agregarMeta}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90 transition-all p-4 rounded-2xl font-bold shadow-lg"
          >
            Crear meta
          </button>

        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {metas.map((meta, index) => {

          const porcentaje =
            Math.min(
              (saldoDisponible / Number(meta.objetivo)) * 100,
              100
            );

          return (

            <div
              key={index}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl"
            >

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    {meta.titulo}
                  </h2>

                  <p className="text-slate-400 mt-2">
                    Objetivo:
                    {" "}
                    {formatCurrency(meta.objetivo)}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-green-400 font-bold text-xl">
                    {porcentaje.toFixed(0)}%
                  </p>

                </div>

              </div>

              <div className="w-full bg-slate-800 h-5 rounded-full overflow-hidden mb-4">

                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${porcentaje}%`
                  }}
                />

              </div>

              <div className="flex justify-between text-sm text-slate-400 mb-6">

                <p>
                  Ahorrado:
                  {" "}
                  {formatCurrency(saldoDisponible)}
                </p>

                <p>
                  Faltan:
                  {" "}
                  {formatCurrency(
                    Number(meta.objetivo) - saldoDisponible
                  )}
                </p>

              </div>

              <button
                onClick={() => eliminarMeta(index)}
                className="bg-gradient-to-r from-red-500 to-rose-400 hover:opacity-90 transition-all px-5 py-3 rounded-2xl font-bold"
              >
                Eliminar
              </button>

            </div>

          );

        })}

      </div>

    </MainLayout>
  );
}

export default Metas;