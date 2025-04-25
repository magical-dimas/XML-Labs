export class Model{
    constructor(){
        this.data = this.createData();
    }

    createData(){
        const data = [
            {
                id: 1,
                src: "https://api.www.bmstu.ru/upload/faculty/1/64f737e27ab0a.png",
                title: "ИУ Информатика и системы управления",
                brief_text: "Ведущий факультет по подготовке кадров в области искусственного интеллекта, обработки...",
                description: "Ведущий факультет по подготовке кадров в области искусственного интеллекта, обработки больших данных, разработки программного обеспечения, защиты информации, интеллектуальных систем управления и информационных систем.",
                departments: 12
            },
            {
                id: 2,
                src: "https://api.www.bmstu.ru/upload/faculty/8/64bf9c5c296a8.png",
                title: "РК Робототехника и комплексная автоматизация",
                brief_text: "Факультет основан в 1987 году как ответ на общемировые...",
                description: "Факультет основан в 1987 году как ответ на общемировые тенденции развития наукоемких отраслей промышленности.",
                departments: 9
            },
            {
                id: 3,
                src: "https://api.www.bmstu.ru/upload/faculty/4/64bf9c3652db0.png",
                title: "СМ Специальное машиностроение",
                brief_text: "Ведущий факультет по подготовке кадров в следующих областях...",
                description: "Ведущий факультет по подготовке кадров в следующих областях: космическая отрасль, робототехника, оборонная промышленность и транспортное направление.",
                departments: 13
            },
            {
                id: 4,
                src: "https://api.www.bmstu.ru/upload/faculty/6/64bf9c4902832.png",
                title: "РЛ Радиоэлектроника и лазерная техника",
                brief_text: "Радиоэлектроника и лазерная техника являются самыми передовыми...",
                description: "Радиоэлектроника и лазерная техника являются самыми передовыми отраслями науки и техники, определяющими научно-технический прогресс и проектирование новейших приборов, часто не имеющих аналогов в мире.",
                departments: 6
            },
        ]
        return data
    }

    getData(){
        return this.data
    }

    getDepartmentData(min_filter, max_filter){
        var departmentArr = []
        this.filter(min_filter, max_filter).forEach((item)=>{departmentArr.push(item.departments)})
        return departmentArr
    }

    filter(min_filter, max_filter){
        return this.data.filter((d)=>(d.departments>=min_filter && d.departments<=max_filter))
    }

    newFaculty(){
        const newFaculty = {...this.data[0], id: this.data[this.data.length-1].id+1};
        this.data.push(newFaculty);
    }

    removeFaculty(id){
        if (this.data.length > 1) {
            this.data.splice(this.data.findIndex((d)=> d.id==id+1), 1)
        }
    }
}