import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Todos from "./pages/Todos";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
const App = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <NavBar />
      <div className="flex justify-center w-full">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Todos />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
