export default {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--bg-primary)",
                secondary: "var(--bg-secondary)",
                hover: "var(--bg-hover)",
                border: "var(--border)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
                "text-muted": "var(--text-muted)",
                accent: "var(--accent)",
                "accent-hover": "var(--accent-hover)",
                "accent-text": "var(--accent-text)",
            },
        },
    },
};