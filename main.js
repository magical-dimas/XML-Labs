import {MainPage} from "./pages/main/index.js";
import { Model } from "./model/model.js";

const root = document.getElementById('root');
export const model = new Model();

const mainPage = new MainPage(root);
mainPage.render();