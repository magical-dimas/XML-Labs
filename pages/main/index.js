import { FacultyCardComponent } from "../../components/faculty-card/index.js";
import { FacultyPage } from "../faculty/index.js";
import { ajax } from "../../modules/ajax.js";
import { facultyURLs } from "../../modules/facultyURLs.js";
import { RedactFacultyPage } from "../redact/index.js";

export class MainPage {
    constructor(parent, model) {
        this.parent = parent
        this.min_filter = 0
        this.max_filter = 100000
        this.last_index = 4
        this.title_filter = ""
    }

    get pageRoot() {
        return document.getElementById('main_page')
    }

    getHTML() {
        return (
            `
                <div id="main_page" class="main_page">
                    <div class="inp_form">
                    <div style="display: flex; flex-direction: row; gap: 5px;">
                        <p class="plain_text"> Количество кафедр на факультете: от </p>
                        <input type="number" class="input" id="min_num" placeholder="минимум" min="0">
                        <p class="plain_text"> до </p>
                        <input type="number" class="input" id="max_num" placeholder="максимум" min="0">
                    </div>
                    <div style="display: flex; flex-direction: row; gap: 5px;">
                        <p class="plain_text"> Поиск по названию факультета:</p>
                        <input class="input" id="title_filter" placeholder="Введите название">
                        <button class="btn" id="new_card">Создать новую запись</button>
                    </div>
                    </div>
                    <div class="gallery"></div>
                </div>
            `
        )
    }

    getData() {
        if(!this.title_filter){
            ajax.get(facultyURLs.getFaculties(), (data) => {
                this.renderData(data.filter((element)=>{return (element.departments>=this.min_filter && element.departments<=this.max_filter)}));
         })
        } else{
            ajax.get(facultyURLs.getFilteredFaculties(this.title_filter), (data) => {
                this.renderData(data.filter((element)=>{return (element.departments>=this.min_filter && element.departments<=this.max_filter)}));
            })
        }
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const new_card_btn = document.getElementById("new_card")
        const inp_min = document.getElementById("min_num")
        const inp_max = document.getElementById("max_num")
        const inp_filter = document.getElementById("title_filter")

        inp_min.addEventListener("input", this.updateMin.bind(this))
        inp_max.addEventListener("input", this.updateMax.bind(this))
        new_card_btn.addEventListener('click', this.addCard.bind(this))
        inp_filter.addEventListener("input", this.searchName.bind(this))

        this.getData()
    }

    renderData(items) {
        this.pageRoot.querySelector('.gallery').innerHTML = ""
        items.forEach((item) => {
            const facultyCard = new FacultyCardComponent(this.pageRoot.querySelector('.gallery'))
            facultyCard.render(item, this.openCard.bind(this), this.removeCard.bind(this), this.redactWindow.bind(this))
        })
    }

    updateMin(e){
        this.min_filter = parseInt(e.target.value)
        if(e.target.value=="") this.min_filter = 0
        this.getData()
    }

    updateMax(e){
        this.max_filter = parseInt(e.target.value)
        if(e.target.value=="") this.max_filter = 100
        this.getData()
    }

    searchName(e){
        this.title_filter = e.target.value
        this.getData()
    }

    openCard(e) {
        const cardId = e.target.dataset.id
        const facultyPage = new FacultyPage(this.parent, cardId)
        facultyPage.render()
    }

    redactWindow(e){
        const cardId = e.target.dataset.id
        const redactFacultyPage = new RedactFacultyPage(this.parent, cardId)
        redactFacultyPage.render()
    }

    addCard(){
        const redactFacultyPage = new RedactFacultyPage(this.parent, -1)
        redactFacultyPage.render()
    }

    removeCard(e) {
        ajax.delete(facultyURLs.removeFacultyById(e.target.dataset.id), () => {})
        e.target.parentNode.parentNode.parentNode.parentNode.remove()
    }
}