import { useState } from "react";
import { crearDeuda } from "../utils/debtStorage";

function DebtForm({ actualizar }) {
  const [form, setForm] = useState({
    acreedor: "",
    descripcion: "",
    montoTotal: "",
    fechaVencimiento: "",
    esMensual: false // Nuevo campo
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const guardar = (e) => {
    e.preventDefault();

    if (!form.acreedor || !form.descripcion || !form.montoTotal) return;

    crearDeuda({
      ...form,
      montoTotal: Number(form.montoTotal)
    });

    setForm({
      acreedor: "",
      descripcion: "",
      montoTotal: "",
      fechaVencimiento: "",
      esMensual: false
    });

    actualizar();
  };

  return (
    <form
      onSubmit={guardar}
      className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 text-white"
    >
      <h2 className="text-xl font-bold">Nueva deuda</h2>

      <input
        className="w-full p-3 rounded bg-slate-800 text-white placeholder-slate-400 border border-slate-700"
        placeholder="Acreedor"
        name="acreedor"
        value={form.acreedor}
        onChange={handleChange}
      />

      <input
        className="w-full p-3 rounded bg-slate-800 text-white placeholder-slate-400 border border-slate-700"
        placeholder="Descripción"
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
      />

      <input
        className="w-full p-3 rounded bg-slate-800 text-white placeholder-slate-400 border border-slate-700"
        placeholder="Monto"
        type="number"
        name="montoTotal"
        value={form.montoTotal}
        onChange={handleChange}
      />

      <input
        className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700"
        type="date"
        name="fechaVencimiento"
        value={form.fechaVencimiento}
        onChange={handleChange}
      />

      {/* Opción Recurrente Mensual */}
      <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-300 py-1">
        <input
          type="checkbox"
          name="esMensual"
          checked={form.esMensual}
          onChange={handleChange}
          className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-0 focus:ring-offset-0"
        />
        <span>Cobrar mes a mes (deuda recurrente)</span>
      </label>

      <button className="w-full bg-blue-500 px-5 py-3 rounded-xl font-semibold hover:bg-blue-600 transition">
        Guardar deuda
      </button>
    </form>
  );
}

export default DebtForm;