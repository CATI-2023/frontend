import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./privateRoutes";
import { UserPage } from "../pages/userPages/User";
import { HomePage } from "../pages/Home";
import { OrganizacaoPalestrasPage } from "../pages/orgPages/Palestras";
import { LoginPage } from "../pages/Login";
import { InscricaoEventoPage } from "../pages/InscricaoEventoPage";
import { OrganizacaoPage } from "../pages/orgPages/Dashboard";
import { OrganizacaoMiniCursosPage } from "../pages/orgPages/MiniCursos";
import { OrganizacaoPresencaPage } from "../pages/orgPages/Presenca";
import { OrganizacaoApoiadoresPage } from "../pages/orgPages/Apoiadores";
import { OrganizacaoParticipantePage } from "../pages/orgPages/Participantes";
import { OrganizacaoEventoPage } from "../pages/orgPages/Eventos";
import { OrganizacaoInscricaoEventoPage } from "../pages/orgPages/InscricaoEvento";
import { OrganizacaoNoticiasPage } from "../pages/orgPages/Noticias";

export function DefaultRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Carregando ...</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/evento/:id/inscricao"
            element={<InscricaoEventoPage />}
          />

          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard/user/" element={<UserPage />} />
            <Route path="/dashboard/org/" element={<OrganizacaoPage />} />
            <Route
              path="/mini-cursos/org/"
              element={<OrganizacaoMiniCursosPage />}
            />
            <Route
              path="/palestras/org/"
              element={<OrganizacaoPalestrasPage />}
            />
            <Route
              path="/presenca/org/"
              element={<OrganizacaoPresencaPage />}
            />
            <Route
              path="/apoiadores/org/"
              element={<OrganizacaoApoiadoresPage />}
            />
            <Route
              path="/participantes/org/"
              element={<OrganizacaoParticipantePage />}
            />
            <Route
              path="/eventos/org/"
              element={<OrganizacaoEventoPage />}
            />
            <Route
              path="/inscricao-evento/org/"
              element={<OrganizacaoInscricaoEventoPage />}
            />
            <Route
              path="/noticias/org/"
              element={<OrganizacaoNoticiasPage />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
