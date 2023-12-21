import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./providers/AuthProvider";
import GuardedRoute from "./guards/GuardedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Content from "./pages/Content";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          element={
            <GuardedRoute isRouteAccessible={!isLoggedIn} redirectRoute="/" />
          }
        >
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route
          element={
            <GuardedRoute isRouteAccessible={isLoggedIn} redirectRoute="/" />
          }
        >
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
        <Route path="/content/:id" element={<Content />} />
      </Routes>
    </>
  );
}

export default App;
