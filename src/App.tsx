import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout.tsx";
import Home from "./pages/home";
import Results from "./pages/results.tsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
