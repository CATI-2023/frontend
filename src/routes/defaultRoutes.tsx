import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./privateRoutes";
// import { LoginPage } from "../pages/Login";
import { UserPage } from "../pages/User";
import { HomePage } from "../pages/Home";
import { MiniCursosPage } from "../pages/MiniCursos";
import { PalestrasPage } from "../pages/Palestras";
import { PresencaPage } from "../pages/Presenca";
import { LoginPage } from "../pages/Login";

export function DefaultRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Carregando ...</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<UserPage />} />
            <Route path="/mini-cursos" element={<MiniCursosPage />} />
            <Route path="/palestras" element={<PalestrasPage />} />
            <Route path="/presenca" element={<PresencaPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
