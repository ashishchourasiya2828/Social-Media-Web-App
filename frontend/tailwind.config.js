/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          screens: {
            sm: "640px",  // Mobile breakpoint
            md: "768px",  // Tablet breakpoint
            lg: "1024px", // Desktop breakpoint
          },
        },
      },
      plugins: [],
  }