import { createContext, useEffect, useState } from "react";
import getSettings from "../services/settings/getSettings.services";
export const SettingsContext = createContext();

export default function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({});
  useEffect(() => {
    (async () => {
      const settings = await getSettings();
      setSettings(settings);
    })();
  }, []);
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
