import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = this.getData();
        this.min_departments = 0;
        this.max_departments = 100;
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
                        <button class="btn" id="delete_card">Удалить</button>
                    </div>
                    <div class="col" style="text-align: center;">
                        <p class="plain_text" style="font-weight: bolder;"> Статистика выводимых факультетов по кафедрам: </p>
                        <p class="result" id="sum"> Сумма - x </p>
                        <div>
                        <p class="result" id="mul"> Произведение - x </p>
                        <p class="result" id="sq_sum"> Сумма квадратов - x </p>
                    </div>
                    <div class="col" style="text-align: center;">
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
        const departments = [12, 7, 13, 13, 5, 6, 9, 12, 4, 5, 6, 2, 1];
        const dep_intervals = this.convert_to_intervals(new Set(departments.sort(function(a, b) {
            return a - b;
          })));

        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        document.getElementById("dep_intervals").innerHTML = dep_intervals;

        const new_card = this.pageRoot.querySelector('#new_card');
        const delete_card = this.pageRoot.querySelector('#delete_card');

        const in_min = document.getElementById("min_num");
        const in_max = document.getElementById("max_num");

        in_min.addEventListener("input", this.update_min.bind(this));
        in_max.addEventListener("input", this.update_max.bind(this));

        new_card.addEventListener('click', this.addCard.bind(this));
        delete_card.addEventListener('click', this.removeCard.bind(this));

        this.update_statistics(this.filter());
    }

    update_min(input_text){
        this.min_departments = parseInt(input_text.target.value);
        if(input_text.target.value=="") this.min_departments = 0;
        this.update_statistics(this.filter());
    }

    update_max(input_text){
        this.max_departments = parseInt(input_text.target.value);
        if(input_text.target.value=="") this.max_departments = 100;
        this.update_statistics(this.filter());
    }

    update_statistics(arr){
        document.getElementById("sum").innerHTML = "Сумма - "+this.getSumAndMultOfArray(arr).sum;
        document.getElementById("mul").innerHTML = "Произведение - "+this.getSumAndMultOfArray(arr).mult;
        document.getElementById("sq_sum").innerHTML = "Сумма квадратов - "+this.sumOfSquares(arr);
    }

    filter(){
        this.pageRoot.querySelector('.gallery').innerHTML = "";
        let nums = [];
        this.data.forEach((item) => {
            if(item.num>=this.min_departments && item.num<=this.max_departments){
                const productCard = new ProductCardComponent(this.pageRoot.querySelector('.gallery'))
                productCard.render(item, this.clickCard.bind(this))
                nums.push(item.num)
            }
        })
        return nums
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
        this.update_statistics(this.filter());
    }

    removeCard() {
        if (this.data.length > 1) {
            this.data.pop();

            const gallery = this.pageRoot.querySelector('.gallery');
            gallery.lastElementChild.remove();
            this.update_statistics(this.filter());
        }
    }

    convert_to_intervals(set){
        let iter = set.values()
        let unit = iter.next()
        let prev = unit.value
        let unchanged = true
        let intervals = prev.toString()
        unit = iter.next()
        while(!unit.done){
            if(unit.value-prev!=1){
                if(unchanged){
                    intervals+=", "+unit.value
                }
                else{
                    intervals+="-"+prev+", "+unit.value
                }
                unchanged = true
            }
            else{
                unchanged = false
            }
            prev = unit.value
            unit = iter.next()
        }
        if(!unchanged){
            intervals+="-"+prev
        }
        return intervals
    }

    getSumAndMultOfArray(arr){
        let s = 0;
        let m = 1;
        for(let i = 0; i<arr.length; i++){
            s+=arr[i];
            m*=arr[i];
        }
        if(s==0 && m==1) m = 0;
        return {
            sum: s,
            mult: m
        };
    }

    sumOfSquares(arr){
        let res = 0;
        for(let i = 0; i<arr.length; i++){
            res+=arr[i]*arr[i];
        }
        return res;
    }
}