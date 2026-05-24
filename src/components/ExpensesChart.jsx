import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

function ExpensesChart({ gastos, ingresos }) {

  const categorias = {};

  gastos.forEach((gasto) => {

    if (categorias[gasto.categoria]) {
      categorias[gasto.categoria] += Number(gasto.monto);
    } else {
      categorias[gasto.categoria] = Number(gasto.monto);
    }

  });

  const totalIngresos = ingresos.reduce(
    (total, ingreso) => total + Number(ingreso.monto),
    0
  );

  categorias["Ingresos"] = totalIngresos;

  const data = Object.keys(categorias).map((categoria) => ({
    categoria,
    monto: categorias[categoria]
  }));

  const COLORS = {
    Comida: "#ef4444",
    Transporte: "#f59e0b",
    Servicios: "#3b82f6",
    Ocio: "#8b5cf6",
    Ingresos: "#22c55e"
  };

  return (
    <div   id="financial-chart"
   className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl mt-8">

      <div className="mb-8">

        <h2 className="text-2xl font-bold">
          Resumen financiero
        </h2>

        <p className="text-slate-400 mt-2">
          Comparación entre ingresos y gastos
        </p>

      </div>

      <div className="w-full h-96">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
            />

            <XAxis
              dataKey="categoria"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "16px",
                color: "#fff"
              }}
            />

            <Bar
              dataKey="monto"
              radius={[10, 10, 0, 0]}
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[entry.categoria] || "#3b82f6"}
                />

              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ExpensesChart;