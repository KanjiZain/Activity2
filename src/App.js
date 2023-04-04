import "./App.css";
import Exercise1 from "./Exercises/Exercise1";
import Exercise2 from "./Exercises/Exercise2";
import Exercise3 from "./Exercises/Exercise3";
import Exercise4 from "./Exercises/Exercise4";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="exercise1">Exercise1</Link>
          <Link to="exercise2">Exercise2</Link>
          <Link to="exercise3">Exercise3</Link>
          <Link to="exercise4">Exercise4</Link>
        </nav>

        <h1>Welcome to Baham Home Page</h1>

        <Routes>
          <Route path="/exercise1" element={<Exercise1 />} />
          <Route path="/exercise2" element={<Exercise2 />} />
          <Route path="/exercise3" element={<Exercise3 />} />
          <Route path="/exercise4" element={<Exercise4 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
