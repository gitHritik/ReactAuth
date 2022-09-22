import Login from "./components/Login.js";
import Navbar from "./components/Navbar.js";
import Register from "./components/Register.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context.js";

function App() {
  const { user } = useContext(Context);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={user ? <Navbar /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
