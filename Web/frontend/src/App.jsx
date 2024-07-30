import { BrowserRouter, Route, Routes } from "react-router-dom"
import Inicio from "./pages/Inicio.jsx";
import Registro from "./pages/Registro.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { InicioSesion } from "./pages/IniciarSesion.jsx";
import Dashboard from "./pages/Dashboard.jsx";


function App() {

  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/InicioS" element={<InicioSesion />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter >
    </NextUIProvider>
  );
}

export default App;