import { createRoot } from "react-dom/client";
import "./tailwind.css";
import Airport from "./Airport";


createRoot(document.getElementById("root"))
    .render(
        <div>
            <Airport/>
        </div>
    )