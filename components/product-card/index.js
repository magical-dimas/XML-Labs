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
                        <div style="display: flex; justify-content:space-between;">
                            <button class="btn" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                            <button class="btn" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                        </div>
                    </div>
                </div>
            `
        )
    }
    
    addListeners(data, listener1, listener2) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener1)
        document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", listener2)
    }
    
    render(data, listener1, listener2) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener1, listener2)
    }
}