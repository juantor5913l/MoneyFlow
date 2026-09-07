import { useState } from "react";

export default function DebtCalendar({ debts = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateDebts, setSelectedDateDebts] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Formato YYYY-MM-DD
  const formatDateStr = (y, m, d) => {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  };

  // Filtrar deudas correspondientes a un día del mes visible
  const getDebtsForDate = (day) => {
    const targetDateStr = formatDateStr(year, month, day);

    return debts.filter((d) => {
      const fecha = d.fechaVencimiento || d.fechaLimite || d.fecha;
      if (!fecha) return false;

      const fechaLimpia = String(fecha).split("T")[0];

      // 1. Coincidencia exacta de fecha
      if (fechaLimpia === targetDateStr) return true;

      // 2. Coincidencia para deudas mensuales
      if (d.esMensual) {
        const [dYear, dMonth, dDay] = fechaLimpia.split("-").map(Number);
        
        // Verificar si el mes/año visible es igual o posterior al mes/año de inicio
        const esMismoOPosterior =
          year > dYear || (year === dYear && (month + 1) >= dMonth);

        // Si el día guardado supera los días del mes actual (ej: día 31 en febrero), usar el último día disponible
        const diaEfectivo = Math.min(dDay, daysInMonth);

        return esMismoOPosterior && diaEfectivo === day;
      }

      return false;
    });
  };

  // Determinar color calculando la fecha proyectada en el mes visible
  const getDayStatusClass = (dayDebts, day) => {
    if (!dayDebts || !dayDebts.length) return "";

    const hoy = new Date();
    const todayStr = formatDateStr(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    
    // Fecha proyectada de este casillero del calendario (YYYY-MM-DD)
    const fechaCasilleroStr = formatDateStr(year, month, day);

    // Deuda vencida (Roja): La fecha proyectada del casillero es igual o anterior a hoy
    const tieneVencida = dayDebts.some((d) => {
      const saldo = d.saldoPendiente ?? d.montoTotal ?? 0;
      return saldo > 0 && fechaCasilleroStr <= todayStr;
    });

    if (tieneVencida) return "bg-red-500 text-white font-bold hover:bg-red-600";

    // Deuda pendiente hacia el futuro (Amarilla)
    const tienePendiente = dayDebts.some((d) => {
      const saldo = d.saldoPendiente ?? d.montoTotal ?? 0;
      return saldo > 0;
    });

    if (tienePendiente) return "bg-amber-500 text-white font-bold hover:bg-amber-600";

    // Deuda pagada (Verde)
    return "bg-emerald-500 text-white font-bold hover:bg-emerald-600";
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white">
      {/* Navegación por Mes */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold capitalize">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition"
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 text-center font-semibold text-xs text-slate-500 mb-2">
        <span>Dom</span>
        <span>Lun</span>
        <span>Mar</span>
        <span>Mié</span>
        <span>Jue</span>
        <span>Vie</span>
        <span>Sáb</span>
      </div>

      {/* Grid de días */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-10" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayDebts = getDebtsForDate(day);
          const statusClass = getDayStatusClass(dayDebts, day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => dayDebts.length && setSelectedDateDebts({ day, list: dayDebts })}
              className={`h-10 w-full flex items-center justify-center rounded-xl text-sm transition relative ${
                statusClass || "hover:bg-slate-800 text-slate-300"
              }`}
            >
              {day}
              {dayDebts.length > 0 && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white/80" />
              )}
            </button>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="flex items-center justify-around mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Vencida
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pendiente
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Pagada
        </div>
      </div>

      {/* Detalle del día al presionar */}
      {selectedDateDebts && (
        <div className="mt-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-semibold text-slate-300">
              Deudas del día {selectedDateDebts.day} de {monthNames[month]}
            </h4>
            <button
              type="button"
              onClick={() => setSelectedDateDebts(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cerrar
            </button>
          </div>
          <ul className="space-y-2">
            {selectedDateDebts.list.map((debt, i) => (
              <li
                key={debt.id || i}
                className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-900 border border-slate-800"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-200">{debt.acreedor}</p>
                    {debt.esMensual && (
                      <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">
                        Mensual
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-[10px]">{debt.descripcion}</p>
                </div>
                <span className="font-bold text-red-400">
                  ${(debt.saldoPendiente ?? debt.montoTotal ?? 0).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}