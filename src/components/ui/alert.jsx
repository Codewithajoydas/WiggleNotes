import {
  CircleCheckBig,
  CircleAlert,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const variants = {
  success: {
    icon: CircleCheckBig,
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    title: "text-emerald-300",
  },

  error: {
    icon: CircleAlert,
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400",
    title: "text-red-300",
  },

  warning: {
    icon: TriangleAlert,
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10",
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
    title: "text-yellow-300",
  },

  info: {
    icon: Info,
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    title: "text-blue-300",
  },
};

export default function Alert({
  type = "info",
  title,
  message,
  onClose,
  duration = 3000,
  className = "",
}) {
  const style = variants[type] || variants.info;
  const Icon = style.icon;

useEffect(() => {
  const timer = setTimeout(() => {
    onClose?.();
  }, duration);

  return () => clearTimeout(timer);
}, [duration, onClose]);
  return (
    <div
      className={`
        fixed flex gap-4 rounded-xl
        border ${style.border}
        ${style.bg}
        p-2
        
        w-fit
        bottom-2
        right-3
        z-60
        shadow-lg
        backdrop-blur-3xl
        animate-alert-pop
        ${className}
      `}
    >
      <div
        className={`
          h-11 w-11 rounded-lg
          flex items-center justify-center
          ${style.iconBg}
        `}
      >
        <Icon className={style.iconColor} size={22} />
      </div>

      <div className="flex-1">
        {title && <h3 className={`font-semibold ${style.title} text-sm`}>{title}</h3>}

        {message && (
          <p className="mt-1 text-[10px] text-zinc-300 leading-relaxed">
            {message}
          </p>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-white transition"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
