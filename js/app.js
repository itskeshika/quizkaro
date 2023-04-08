const btn = document.querySelector(".game");
const container = document.querySelector(".big-container")
const mainQuiz = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = document.querySelector(".timer_sec");

const gameHandler = function () {
    container.classList.add("hide") //hides rules box
    mainQuiz.classList.add("activeQuiz"); //shows the quiz box
    console.log(container.classList);
    showQuestions(0);
    queCounter(1);
    startTimer(15);
}
btn.addEventListener("click", gameHandler)

let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let userScore = 0;

const next_btn = document.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const quit_quiz = document.querySelector(".exit");

quit_quiz.onclick = ()=>{
    window.location.reload();
}

next_btn.onclick = () => {
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue); 
        next_btn.style.display = "none"; 
    } else{
        console.log("Questions completed")
        showResultBox();
    }
}

function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + "." + questions[index].question + '</span>';
    let option_tag = '<div class="options">' + questions[index].options[0] + '<span></span></div>' +
        '<div class="options">' + questions[index].options[1] + '<span></span></div>' +
        '<div class="options">' + questions[index].options[2] + '<span></span></div>' +
        '<div class="options">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".options");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)");    
    }

}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(counter); 
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct.");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong.");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","options correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }   
        }
    }
    
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display = "block";
}

function showResultBox(){
    container.classList.add("hide") //hides rules box
    mainQuiz.classList.remove("activeQuiz"); //hides the quiz box
    result_box.classList.add("activeResult"); //shows the result box
    const scoreText = document.querySelector(".score_text");
    if(userScore >= 5){
        let scoreTag = '<span>and, Congratulations🎉 You got <p>'+ userScore + '</p> out of <p>'+ questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag ;
    }
    else{
        let scoreTag = '<span>and, Sorry🫣 You got only <p>'+ userScore + '</p> out of <p>'+ questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag ;
    }
}


function queCounter(index){
    const bottom_ques_counter = document.querySelector(".total-que");
    let totalQuesCountTag = '<span> <p><b>' + index + '</b></p> of <p><b>'+ questions.length +'</b></p> questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
};

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if (time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = '0' + addZero;
        }
        if (time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class","options correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }   
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
        
            next_btn.style.display = "block";
        }
    }
}

