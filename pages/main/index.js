import { FacultyCardComponent } from "../../components/faculty-card/index.js";
import { FacultyPage } from "../faculty/index.js";
import { model } from "../../main.js";

export class MainPage {
    constructor(parent, model) {
        this.parent = parent;
        this.min_filter = 0;
        this.max_filter = 100;
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

        this.drawCards()
    }

    drawCards(){
        this.pageRoot.querySelector('.gallery').innerHTML = "";
        model.filter(this.min_filter, this.max_filter).forEach((item)=>{
            const facultyCard = new FacultyCardComponent(this.pageRoot.querySelector('.gallery'))
            facultyCard.render(item, this.openCard.bind(this), this.removeCard.bind(this))
        })
    }

    updateMin(e){
        this.min_filter = parseInt(e.target.value)
        if(e.target.value=="") this.min_filter = 0
        this.drawCards()
    }

    updateMax(e){
        this.max_filter = parseInt(e.target.value)
        if(e.target.value=="") this.max_filter = 100
        this.drawCards()
    }

    openCard(e) {
        const cardId = e.target.dataset.id
        const facultyPage = new FacultyPage(this.parent, cardId)
        facultyPage.render()
    }

    addCard(){
        model.newFaculty()
        this.drawCards()
    }

    removeCard(e) {
        model.removeFaculty(e.target.dataset.id-1)
        this.drawCards()
    }
}