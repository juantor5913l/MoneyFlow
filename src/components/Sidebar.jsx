import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  TrendingDown,
  Target
} from "lucide-react";

function Sidebar() {

  const location = useLocation();

  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Ingresos",
      path: "/ingresos",
      icon: <Wallet size={20} />
    },
    {
      name: "Gastos",
      path: "/gastos",
      icon: <TrendingDown size={20} />
    },
    {
      name: "Metas",
      path: "/metas",
      icon: <Target size={20} />
    }
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 p-6">

      <div className="mb-12">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          MoneyFlow
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          Finanzas inteligentes
        </p>

      </div>

      <nav className="flex flex-col gap-3">

        {links.map((link) => {

          const active = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`
                flex items-center gap-3
                px-4 py-3 rounded-2xl
                transition-all duration-200
                font-medium
                ${active
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }
              `}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;