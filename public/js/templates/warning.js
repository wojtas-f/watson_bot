export const warningTemplate = (warning, time) => {
    return `
    <div class="">
        <div class="ui negative message">
            <p>${warning}</p>
            <p>${time}</p>
        </div>
    </div>
    `
}
