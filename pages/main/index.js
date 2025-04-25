import { FacultyCardComponent } from "../../components/faculty-card/index.js";
import { FacultyPage } from "../faculty/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = this.getData();
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

    getData() {
        return [
            {
                id: 1,
                src: "https://api.www.bmstu.ru/upload/faculty/1/64f737e27ab0a.png",
                title: "ИУ Информатика и системы управления",
                text: "Ведущий факультет по подготовке кадров в области искусственного интеллекта, обработки...",
                num: 12
            },
            {
                id: 2,
                src: "https://api.www.bmstu.ru/upload/faculty/8/64bf9c5c296a8.png",
                title: "РК Робототехника и комплексная автоматизация",
                text: "Факультет основан в 1987 году как ответ на общемировые...",
                num: 9
            },
            {
                id: 3,
                src: "https://api.www.bmstu.ru/upload/faculty/4/64bf9c3652db0.png",
                title: "СМ Специальное машиностроение",
                text: "Ведущий факультет по подготовке кадров в следующих областях...",
                num: 13
            },
            {
                id: 4,
                src: "https://api.www.bmstu.ru/upload/faculty/6/64bf9c4902832.png",
                title: "РЛ Радиоэлектроника и лазерная техника",
                text: "Радиоэлектроника и лазерная техника являются самыми передовыми...",
                num: 6
            },
        ]
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const new_card_btn = document.getElementById("new_card");

        const inp_min = document.getElementById("min_num");
        const inp_max = document.getElementById("max_num");

        inp_min.addEventListener("input", this.update_min.bind(this));
        inp_max.addEventListener("input", this.update_max.bind(this));

        new_card_btn.addEventListener('click', this.addCard.bind(this));

        const data = this.getData()
        data.forEach((item) => {
            const facultyCard = new FacultyCardComponent(this.pageRoot.querySelector('.gallery'))
            facultyCard.render(item, this.openCard.bind(this), this.removeCard.bind(this))
        })
    }

    update_min(e){
        this.min_filter = parseInt(e.target.value);
        if(e.target.value=="") this.min_filter = 0;
        this.filter();
    }

    update_max(e){
        this.max_filter = parseInt(e.target.value);
        if(e.target.value=="") this.max_filter = 100;
        this.filter();
    }

    filter(){
        this.pageRoot.querySelector('.gallery').innerHTML = "";
        this.data.forEach((item) => {
            if(item.num>=this.min_filter && item.num<=this.max_filter){
                const facultyCard = new FacultyCardComponent(this.pageRoot.querySelector('.gallery'))
                facultyCard.render(item, this.openCard.bind(this), this.removeCard.bind(this))
            }
        })
    }

    openCard(e) {
        const cardId = e.target.dataset.id

        const facultyPage = new FacultyPage(this.parent, cardId)
        facultyPage.render()
    }

    addCard(){
        const newCardData = {...this.data[0], id: this.data[this.data.length-1].id+1};
        this.data.push(newCardData);

        const gallery = this.pageRoot.querySelector('.gallery');
        const card = new FacultyCardComponent(gallery);
        card.render(newCardData, this.clickCard.bind(this), this.removeCard.bind(this));
    }

    removeCard(e) {
        if (this.data.length > 1) {
            const id = e.target.dataset.id-1
            this.data.splice(this.data.findIndex((d)=> d.id==id+1), 1)
            
            this.filter()
        }
    }
}