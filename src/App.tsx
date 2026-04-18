import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos tu nueva pantalla
import Login from './Pages/login';
import GestionUsuarios from './Pages/Gestion_Usuarios';
import Suscrpcion from './Pages/Suscrpcion';
import PerfilUsuario from './Pages/Perfil_Usuario';
import ForgotPassword from './Pages/forgot';

export default function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/Gestion_Usuarios" element={<GestionUsuarios />} />
        <Route path="/Suscrpcion" element={<Suscrpcion />} />
        <Route path="/Perfil_Usuario" element={<PerfilUsuario />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}