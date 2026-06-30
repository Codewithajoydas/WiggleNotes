import { useContext } from "react";
import { SettingsContext } from "../../store/Settings.context";
import { getThemeColors } from "../../constants/Theme";

export default function Divider({ }) {
  const { settings } = useContext(SettingsContext);
  const colors = getThemeColors(settings.theme, settings.accent_color);
  return (
    <div
      className="mx-1 h-7 w-px shrink-0"
      style={{ backgroundColor: colors?.border ?? "#27272a" }}
    />
  );
}
