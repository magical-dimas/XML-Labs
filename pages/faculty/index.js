import {FacultyComponent} from "../../components/faculty-card-enlarged/index.js"
import {BackButtonComponent} from "../../components/back-button/index.js"
import {MainPage} from "../main/index.js"
import { facultyURLs } from "../../modules/facultyURLs.js"

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

    async getData() {
        try{
        const response = await fetch(facultyURLs.getFacultyById(this.id))
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()
            this.renderData(data)
        } catch(e){
            console.error('Failed to get faculty data:', e)
        }
    }

    renderData(item) {
        const faculty = new FacultyComponent(this.pageRoot)
        faculty.render(item)
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

        this.getData()
    }
}