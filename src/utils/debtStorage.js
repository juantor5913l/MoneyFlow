const STORAGE_KEY = "deudas";

export const obtenerDeudas = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const guardarDeudas = (deudas) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deudas));
};

export const crearDeuda = (deuda) => {
  const deudas = obtenerDeudas();

  deudas.push({
    ...deuda,
    id: crypto.randomUUID(),
    totalAbonado: 0,
    saldoPendiente: Number(deuda.montoTotal),
    estado: "Pendiente",
    abonos: [],
    fechaCreacion: new Date().toLocaleDateString()
  });

  guardarDeudas(deudas);
};

export const eliminarDeuda = (id) => {
  const deudas = obtenerDeudas().filter(d => d.id !== id);
  guardarDeudas(deudas);
};

export const agregarAbono = (id, valor) => {

  const deudas = obtenerDeudas();

  const nuevas = deudas.map(deuda => {

    if (deuda.id !== id) return deuda;

    const nuevoAbonado = deuda.totalAbonado + Number(valor);

    const nuevoSaldo = Math.max(
      deuda.montoTotal - nuevoAbonado,
      0
    );

    return {
      ...deuda,
      totalAbonado: nuevoAbonado,
      saldoPendiente: nuevoSaldo,
      estado: nuevoSaldo === 0 ? "Saldada" : "Pendiente",
      abonos: [
        ...deuda.abonos,
        {
          id: crypto.randomUUID(),
          fecha: new Date().toLocaleDateString(),
          valor: Number(valor)
        }
      ]
    };

  });

  guardarDeudas(nuevas);

};

export const editarDeuda = (deudaEditada) => {

  const deudas = obtenerDeudas();

  const nuevas = deudas.map(d =>
    d.id === deudaEditada.id ? deudaEditada : d
  );

  guardarDeudas(nuevas);

};