import { Link, Route, Routes } from "react-router";
import Home from "./screens/Home";
import ShadcnUI from "./screens/ShadcnUI";

const Navigation = () => {
  return (
    <div className="flex gap-5 align-center justify-center text-sm underline mb-10">
      <Link to="/with-shadcn-ui">Try with Shadcn UI</Link>
      <Link className="opacity-50 pointer-events-none" to="/with-material-ui">
        Try with Material UI
      </Link>
    </div>
  );
};

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/with-shadcn-ui" element={<ShadcnUI />} />
      </Routes>
    </>
  );
}

export default App;
