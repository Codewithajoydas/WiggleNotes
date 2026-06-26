import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./Home";
import CreateFab from "./components/createFab";
import CreateNote from "./pages/CreateNote";
import ReadNote from "./pages/ReadNote";
import EditNote from "./pages/UpdateNote";
import FavNote from "./pages/FavNote";
import TrashNote from "./pages/TrashNote";
import Settings from "./pages/Settings";
import { useEffect } from "react";
import RestoreRoute from "./pages/RestoreRoute";
import Templates from "./pages/Templates";

function App() {
  function RouteTracker() {
    const location = useLocation();
    useEffect(() => {
      localStorage.setItem("lastRoute", location.pathname);
    }, [location]);

    return null;
  }
  return (
    <HashRouter>
      <RouteTracker />
      <RestoreRoute />
      <div className="flex h-screen bg-zinc-900 text-zinc-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-note" element={<CreateNote />} />
            <Route path="/read/note/:id" element={<ReadNote />} />
            <Route path="/edit/note/:id" element={<EditNote />} />
            <Route path="/favorites" element={<FavNote />} />
            <Route path="/trash" element={<TrashNote />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/templates" element={<Templates />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
