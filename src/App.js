import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";

export default function App() {
  return (
      <BrowserRouter>
        <div className="container-fluid">
          <div className="row bg-light text-dark mb-3 py-2">
            <div className="col-12">
              <h2>
                <Link to={"/"} className="text-dark">Project Manager</Link>
              </h2>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <footer className="border-top mt-5 py-3">
            <p>&copy; Copyright iO Academy 2022</p>
          </footer>
        </div>
      </BrowserRouter>
  );
}
