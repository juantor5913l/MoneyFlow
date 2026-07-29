import { useState } from "react";
import { crearDeuda } from "../utils/debtStorage";

function DebtForm({ actualizar }) {

  const [form, setForm] = useState({
    acreedor: "",
    descripcion: "",
    montoTotal: "",
    fechaVencimiento: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardar = (e) => {

    e.preventDefault();

    if (
      !form.acreedor ||
      !form.descripcion ||
      !form.montoTotal
    )
      return;

    crearDeuda({
      ...form,
      montoTotal: Number(form.montoTotal)
    });

    setForm({
      acreedor: "",
      descripcion: "",
      montoTotal: "",
      fechaVencimiento: ""
    });

    actualizar();

  };

  return (

    <form
      onSubmit={guardar}
      className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4"
    >

      <h2 className="text-xl font-bold">
        Nueva deuda
      </h2>

      <input
        className="w-full p-3 rounded bg-slate-800"
        placeholder="Acreedor"
        name="acreedor"
        value={form.acreedor}
        onChange={handleChange}
      />

      <input
        className="w-full p-3 rounded bg-slate-800"
        placeholder="Descripción"
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
      />

      <input
        className="w-full p-3 rounded bg-slate-800"
        placeholder="Monto"
        type="number"
        name="montoTotal"
        value={form.montoTotal}
        onChange={handleChange}
      />

      <input
        className="w-full p-3 rounded bg-slate-800"
        type="date"
        name="fechaVencimiento"
        value={form.fechaVencimiento}
        onChange={handleChange}
      />

      <button
        className="bg-blue-500 px-5 py-3 rounded-xl font-semibold hover:bg-blue-600"
      >
        Guardar deuda
      </button>

    </form>

  );

}

export default DebtForm;