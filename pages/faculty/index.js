import {FacultyComponent} from "../../components/faculty-card-enlarged/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import { model } from "../../main.js";

export class FacultyPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    get pageRoot() {
        return document.getElementById('faculty_page')
    }

    getHTML() {
        return (
            `
                <div id="faculty_page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
    
        const data = model.getData().find((d) => d.id == this.id)
        const faculty_information = new FacultyComponent(this.pageRoot)
        faculty_information.render(data)
    }
}