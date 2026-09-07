export default function DailyReminderModal({ debts, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full shadow-xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          🔔 Recordatorio de Pagos
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
          Tienes los siguientes pagos pendientes o próximos a vencer:
        </p>

        <ul className="space-y-2 mb-6 max-h-60 overflow-y-auto">
          {debts.map((debt) => (
            <li
              key={debt.id}
              className="p-3 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{debt.title || debt.name}</p>
                <p className="text-xs text-amber-700 dark:text-amber-400">Vence: {debt.dueDate}</p>
              </div>
              <span className="font-bold text-amber-700 dark:text-amber-400">
                ${debt.amount}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}