import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./privateRoutes";
// import { LoginPage } from "../pages/Login";
import { UserPage } from "../pages/userPages/User";
import { HomePage } from "../pages/Home";
import { UserMiniCursosPage } from "../pages/userPages/MiniCursos";
import { OrganizacaoPalestrasPage } from "../pages/orgPages/Palestras";
import { UserPresencaPage } from "../pages/userPages/Presenca";
import { LoginPage } from "../pages/Login";
import { OrganizacaoPage } from "../pages/orgPages/Dashboard";
import { OrganizacaoMiniCursosPage } from "../pages/orgPages/MiniCursos";
import { OrganizacaoPresencaPage } from "../pages/orgPages/Presenca";
import { OrganizacaoApoiadoresPage } from "../pages/orgPages/Apoiadores";
import { OrganizacaoParticipantePage } from "../pages/orgPages/Participantes";
import { OrganizacaoNoticiasPage } from "../pages/orgPages/Noticias";

export function DefaultRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Carregando ...</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard/user/:id" element={<UserPage />} />
            <Route
              path="/mini-cursos/user/:id"
              element={<UserMiniCursosPage />}
            />
            <Route path="/presenca/user/:id" element={<UserPresencaPage />} />
            <Route path="/dashboard/org/:id" element={<OrganizacaoPage />} />
            <Route
              path="/mini-cursos/org/:id"
              element={<OrganizacaoMiniCursosPage />}
            />
            <Route
              path="/palestras/org/:id"
              element={<OrganizacaoPalestrasPage />}
            />
            <Route
              path="/presenca/org/:id"
              element={<OrganizacaoPresencaPage />}
            />
            <Route
              path="/apoiadores/org/123"
              element={<OrganizacaoApoiadoresPage />}
            />
            <Route
              path="/participantes/org/123"
              element={<OrganizacaoParticipantePage />}
            />
            <Route
              path="/noticias/org/123"
              element={<OrganizacaoNoticiasPage />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
