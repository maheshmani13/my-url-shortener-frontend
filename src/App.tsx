import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar.js";
import Landing from "./components/Landing.js";

function App() {
  return (
    <>
      <AppBar></AppBar>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
