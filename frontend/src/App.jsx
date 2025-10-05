import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Exhibition from "./pages/Exhibition";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <Router>
      <Header />
      <main className="p-6 bg-background dark:bg-background-dark min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="/gallery/:id" element={<Gallery />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
