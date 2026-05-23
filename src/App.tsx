import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';

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
//super admin ANA
import { SuperAdminPage }       from "@/Pages/SuperAdminPage";
import { AlertasPage }          from "@/Pages/AlertasPage";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"            element={<Login />} />
        <Route path="/forgot"           element={<ForgotPassword />} />
        <Route path="/Gestion_Usuarios" element={<PrivateRoute><GestionUsuarios /></PrivateRoute>} />
        <Route path="/Suscrpcion"       element={<PrivateRoute><Suscrpcion /></PrivateRoute>} />
        <Route path="/Perfil_Usuario"   element={<PrivateRoute><PerfilUsuario /></PrivateRoute>} />
        <Route path="/storybook"        element={<PrivateRoute><StorybookPage /></PrivateRoute>} />
        <Route element={<PrivateRoute><DashboardShell /></PrivateRoute>}>
          <Route path="/"               element={<RiskMapPage />} />
          <Route path="/historial"      element={<HistorialRiesgosPage />} />
          <Route path="/hoy-no-circula" element={<HoyNoCirculaPage />} />
          <Route path="/filtrar"        element={<FiltrarAlcaldiasPage />} />
          <Route path="/detalle"        element={<DetalleAlcaldiaPage />} />
          <Route path="/superadmin"     element={<SuperAdminPage />} />
          <Route path="/alertas"        element={<AlertasPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
