import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Ingresos from "./pages/Ingresos";
import Gastos from "./pages/Gastos";
import Metas from "./pages/Metas";
import Deudas from "./pages/Deudas";

import DailyReminderModal from "./components/DailyReminderModal";
import { obtenerDeudas } from "./utils/debtStorage";

function App() {
  const [showReminder, setShowReminder] = useState(false);
  const [pendingDebts, setPendingDebts] = useState([]);

  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    const lastShown = localStorage.getItem("mf_last_reminder_date");

    if (lastShown !== todayStr) {
      const allDebts = obtenerDeudas() || [];
      
      const dueDebts = allDebts.filter((debt) => {
        const tieneSaldo = (debt.saldoPendiente ?? debt.amount ?? 1) > 0 && !debt.paid;
        if (!tieneSaldo) return false;

        const fecha = debt.fechaLimite || debt.fechaPago || debt.fecha || debt.dueDate;
        if (!fecha) return false;

        const diffDays = Math.ceil(
          (new Date(fecha) - new Date(todayStr)) / (1000 * 60 * 60 * 24)
        );
        return diffDays <= 3; // Alerta si venció o vence en los próximos 3 días
      });

      if (dueDebts.length > 0) {
        setPendingDebts(dueDebts);
        setShowReminder(true);
      }

      localStorage.setItem("mf_last_reminder_date", todayStr);
    }
  }, []);

  return (
    <BrowserRouter>
      {showReminder && (
        <DailyReminderModal
          debts={pendingDebts}
          onClose={() => setShowReminder(false)}
        />
      )}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ingresos" element={<Ingresos />} />
        <Route path="/gastos" element={<Gastos />} />
        <Route path="/deudas" element={<Deudas />} />
        <Route path="/metas" element={<Metas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;