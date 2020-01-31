export const imageTemplate = (img_src, className) => {
    return `
    <div class="chat__message_container">
        <div class="ui ${className} message">
            <img src="${img_src}" alt="Image not found" class="chat__display-message-img">
        </div>
    </div>
    `
}
