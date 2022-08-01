import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Project from "./Pages/Project";
import {useState} from "react";
import LocaleContext from "./utils/LocaleContext";

export default function App() {

  const [locale, setLocale] = useState('uk')

  return (
      <BrowserRouter>
        <div className="container-fluid h-100">
          <div className="row bg-light text-dark mb-3 py-2">
            <div className="col-7">
              <h2>
                <Link to={"/"} className="text-dark">Project Manager</Link>
              </h2>
            </div>
            <div className="col-5 text-right">
              <span className="btn-group">
                <button onClick={() => {setLocale('uk')}} className={"btn btn-light" + (locale === 'uk' ? ' active' : '')}>🇬🇧</button>
                <button onClick={() => {setLocale('us')}} className={"btn btn-light" + (locale === 'us' ? ' active' : '')}>🇺🇸</button>
              </span>
            </div>
          </div>
          <LocaleContext.Provider value={locale}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<Project />} />
              <Route path="/project/:id/task/:tid" element={<Project />} />
            </Routes>
          </LocaleContext.Provider>
          <footer className="fixed-bottom border-top mt-5 p-3">
            <p className="m-0">&copy; Copyright iO Academy 2022</p>
          </footer>
        </div>
      </BrowserRouter>
  );
}
