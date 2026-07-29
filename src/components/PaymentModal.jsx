import { useState } from "react";
import { agregarAbono } from "../utils/debtStorage";

function PaymentModal({ deuda, cerrar, actualizar }) {

  const [valor, setValor] = useState("");

  const guardar = (e) => {
    e.preventDefault();

    const monto = Number(valor);

    if (monto <= 0) return;

    if (monto > deuda.saldoPendiente) {
      alert("El abono no puede ser mayor al saldo pendiente.");
      return;
    }

    agregarAbono(deuda.id, monto);

    actualizar();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 rounded-2xl p-6 w-[400px] border border-slate-700">

        <h2 className="text-2xl font-bold mb-5">
          Registrar Abono
        </h2>

        <p className="mb-2">
          Saldo pendiente:
        </p>

        <p className="text-red-400 font-bold text-xl mb-4">
          ${deuda.saldoPendiente.toLocaleString()}
        </p>

        <form
          onSubmit={guardar}
          className="space-y-4"
        >

          <input
            type="number"
            className="w-full p-3 rounded bg-slate-800"
            placeholder="Valor del abono"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={cerrar}
              className="px-5 py-2 rounded-xl bg-slate-700"
            >
              Cancelar
            </button>

            <button
              className="px-5 py-2 rounded-xl bg-green-500"
            >
              Guardar
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default PaymentModal;