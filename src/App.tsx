import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Pages/login';
import GestionUsuarios from './Pages/Gestion_Usuarios';
import Suscrpcion from './Pages/Suscrpcion';
import PerfilUsuario from './Pages/Perfil_Usuario';
import ForgotPassword from './Pages/forgot';
import StorybookPage from './Pages/Storybook';
import { DashboardShell }       from "@/components/layout/DashboardShell";
import { RiskMapPage }          from "@/Pages/RiskMapPage";
import { HoyNoCirculaPage }     from "@/Pages/HoyNoCirculaPage";
import { FiltrarAlcaldiasPage } from "@/Pages/FiltrarAlcaldiasPage";
import { HistorialRiesgosPage } from "@/Pages/HistorialRiesgosPage";
import { DetalleAlcaldiaPage }  from "@/Pages/DetalleAlcaldiaPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"            element={<Login />} />
        <Route path="/Gestion_Usuarios" element={<GestionUsuarios />} />
        <Route path="/Suscrpcion"       element={<Suscrpcion />} />
        <Route path="/Perfil_Usuario"   element={<PerfilUsuario />} />
        <Route path="/forgot"           element={<ForgotPassword />} />
        <Route path="/storybook"        element={<StorybookPage />} />
        <Route element={<DashboardShell />}>
          <Route path="/"               element={<RiskMapPage />} />
          <Route path="/historial"      element={<HistorialRiesgosPage />} />
          <Route path="/hoy-no-circula" element={<HoyNoCirculaPage />} />
          <Route path="/filtrar"        element={<FiltrarAlcaldiasPage />} />
          <Route path="/detalle"        element={<DetalleAlcaldiaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
