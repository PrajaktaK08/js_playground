"use strict";


/* =========================================
   QUIZ DATA
========================================= */

const questions = [

    {
        question:
            "What is a closure in JavaScript?",

        options: [
            "A function that remembers variables from its outer scope",
            "A function that closes the browser",
            "A JavaScript class",
            "An event listener"
        ],

        answer: 0
    },


    {
        question:
            "Which keyword creates a block-scoped variable?",

        options: [
            "var",
            "let",
            "function",
            "scope"
        ],

        answer: 1
    },


    {
        question:
            "What does === check?",

        options: [
            "Only value",
            "Only type",
            "Value and type without coercion",
            "Object reference only"
        ],

        answer: 2
    },


    {
        question:
            "What is the output of typeof null?",

        options: [
            "null",
            "undefined",
            "object",
            "boolean"
        ],

        answer: 2
    },


    {
        question:
            "Which method creates a new array by transforming every element?",

        options: [
            "forEach()",
            "map()",
            "filter()",
            "reduce()"
        ],

        answer: 1
    },


    {
        question:
            "What is event bubbling?",

        options: [
            "An event moving from the document to the target",
            "An event being removed automatically",
            "An event propagating from the target toward its ancestors",
            "An event firing only once"
        ],

        answer: 2
    },


    {
        question:
            "What does the this keyword refer to?",

        options: [
            "Always the global object",
            "Always the function itself",
            "Its value depends on how the function is called",
            "Always the parent object"
        ],

        answer: 2
    },


    {
        question:
            "Which method removes the last element from an array?",

        options: [
            "shift()",
            "pop()",
            "slice()",
            "splice()"
        ],

        answer: 1
    },


    {
        question:
            "What is the purpose of Promise.all()?",

        options: [
            "Runs promises one at a time",
            "Waits for multiple promises and rejects if one rejects",
            "Converts callbacks into promises",
            "Cancels all promises"
        ],

        answer: 1
    },


    {
        question:
            "What is debouncing commonly used for?",

        options: [
            "Running a function repeatedly as fast as possible",
            "Delaying execution until events stop occurring for a period",
            "Creating JavaScript objects",
            "Handling promises"
        ],

        answer: 1
    }

];

/* =========================================
   QUIZ STATE
========================================= */

const quizState = {

    currentQuestionIndex: 0,

    score: 0,

    selectedAnswer: null,

    answeredQuestions: []

};


/* =========================================
   DOM ELEMENTS
========================================= */

const questionCounter =
    document.querySelector("#questionCounter");

const questionNumber =
    document.querySelector("#questionNumber");

const questionText =
    document.querySelector("#questionText");

const optionsContainer =
    document.querySelector("#optionsContainer");

const nextButton =
    document.querySelector("#nextQuestion");

const previousButton =
    document.querySelector("#previousQuestion");

const progressFill =
    document.querySelector("#progressFill");

const progressPercentage =
    document.querySelector("#progressPercentage");

const quizProgress =
    document.querySelector(".quiz-progress");

const quizCard =
    document.querySelector("#quizCard");

const resultCard =
    document.querySelector("#resultCard");

const finalScore =
    document.querySelector("#finalScore");

const finalPercentage =
    document.querySelector("#finalPercentage");

const correctCount =
    document.querySelector("#correctCount");

const wrongCount =
    document.querySelector("#wrongCount");

const retryButton =
    document.querySelector("#retryQuiz");


/* =========================================
   RENDER QUESTION
========================================= */

function renderQuestion() {

    const currentQuestion =
        questions[
            quizState.currentQuestionIndex
        ];


    /*
     * Reset current selection.
     */

    quizState.selectedAnswer = null;


    /*
     * Update question text.
     */

    questionNumber.textContent =
        `Question ${quizState.currentQuestionIndex + 1}`;


    questionCounter.textContent =
        `${quizState.currentQuestionIndex + 1} / ${questions.length}`;


    questionText.textContent =
        currentQuestion.question;


    /*
     * Update progress.
     */

    const progress =
        (
            (quizState.currentQuestionIndex + 1)
            / questions.length
        ) * 100;


    progressFill.style.width =
        `${progress}%`;


    progressPercentage.textContent =
        `${progress}%`;


    quizProgress.setAttribute(
        "aria-valuenow",
        String(progress)
    );


    /*
     * Clear old answers.
     */

    optionsContainer.innerHTML = "";


    /*
     * Create answer buttons.
     */

    currentQuestion.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");


            button.type = "button";


            button.className =
                "answer-option";


            button.textContent =
                option;


            button.dataset.answerIndex =
                String(index);


            button.addEventListener(
                "click",
                () => selectAnswer(index)
            );


            optionsContainer.appendChild(button);

        }
    );


    /*
     * Update navigation.
     */

    previousButton.disabled =
        quizState.currentQuestionIndex === 0;


    nextButton.disabled = true;


    nextButton.textContent =
        quizState.currentQuestionIndex === questions.length - 1
            ? "Finish Quiz →"
            : "Next Question →";


    /*
     * Restore previous answer if
     * the user navigated backwards.
     */

    const previousAnswer =
        quizState.answeredQuestions[
            quizState.currentQuestionIndex
        ];


    if (previousAnswer !== undefined) {

        restoreAnswer(previousAnswer);

    }

}


