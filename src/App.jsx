import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Series from "./components/pages/Series.jsx";
import Film from "./components/pages/Film.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        
        <Route path="/home" element={<Home />} />
        <Route path="/series" element={<Series />} />
        <Route path="/film" element={<Film />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;