import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "../pages/home";
import Colaborators from "../pages/colaborators";
import Layout from "../components/Layout/Layout";
import Profile from "../pages/profile";
import ProfilePDF from "../pages/profilePDF";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/colaborators/" element={<Colaborators />} />
          <Route path="/colaborators/:id" element={<Profile />} />
        </Route>
        <Route path="/colaborators/pdf/:id" element={<ProfilePDF />} />
      </Routes>
    </BrowserRouter>
  );
}
