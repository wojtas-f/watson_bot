export const messageTemplate = (message, className) => {
    return `
    <div class="chat__message_container">
        <div class="ui ${className} message">
            <p>${message}</p>
        </div>
    </div>
    `
}
