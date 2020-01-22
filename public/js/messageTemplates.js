export const userTemplate = msg_content => {
    const time = getCurrentTime()
    return `
        <div class="ui grid">
            <div class="six wide column">
                <div class="ui blue message user-input msg user">
                    <p>${msg_content}</p>
                </div>
            </div>
            <div class="ten wide column time-display">
                    <p class="time">${time}</p>
            </div>
        </div>
`
}
export const assistantTemplate = msg_content => {
    const time = getCurrentTime()

    return `
    <hr class="break">
        <div class="ui grid">
            <div class="ten wide column time-display">
                <p class="time">${time}</p>
            </div>
        <div class="six wide column">
            <div class="ui success message user-input msg assist">
                <p>${msg_content}</p>
            </div>
        </div>
    </div>
    `
}

const getCurrentTime = () => {
    const this_time = new Date()
    const this_hour = this_time.getHours()
    const this_Minutes = this_time.getMinutes()
    const time = `${this_hour}:${this_Minutes}`
    return time
}
