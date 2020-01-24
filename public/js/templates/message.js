export const messageTemplate = (message, className) => {
    return `
    <div class="eight wide column">
        <div class="ui ${className} message">
            <p>${message}</p>
        </div>
    </div>
    `
}
