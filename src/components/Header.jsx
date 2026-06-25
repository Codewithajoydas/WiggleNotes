import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ children, title }) {
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);
  return (
    <header
      className="
        sticky
        top-0
        z-50
        h-16
        bg-zinc-950/95
        backdrop-blur-xl
        border-b
        border-zinc-800
      "
      style={{
        WebkitAppRegion: "drag",
      }}
    >
      <div className="h-full px-5 flex items-center justify-between pr-[180px]">
        <div
          className="flex items-center gap-3"
          style={{
            WebkitAppRegion: "no-drag",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            className="
              h-9
              w-9
              rounded-xl
              flex
              items-center
              justify-center
              text-zinc-400
              hover:bg-zinc-800
              hover:text-blue-400
              transition-all
              duration-200
            "
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="font-semibold text-zinc-100 text-sm tracking-wide">
              {title}
            </h1>

            <p className="text-xs text-zinc-500">Wigglenote</p>
          </div>
        </div>

        <div
          className="flex items-center gap-2"
          style={{
            WebkitAppRegion: "no-drag",
          }}
        >
          {children}
        </div>
      </div>
    </header>
  );
}
