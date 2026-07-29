import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Ingresos from "./pages/Ingresos";
import Gastos from "./pages/Gastos";
import Metas from "./pages/Metas";
import Deudas from "./pages/Deudas";

function App() {
  return (
    <BrowserRouter>
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