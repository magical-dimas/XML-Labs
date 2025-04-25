import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData(id) {
        const data = [
            {
                id: 1,
                src: "https://api.www.bmstu.ru/upload/faculty/1/64f737e27ab0a.png",
                title: "Информатика и системы управления",
                text: "Ведущий факультет по подготовке кадров в области искусственного интеллекта, обработки больших данных, разработки программного обеспечения, защиты информации, интеллектуальных систем управления и информационных систем.",
                num: 12
            },
            {
                id: 2,
                src: "https://api.www.bmstu.ru/upload/faculty/8/64bf9c5c296a8.png",
                title: "Робототехника и комплексная автоматизация",
                text: "Факультет основан в 1987 году как ответ на общемировые тенденции развития наукоемких отраслей промышленности.",
                num: 9
            },
            {
                id: 3,
                src: "https://api.www.bmstu.ru/upload/faculty/4/64bf9c3652db0.png",
                title: "Специальное машиностроение",
                text: "Ведущий факультет по подготовке кадров в следующих областях: космическая отрасль, робототехника, оборонная промышленность и транспортное направление.",
                num: 13
            },
            {
                id: 4,
                src: "https://api.www.bmstu.ru/upload/faculty/6/64bf9c4902832.png",
                title: "Радиоэлектроника и лазерная техника",
                text: "Радиоэлектроника и лазерная техника являются самыми передовыми отраслями науки и техники, определяющими научно-технический прогресс и проектирование новейших приборов, часто не имеющих аналогов в мире.",
                num: 6
            },
        ]
        return data[id]
    }

    get pageRoot() {
        return document.getElementById('product_page')
    }

    getHTML() {
        return (
            `
                <div id="product_page"></div>
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
    
        const data = this.getData(this.id-1)
        const stock = new ProductComponent(this.pageRoot)
        stock.render(data)
    }
}