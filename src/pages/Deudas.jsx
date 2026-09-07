import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import DebtForm from "../components/DebtForm";
import DebtCard from "../components/DebtCard";
import DebtCalendar from "../components/DebtCalendar";

import { obtenerDeudas } from "../utils/debtStorage";

function Deudas() {
  const [deudas, setDeudas] = useState([]);

  const cargarDeudas = () => {
    setDeudas(obtenerDeudas() || []);
  };

  useEffect(() => {
    cargarDeudas();
  }, []);

  const total = deudas.reduce(
    (acc, d) => acc + (d.saldoPendiente || 0),
    0
  );

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Gestión de Deudas
          </h1>
          <p className="text-slate-400 mt-2">
            Controla todas tus deudas, consulta las fechas en el calendario y registra abonos.
          </p>
        </div>

        {/* Resumen y Calendario */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h2 className="text-xl font-semibold text-white">
                Total pendiente
              </h2>
              <p className="text-4xl font-bold mt-3 text-red-400">
                ${total.toLocaleString()}
              </p>
            </div>

            {/* Calendario visual de pagos */}
            <DebtCalendar debts={deudas} />
          </div>

          {/* Formulario y Lista de tarjetas */}
          <div className="lg:col-span-2 space-y-8">
            <DebtForm actualizar={cargarDeudas} />

            <div className="grid md:grid-cols-2 gap-6">
              {deudas.length === 0 ? (
                <div className="text-slate-400 col-span-2">
                  No hay deudas registradas.
                </div>
              ) : (
                deudas.map((deuda) => (
                  <DebtCard
                    key={deuda.id}
                    deuda={deuda}
                    actualizar={cargarDeudas}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Deudas;