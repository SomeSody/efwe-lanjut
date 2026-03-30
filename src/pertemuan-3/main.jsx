import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailwindCSS";
import "./tailwind.css";
import Typography from "./Typography";
import UserForm from "./UserForm";
import HitungGajiForm from "./HitungGajiForm";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <TailwindCSS />
            <Typography />
            <UserForm />
            <HitungGajiForm />
        </div>
    )