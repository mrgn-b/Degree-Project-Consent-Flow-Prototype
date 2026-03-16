import "./tailwind.css";
import {createRoot} from "react-dom/client";
import { Root } from "./root";

const mountedApp= createRoot(document.getElementById('root'))
mountedApp.render(<Root/>);  