import { FacultyCardComponent } from "../../components/faculty-card/index.js";
import { FacultyPage } from "../faculty/index.js";
import { model } from "../../main.js";
import { getSumAndMultOfArray, convertToIntervals, sumOfSquares } from "../../functions/functions.js";

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
                    <div class="department_data">
                    <div class="inp_form">
                        <p class="plain_text" style="font-weight: bolder;"> Количество кафедр на факультете: от </p>
                        <input type="number" class="inp_num" id="min_num" placeholder="минимум" min="0">
                        <p class="plain_text" style="font-weight: bolder;"> до </p>
                        <input type="number" class="inp_num" id="max_num" placeholder="максимум" min="0">
                        <button class="btn" id="new_card">Создать</button>
                    </div>
                    <div style="text-align: center;">
                        <p class="plain_text" style="font-weight: bolder;"> Статистика выводимых факультетов по кафедрам: </p>
                        <p class="result" id="sum"> Сумма - x </p>
                        <div>
                        <p class="result" id="mul"> Произведение - x </p>
                        <p class="result" id="sq_sum"> Сумма квадратов - x </p>
                    </div>
                    <div style="text-align: center;">
                        <p class="plain_text" style="font-weight: bolder;"> Интервалы количества кафедр, принадлежащих факультетам: </p>
                        <p class="result" id="dep_intervals"></p>
                    </div>
                    </div>
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
        this.updateStatistics()
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
        this.updateStatistics()
    }

    updateMax(e){
        this.max_filter = parseInt(e.target.value)
        if(e.target.value=="") this.max_filter = 100
        this.drawCards()
        this.updateStatistics()
    }

    openCard(e) {
        const cardId = e.target.dataset.id
        const facultyPage = new FacultyPage(this.parent, cardId)
        facultyPage.render()
    }

    addCard(){
        model.newFaculty()
        this.drawCards()
        this.updateStatistics()
    }

    removeCard(e) {
        model.removeFaculty(e.target.dataset.id-1)
        this.drawCards()
        this.updateStatistics()
    }

    updateStatistics(){
        var departmentArr = model.getDepartmentData(this.min_filter, this.max_filter)
        document.getElementById("sum").innerHTML = "Сумма - "+getSumAndMultOfArray(departmentArr).sum
        document.getElementById("mul").innerHTML = "Произведение - "+getSumAndMultOfArray(departmentArr).mult
        document.getElementById("sq_sum").innerHTML = "Сумма квадратов - "+sumOfSquares(departmentArr)

        // пример, наглядно демонстрирующий работу функции
        // const departments = [12, 7, 13, 13, 5, 6, 9, 12, 4, 5, 6, 2, 1];
        // const dep_intervals = this.convert_to_intervals(new Set(departments.sort(function(a, b) {
        //     return a - b;
        //   })));

        const dep_intervals = convertToIntervals(new Set(departmentArr.sort(function(a, b) {
            return a - b;
          })));
        document.getElementById("dep_intervals").innerHTML = dep_intervals
    }
}