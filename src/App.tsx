import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos tu nueva pantalla
import Login from './Pages/login'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Le decimos que cuando la ruta sea "/" (el inicio), muestre el Login */}
        <Route path="/" element={<Login />} />
        
        {/* Más adelante aquí pondremos la ruta de "/Gestion_Usuarios" */}
      </Routes>
    </BrowserRouter>
  );
}