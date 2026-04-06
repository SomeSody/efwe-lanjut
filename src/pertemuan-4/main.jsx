import { createRoot } from "react-dom/client";
import "./tailwind.css";
import ResponsiveText from "./ResponsiveDesign";
// import FrameworkList from "./FrameworkList";
// import FrameworkList from "./FrameworkListSearchFilter";


createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <FrameworkList /> */}
            {/* <FrameworkListSearchFilter /> */}
            <ResponsiveText />
        </div>
    )