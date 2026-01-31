import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Abonement from "./components/Abonnement/Abonnement";
import Registration from "./components/Registration/Registration";
import Authorization from "./components/Authorization/Authorization";
import NotFound from "./components/404/NotFound";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <main key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/abonement" element={<Abonement />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}