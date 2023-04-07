const btn = document.querySelector(".game");
const container = document.querySelector(".big-container")
const mainQuiz = document.querySelector(".quiz_box");

const gameHandler = function () {
    container.classList.add("hide") //hides rules box
    mainQuiz.classList.add("activeQuiz"); //shows the quiz box
    console.log(container.classList);
}
btn.addEventListener("click", gameHandler)

