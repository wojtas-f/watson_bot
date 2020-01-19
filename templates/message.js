const message = (user_input, assistant_response) => {
    const element = `<div class="ui center aligned container">
            <div class="ui blue message">
                <div class="header">
                    User input
                </div>
                <p>${user_input}</p>
            </div>
            <div class="ui success message">
                <div class="header">
                    Assistant response
                </div>
                <p>${assistant_response}</p>
            </div>
        </div>
        `

    return element
}

const renderPage = (user_input, assistant_response) => {
    let content = message(user_input, assistant_response)
    const page = `
    <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.css">
    </head>
    <body>
        ${content}
        <div class="ui center aligned container">
            <form action="/api/message" method="POST" class="ui center aligned container">
                <label class="ui label">Message</label>
                <input type="text" name="message">
                <button type="submit" class="ui positive basic button">Send</button>
            </form>
        </div>
    </body>
    `
    return page
}

module.exports = renderPage
