import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Project from "./Pages/Project";

export default function App() {
  return (
      <BrowserRouter>
        <div className="container-fluid h-100">
          <div className="row bg-light text-dark mb-3 py-2">
            <div className="col-12">
              <h2>
                <Link to={"/"} className="text-dark">Project Manager</Link>
              </h2>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
          </Routes>
          <footer className="fixed-bottom border-top mt-5 p-3">
            <p className="m-0">&copy; Copyright iO Academy 2022</p>
          </footer>
        </div>
      </BrowserRouter>
  );
}
