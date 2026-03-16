import "./tailwind.css";
import {createRoot} from "react-dom/client";
import { Root } from "./root";
import { model } from "./model";

const mountedApp= createRoot(document.getElementById('root'))
mountedApp.render(<Root model={model} />);  