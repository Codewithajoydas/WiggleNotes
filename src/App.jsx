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
import { useContext, useEffect, useMemo } from "react";
import RestoreRoute from "./pages/RestoreRoute";
import Templates from "./pages/Templates";
import { SettingsContext } from "./store/Settings.context";
import { getThemeColors } from "./constants/Theme";

function App() {
  function RouteTracker() {
    const location = useLocation();
    useEffect(() => {
      localStorage.setItem("lastRoute", location.pathname);
    }, [location]);

    return null;
  }
  const { settings, setSettings } = useContext(SettingsContext);
  const colors = useMemo(
    () => getThemeColors(settings.theme, settings.accent_color),
    [settings.theme, settings.accent_color],
  );
  const fontSize = useMemo(() => {
    return settings.font_size;
  }, [settings.font_size]);
  const wordWrap = useMemo(() => {
    return settings.word_wrap;
  }, [settings.word_wrap]);
  useEffect(() => {
    document.body.setAttribute("data-font-size", fontSize);
    document.body.setAttribute("data-word-wrap", Boolean(Number(wordWrap)));
  }, [fontSize, wordWrap]);
  return (
    <HashRouter>
      <RouteTracker />
      <RestoreRoute />
      <div
        className="flex h-screen"
        style={{ backgroundColor: colors.bgPrimary, color: colors.textPrimary }}
      >
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
