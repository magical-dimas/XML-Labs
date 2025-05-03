import { FacultyCardComponent } from "../../components/faculty-card/index.js";
import { FacultyPage } from "../faculty/index.js";
import { ajax } from "../../modules/ajax.js";
import { facultyURLs } from "../../modules/facultyURLs.js";

export class MainPage {
    constructor(parent, model) {
        this.parent = parent
        this.min_filter = 0
        this.max_filter = 100
        this.last_index = 4
    }

    get pageRoot() {
        return document.getElementById('main_page')
    }

    getHTML() {
        return (
            `
                <div id="main_page" class="main_page">
                    <div class="inp_form">
                        <p class="plain_text"> Количество кафедр на факультете: от </p>
                        <input type="number" class="inp_num" id="min_num" placeholder="минимум" min="0">
                        <p class="plain_text"> до </p>
                        <input type="number" class="inp_num" id="max_num" placeholder="максимум" min="0">
                        <button class="btn" id="new_card">Создать</button>
                    </div>
                    <div class="gallery"></div>
                </div>
            `
        )
    }

    getData() {
        ajax.get(facultyURLs.getFaculties(), (data) => {
            this.renderData(data.filter((element)=>{return (element.departments>=this.min_filter && element.departments<=this.max_filter)}));
        })
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const new_card_btn = document.getElementById("new_card")
        const inp_min = document.getElementById("min_num")
        const inp_max = document.getElementById("max_num")

        inp_min.addEventListener("input", this.updateMin.bind(this))
        inp_max.addEventListener("input", this.updateMax.bind(this))
        new_card_btn.addEventListener('click', this.addCard.bind(this))

        this.getData()
    }

    renderData(items) {
        this.pageRoot.querySelector('.gallery').innerHTML = ""
        items.forEach((item) => {
            const facultyCard = new FacultyCardComponent(this.pageRoot.querySelector('.gallery'))
            facultyCard.render(item, this.openCard.bind(this), this.removeCard.bind(this))
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

    openCard(e) {
        const cardId = e.target.dataset.id
        const facultyPage = new FacultyPage(this.parent, cardId)
        facultyPage.render()
    }

    addCard(){
        ajax.get(facultyURLs.getFaculties(), (data) => {
            this.last_index = data[data.length-1]?data[data.length-1].id+1:1
        })
        setTimeout(() => {
        const emptyCardData = {
            id: this.last_index,
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0JO9YprlouHhVUTpNTtlDdmeLiGv1CWFBA&s",
            title: "Факультет",
            brief_text: "Краткое описание факультета",
            description: "Длинное описание факльтета",
            departments: 0
        }
        ajax.post(facultyURLs.createFaculty(), emptyCardData, ()=>{})
        if(this.min_filter==0){
        const facultyCard = new FacultyCardComponent(this.pageRoot.querySelector('.gallery'))
        facultyCard.render(emptyCardData, this.openCard.bind(this), this.removeCard.bind(this))
        }
        this.last_index++
        }, 500)
    }

    removeCard(e) {
        ajax.delete(facultyURLs.removeFacultyById(e.target.dataset.id), () => {})
        e.target.parentNode.parentNode.parentNode.remove()
    }
}