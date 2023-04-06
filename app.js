const btn = document.querySelector(".game");
const container = document.querySelector(".big-container")
const gameHandler = function () {
    container.classList.toggle("hide")
    console.log(container.classList);
}
btn.addEventListener("click", gameHandler)