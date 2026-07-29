import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const titles = {
    "/": {
      title: "Dashboard Financiero",
      subtitle: "Controla tus ingresos y gastos",
    },
    "/ingresos": {
      title: "Ingresos",
      subtitle: "Gestiona tus ingresos",
    },
    "/gastos": {
      title: "Gastos",
      subtitle: "Controla tus gastos",
    },
    "/metas": {
      title: "Metas",
      subtitle: "Sigue tus objetivos financieros",
    },
    "/deudas": {
      title: "Deudas",
      subtitle: "Administra tus deudas y pagos",
    },
  };

  const current = titles[location.pathname] || titles["/"];

  return (
    <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
      <div>
        <h2 className="text-2xl font-bold">{current.title}</h2>

        <p className="text-slate-400 text-sm mt-1">
          {current.subtitle}
        </p>
      </div>

      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-lg shadow-lg">
        S
      </div>
    </header>
  );
}

export default Navbar;