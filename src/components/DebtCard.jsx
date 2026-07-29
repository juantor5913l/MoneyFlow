import { useState } from "react";

import {
  agregarAbono,
  eliminarDeuda
} from "../utils/debtStorage";

import PaymentHistory from "./PaymentHistory";
import PaymentModal from "./PaymentModal";

function DebtCard({ deuda, actualizar }) {

  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [modal, setModal] = useState(false);

  const porcentaje = Math.round(
    (deuda.totalAbonado / deuda.montoTotal) * 100
  );

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-xl font-bold">
        {deuda.acreedor}
      </h2>

      <p className="text-slate-400">
        {deuda.descripcion}
      </p>

      <div className="mt-5 space-y-2">

        <p>
          Total:
          <strong>
            {" "}
            ${deuda.montoTotal.toLocaleString()}
          </strong>
        </p>

        <p>
          Abonado:
          <strong className="text-green-400">
            {" "}
            ${deuda.totalAbonado.toLocaleString()}
          </strong>
        </p>

        <p>
          Pendiente:
          <strong className="text-red-400">
            {" "}
            ${deuda.saldoPendiente.toLocaleString()}
          </strong>
        </p>

      </div>

      <div className="mt-4 w-full h-3 rounded bg-slate-700">

        <div
          className={`h-3 rounded ${
            deuda.estado === "Saldada"
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
          style={{
            width: `${porcentaje}%`
          }}
        />

      </div>

      <p className="mt-2 text-sm">

        {porcentaje}% pagado

      </p>

      <p
        className={`mt-2 font-semibold ${
          deuda.estado === "Saldada"
            ? "text-green-400"
            : "text-yellow-400"
        }`}
      >
        {deuda.estado}
      </p>

      <div className="flex gap-3 mt-6 flex-wrap">

        <button
          onClick={() => setModal(true)}
          className="bg-green-500 px-4 py-2 rounded-xl"
        >
          Abonar
        </button>

        <button
          onClick={() =>
            setMostrarHistorial(!mostrarHistorial)
          }
          className="bg-slate-700 px-4 py-2 rounded-xl"
        >
          Historial
        </button>

        <button
          onClick={() => {

            if (confirm("¿Eliminar deuda?")) {

              eliminarDeuda(deuda.id);

              actualizar();

            }

          }}
          className="bg-red-500 px-4 py-2 rounded-xl"
        >
          Eliminar
        </button>

      </div>

      {mostrarHistorial && (
        <PaymentHistory
          deuda={deuda}
        />
      )}

      {modal && (
        <PaymentModal
          deuda={deuda}
          cerrar={() => setModal(false)}
          actualizar={() => {
            actualizar();
            setModal(false);
          }}
        />
      )}

    </div>

  );

}

export default DebtCard;