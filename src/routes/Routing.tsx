import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../hoc/ProtectedRoute";
import Home from "../pages/Home/Home";
import AddPatient from "../pages/Patient/AddPatient";
import UpdatePatient from "../pages/Patient/UpdatePatient";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* higher order component (Protected route) -> Nesting the routes -- before you can access the inside route you need to pass through the protected route */}
      <Route path="/patient" element={<ProtectedRoute />}>
        <Route path="/patient" element={<Home />} />
        <Route path="/patient/add" element={<AddPatient />} />
        <Route path="/patient/update/:id" element={<UpdatePatient />} />
        <Route path="/patient/delete/:id" element={<Home />} />
      </Route>
    </Routes>
  );
}
