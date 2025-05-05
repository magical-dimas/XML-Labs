import {FacultyComponent} from "../../components/faculty-card-enlarged/index.js"
import {BackButtonComponent} from "../../components/back-button/index.js"
import {MainPage} from "../main/index.js"
import { facultyURLs } from "../../modules/facultyURLs.js"

export class RedactFacultyPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    get pageRoot() {
        return document.getElementById('redact_page')
    }

    async getData() {
        if(this.id==-1) this.renderData({
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0JO9YprlouHhVUTpNTtlDdmeLiGv1CWFBA&s",
            title: "Название факультета",
            brief_text: "Это краткое описание факультета",
            description: "Это несколько более длинное описание факультета",
            departments: 0
        })
        else try{const response = await fetch(facultyURLs.getFacultyById(this.id))
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        this.renderData(data)
        } catch(e){
        console.error('Failed to get faculty data:', e)
        }
    }

    getHTML() {
        return (
            `
                <div id="redact_page"></div>
            `
        )
    }

    renderData(item) {
        const faculty = new FacultyComponent(this.pageRoot)
        faculty.render(item)
        document.getElementById("title_inp").value=item.title
        document.getElementById("src_inp").value=item.src
        document.getElementById("bdesc_inp").value=item.brief_text
        document.getElementById("desc_inp").value=item.description
        document.getElementById("deps_inp").value=item.departments
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const ui_html = `
                <div class="inp_form" style="width: 600px; margin: 10px">
                    <div class="line">
                        <p class="plain_text"> Название факультета:  </p>
                        <input type="text" class="input" id="title_inp" placeholder="название" style="width: 250px">
                    </div>
                    <div class="line">
                        <p class="plain_text"> Ссылка на изображение:  </p>
                        <input type="url" class="input" id="src_inp" placeholder="ссылка" style="width: 250px">
                    </div>
                    <div class="line">
                        <p class="plain_text"> Краткое описание факультета:  </p>
                        <textarea class="input" id="bdesc_inp" placeholder="описание" style="width: 250px"></textarea>
                    </div>
                    <div class="line">
                        <p class="plain_text"> Подробное описание факультета:  </p>
                        <textarea class="input" id="desc_inp" placeholder="описание" style="width: 250px"></textarea>
                    </div>
                    <div class="line">
                        <p class="plain_text"> Количество кафедр на факультете:  </p>
                        <input type="number" class="input" id="deps_inp" placeholder="количество" min="0">
                    </div>
                    <button class="btn" id="save">Сохранить запись</button>
                    </div>
            `
        this.parent.insertAdjacentHTML('beforeend', ui_html)
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        const saveButton = document.getElementById("save")
        saveButton.addEventListener("click", this.saveData.bind(this))

        this.getData()
    }

    async saveData(){
        const titleInp = document.getElementById("title_inp")
        const srcInp = document.getElementById("src_inp")
        const bdescInp = document.getElementById("bdesc_inp")
        const descInp = document.getElementById("desc_inp")
        const depsInp = document.getElementById("deps_inp")

        const data = {
            src: srcInp.value,
            title: titleInp.value,
            brief_text: bdescInp.value,
            description: descInp.value,
            departments: depsInp.value==""? 0 : depsInp.value
        }

        if(this.id == -1) try{
            const response = await fetch(facultyURLs.getFaculties())
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const json = await response.json()
            const new_index = json.length>0? json[json.length-1].id+1 : 1
            const response_post = await fetch(facultyURLs.createFaculty(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: new_index, ...data})
            });
            if (!response_post.ok) {
                throw new Error(`HTTP error! Status: ${response_post.status}`)
            }
            this.id = new_index
            this.render()
        } catch(e){
            console.error('Failed to add new faculty:', e)
        }
        else try{
            const response_patch = await fetch(facultyURLs.updateFacultyById(this.id), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
            if (!response_patch.ok) {
                throw new Error(`HTTP error! Status: ${response_patch.status}`)
            }
            this.render()
        } catch(e){
            console.error('Failed to update faculty data:', e)
        }
    }
}