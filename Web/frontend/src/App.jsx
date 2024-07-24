import { BrowserRouter, Route, Routes } from "react-router-dom"
import Inicio from "./pages/Inicio.jsx";
import Registro from "./pages/Registro.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { InicioSesion } from "./pages/IniciarSesion.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardAp from "./pages/DashboardAp.jsx";

const stored = localStorage.getItem('user')
const user = stored && stored !== 'undefined' ? JSON.parse(stored) : null;

function App() {

  return (
    <NextUIProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/InicioS" element={<InicioSesion />} />
          {user && user.rol === 'administrador' &&  (
            <>
            <Route path="/Dashboard" element={<Dashboard/>}/>
            </>
          )}
           {user && user.rol === 'adoptante' &&  (
            <>
            <Route path="/DashboarAp" element={<DashboardAp/>}/>
            </>
          )}
         
        </Routes>
    </BrowserRouter >
    </NextUIProvider>
  );
}

export default App;