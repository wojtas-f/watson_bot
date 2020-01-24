export const imageTemplate = (img_src, className) => {
    return `
    <div class="eight wide column">
        <div class="ui ${className} message">
            <img src="${img_src}" alt="Image not found class="img" ">
        </div>
    </div>
    `
}
