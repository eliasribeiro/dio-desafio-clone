import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Feed } from "./pages/feed";

import { Home } from './pages/home'
import { Login } from './pages/usuario/login'
import { Cadastro } from './pages/usuario/cadastro'
import { GlobalStyle } from './styles/global';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuario/login" element={<Login />} />
        <Route path="/usuario/cadastro" element={<Cadastro />} />
        <Route path="/feed" element={<Feed />} />
      </Routes >
    </Router>
  );
}

export default App;
