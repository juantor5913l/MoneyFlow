function PaymentHistory({ deuda }) {

  if (deuda.abonos.length === 0) {

    return (

      <div className="mt-5">

        <h3 className="font-semibold mb-2">
          Historial
        </h3>

        <p className="text-slate-400">
          No hay abonos registrados.
        </p>

      </div>

    );

  }

  return (

    <div className="mt-5">

      <h3 className="font-semibold mb-3">
        Historial de Abonos
      </h3>

      <div className="space-y-2">

        {deuda.abonos.map((abono) => (

          <div
            key={abono.id}
            className="flex justify-between bg-slate-800 rounded-xl p-3"
          >

            <span>
              {abono.fecha}
            </span>

            <span className="text-green-400 font-semibold">
              ${abono.valor.toLocaleString()}
            </span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default PaymentHistory;