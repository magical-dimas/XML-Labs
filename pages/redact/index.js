import {FacultyComponent} from "../../components/faculty-card-enlarged/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { facultyURLs } from "../../modules/facultyURLs.js";

export class RedactFacultyPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    get pageRoot() {
        return document.getElementById('redact_page')
    }

    getData() {
        if(this.id==-1) this.renderData({
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0JO9YprlouHhVUTpNTtlDdmeLiGv1CWFBA&s",
            title: "Название факультета",
            brief_text: "Это краткое описание факультета",
            description: "Это несколько более длинное описание факультета",
            departments: 0
        })
        else ajax.get(facultyURLs.getFacultyById(this.id), (data) => {
                    this.renderData(data)
        })
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

    saveData(){
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
            departments: depsInp.value
        }

        if(this.id == -1) ajax.get(facultyURLs.getFaculties(), ((sent)=>{ajax.post(facultyURLs.createFaculty(), {id: sent[sent.length-1].id+1, ...data}, ()=>{ 
            this.id = sent[sent.length-1].id+1
            this.render()})}))
        else ajax.patch(facultyURLs.updateFacultyById(this.id), data, ()=>{this.render()})
    }
}