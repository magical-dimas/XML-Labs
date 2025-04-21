import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = this.getData();
        this.min = 0;
        this.max = 100;
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
                        <button class="btn" id="delete_card">Удалить</button>
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

        const new_card = this.pageRoot.querySelector('#new_card');
        const delete_card = this.pageRoot.querySelector('#delete_card');

        const in_min = document.getElementById("min_num");
        const in_max = document.getElementById("max_num");

        in_min.addEventListener("input", this.update_min.bind(this));
        in_max.addEventListener("input", this.update_max.bind(this));

        new_card.addEventListener('click', this.addCard.bind(this));
        delete_card.addEventListener('click', this.removeCard.bind(this));

        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot.querySelector('.gallery'))
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    update_min(e){
        this.min = parseInt(e.target.value);
        if(e.target.value=="") this.min = 0;
        this.filter();
    }

    update_max(e){
        this.max = parseInt(e.target.value);
        if(e.target.value=="") this.max = 100;
        this.filter();
    }

    filter(){
        this.pageRoot.querySelector('.gallery').innerHTML = "";
        this.data.forEach((item) => {
            if(item.num>=this.min && item.num<=this.max){
                const productCard = new ProductCardComponent(this.pageRoot.querySelector('.gallery'))
                productCard.render(item, this.clickCard.bind(this))
            }
        })
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    addCard(){
        const newCardData = {...this.data[0], id: 1};
        this.data.push(newCardData);

        const gallery = this.pageRoot.querySelector('.gallery');
        const card = new ProductCardComponent(gallery);
        card.render(newCardData, this.clickCard.bind(this));
    }

    removeCard() {
        if (this.data.length > 1) {
            this.data.pop();

            const gallery = this.pageRoot.querySelector('.gallery');
            gallery.lastElementChild.remove();
        }
    }
}