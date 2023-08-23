import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./privateRoutes";
// import { LoginPage } from "../pages/Login";
import { UserPage } from "../pages/User";
import { HomePage } from "../pages/Home";

export function DefaultRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Carregando ...</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/authentic" element={<UserPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
