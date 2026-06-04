import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import Login from './Pages/login';
import GestionUsuarios from './Pages/Gestion_Usuarios';
import Suscrpcion from './Pages/Suscrpcion';
import PerfilUsuario from './Pages/Perfil_Usuario';
import ForgotPassword from './Pages/forgot';
import StorybookPage from './Pages/Storybook';
import { DashboardShell }       from "@/Components/layout/DashboardShell";
import { RiskMapPage }          from "@/Pages/RiskMapPage";
import { HoyNoCirculaPage }     from "@/Pages/HoyNoCirculaPage";
import { FiltrarAlcaldiasPage } from "@/Pages/FiltrarAlcaldiasPage";
import { HistorialRiesgosPage } from "@/Pages/HistorialRiesgosPage";
import { DetalleAlcaldiaPage }  from "@/Pages/DetalleAlcaldiaPage";
//super admin ANA
import { SuperAdminPage }       from "@/Pages/SuperAdminPage";
import { Toaster } from 'sonner';
import type { UserRole } from './Services/backendApi';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function RoleRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}) {
  const { user, role } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  return role && allowedRoles.includes(role)
    ? <>{children}</>
    : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/login"            element={<Login />} />
        <Route path="/forgot"           element={<ForgotPassword />} />
        <Route path="/storybook"        element={<PrivateRoute><StorybookPage /></PrivateRoute>} />
        <Route element={<PrivateRoute><DashboardShell /></PrivateRoute>}>
          <Route path="/"               element={<RiskMapPage />} />
          <Route path="/historial"      element={<HistorialRiesgosPage />} />
          <Route path="/hoy-no-circula" element={<HoyNoCirculaPage />} />
          <Route path="/filtrar"        element={<FiltrarAlcaldiasPage />} />
          <Route path="/detalle"        element={<DetalleAlcaldiaPage />} />
          <Route
            path="/Gestion_Usuarios"
            element={<RoleRoute allowedRoles={['ADMIN']}><GestionUsuarios /></RoleRoute>}
          />
          <Route path="/Suscrpcion"       element={<Suscrpcion />} />
          <Route path="/Perfil_Usuario"   element={<PerfilUsuario />} />
          <Route
            path="/superadmin"
            element={<RoleRoute allowedRoles={['SUPER_ADMIN']}><SuperAdminPage /></RoleRoute>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