/* =========================================
   SELECT ANSWER
========================================= */

function selectAnswer(selectedIndex) {

    /*
     * Prevent selecting another answer
     * after answering.
     */

    if (quizState.selectedAnswer !== null) {
        return;
    }


    const currentQuestion =
        questions[
            quizState.currentQuestionIndex
        ];


    quizState.selectedAnswer =
        selectedIndex;


    quizState.answeredQuestions[
        quizState.currentQuestionIndex
    ] = selectedIndex;


    const isCorrect =
        selectedIndex === currentQuestion.answer;


    if (isCorrect) {

        quizState.score++;

    }


    /*
     * Find all answer buttons.
     */

    const answerButtons =
        optionsContainer.querySelectorAll(
            ".answer-option"
        );


    answerButtons.forEach(
        (button, index) => {

            button.disabled = true;


            /*
             * Always show the correct answer.
             */

            if (
                index === currentQuestion.answer
            ) {

                button.classList.add("correct");

            }


            /*
             * Show the user's wrong answer.
             */

            if (
                index === selectedIndex &&
                !isCorrect
            ) {

                button.classList.add("wrong");

            }

        }
    );


    nextButton.disabled = false;

}


/* =========================================
   RESTORE ANSWER
========================================= */

function restoreAnswer(selectedIndex) {

    const currentQuestion =
        questions[
            quizState.currentQuestionIndex
        ];


    quizState.selectedAnswer =
        selectedIndex;


    const answerButtons =
        optionsContainer.querySelectorAll(
            ".answer-option"
        );


    answerButtons.forEach(
        (button, index) => {

            button.disabled = true;


            if (
                index === currentQuestion.answer
            ) {

                button.classList.add("correct");

            }


            if (
                index === selectedIndex &&
                selectedIndex !== currentQuestion.answer
            ) {

                button.classList.add("wrong");

            }

        }
    );


    nextButton.disabled = false;

}


/* =========================================
   NEXT QUESTION
========================================= */

nextButton.addEventListener(
    "click",
    () => {

        if (quizState.selectedAnswer === null) {
            return;
        }


        if (
            quizState.currentQuestionIndex ===
            questions.length - 1
        ) {

            showResults();

            return;
        }


        quizState.currentQuestionIndex++;

        renderQuestion();

    }
);


/* =========================================
   PREVIOUS QUESTION
========================================= */

previousButton.addEventListener(
    "click",
    () => {

        if (quizState.currentQuestionIndex === 0) {
            return;
        }


        quizState.currentQuestionIndex--;

        renderQuestion();

    }
);


/* =========================================
   SHOW RESULTS
========================================= */

function showResults() {

    const totalQuestions =
        questions.length;


    const percentage =
        Math.round(
            (
                quizState.score /
                totalQuestions
            ) * 100
        );


    finalScore.textContent =
        `${quizState.score} / ${totalQuestions}`;


    finalPercentage.textContent =
        `${percentage}%`;


    correctCount.textContent =
        quizState.score;


    wrongCount.textContent =
        totalQuestions - quizState.score;


    quizCard.classList.add("hidden");

    resultCard.classList.remove("hidden");


    /*
     * Move keyboard focus to result.
     */

    resultCard.setAttribute(
        "tabindex",
        "-1"
    );


    resultCard.focus();

}


/* =========================================
   RETRY QUIZ
========================================= */

retryButton.addEventListener(
    "click",
    () => {

        quizState.currentQuestionIndex = 0;

        quizState.score = 0;

        quizState.selectedAnswer = null;

        quizState.answeredQuestions = [];


        resultCard.classList.add("hidden");

        quizCard.classList.remove("hidden");


        renderQuestion();


        document
            .querySelector(".quiz-section")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }
);


/* =========================================
   INITIALIZE
========================================= */

renderQuestion();