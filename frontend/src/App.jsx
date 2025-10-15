import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Exhibition from "./pages/Exhibition";
import ExhibitionTemp from "./pages/ExhibitionTemp";
import ArtworkDetails from "./pages/ArtworkDetalis";
import Gallery from "./pages/Gallery";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Header />
      <main className="p-6 bg-background dark:bg-background-dark min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/exhibition"
            element={
              <ProtectedRoute>
                <Exhibition />
              </ProtectedRoute>
            }
          />
          <Route path="/gallery/:id" element={<Gallery />} />
          <Route path="/exhibition/temp" element={<ExhibitionTemp />} />
          <Route path="/artwork/:id" element={<ArtworkDetails />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
