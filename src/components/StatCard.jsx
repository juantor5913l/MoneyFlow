function StatCard({ title, amount }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300">

      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

      <p className="text-slate-400 text-sm mb-3 font-medium">
        {title}
      </p>

      <h2 className="text-4xl font-extrabold tracking-tight">
        {amount}
      </h2>

      <div className="mt-4 text-green-400 text-sm font-semibold">
        +12% este mes
      </div>

    </div>
  );
}

export default StatCard;