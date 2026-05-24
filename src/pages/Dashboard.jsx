import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import ExpensesChart from "../components/ExpensesChart";
import formatCurrency from "../utils/formatCurrency";
import generateReport from "../utils/generateReport";
function Dashboard() {

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

  const saldoTotal =
    totalIngresos - totalGastos;

  return (
    <MainLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-extrabold mb-2">
          Dashboard
        </h1>

        <p className="text-slate-400">
          Resumen financiero general
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <StatCard
          title="Saldo Total"
          amount={formatCurrency(saldoTotal)}
        />

        <StatCard
          title="Ingresos"
          amount={formatCurrency(totalIngresos)}
        />

        <StatCard
          title="Gastos"
          amount={formatCurrency(totalGastos)}
        />

      </div>

      <button
        onClick={() =>
            generateReport(ingresos, gastos)
        }
        className="
            bg-gradient-to-r
            from-blue-500
            to-cyan-400
            px-6
            py-4
            rounded-2xl
            font-bold
            shadow-xl
            mt-8
        "
        >
        Descargar reporte PDF
    </button>

      <ExpensesChart gastos={gastos} ingresos={ingresos} />

    </MainLayout>
  );
}

export default Dashboard;