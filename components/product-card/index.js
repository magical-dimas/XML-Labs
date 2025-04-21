export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card"">
                    <img class="card_img_top" src="${data.src}" alt="картинка">
                    <div class="card_body">
                        <h5 class="card_title">${data.title}</h5>
                        <p class="card_text">${data.text}</p>
                        <p class="department_num">Количество кафедр: ${data.num}</p>
                        <button class="btn" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                    </div>
                </div>
            `
        )
    }
    
    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }
    
    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}