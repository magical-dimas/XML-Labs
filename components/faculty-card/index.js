export class FacultyCardComponent {
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
                        <p class="card_text">${data.brief_text}</p>
                        <p class="card_text">Количество кафедр: ${data.departments}</p>
                        <div style="display: flex; justify-content:space-between;">
                            <button class="btn" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                            <button class="btn" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                        </div>
                    </div>
                </div>
            `
        )
    }
    
    addListeners(data, details_listener, rm_listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", details_listener)
        document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", rm_listener)
    }
    
    render(data, details_listener, rm_listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, details_listener, rm_listener)
    }
}