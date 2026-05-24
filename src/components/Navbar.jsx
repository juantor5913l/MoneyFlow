function Navbar() {
  return (
    <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">

      <div>

        <h2 className="text-2xl font-bold">
          Dashboard Financiero
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Controla tus ingresos y gastos
        </p>

      </div>

      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-lg shadow-lg">
        S
      </div>

    </header>
  );
}

export default Navbar;