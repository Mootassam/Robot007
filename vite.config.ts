import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Specify the port number you want to use
    strictPort: true, // Enable strict port checking
    host: "192.168.1.43", // Specify the hostname 
    open: true, // Automatically open the browser
  },
});
