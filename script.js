// Default flashcards

let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
    {
        question: "What is HTML?",
        answer: "HTML stands for HyperText Markup Language."
    },
    {
        question: "What is CSS?",
        answer: "CSS is used to style and design web pages."
    },
    {
        question: "What is JavaScript?",
        answer: "JavaScript adds functionality and interactivity to websites."
    }
];

let currentIndex = 0;
let answerVisible = false;


// Get HTML elements

const questionText = document.getElementById("questionText");
const answerText = document.getElementById("answerText");
const answerBox = document.getElementById("answerBox");

const cardNumber = document.getElementById("cardNumber");

const showAnswerBtn = document.getElementById("showAnswerBtn");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");

const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");


// Display current card

function displayCard() {

    if (flashcards.length === 0) {

        questionText.textContent = "No flashcards available";
        answerText.textContent = "";
        cardNumber.textContent = "Card 0 of 0";

        answerBox.style.display = "none";

        return;
    }

    const card = flashcards[currentIndex];

    questionText.textContent = card.question;
    answerText.textContent = card.answer;

    cardNumber.textContent =
        `Card ${currentIndex + 1} of ${flashcards.length}`;

    answerVisible = false;

    answerBox.style.display = "none";

    showAnswerBtn.textContent = "Show Answer";

    questionInput.value = card.question;
    answerInput.value = card.answer;
}


// Show / Hide Answer

showAnswerBtn.addEventListener("click", function () {

    if (answerVisible === false) {

        answerBox.style.display = "block";

        showAnswerBtn.textContent = "Hide Answer";

        answerVisible = true;

    } else {

        answerBox.style.display = "none";

        showAnswerBtn.textContent = "Show Answer";

        answerVisible = false;
    }
});


// Previous Card

prevBtn.addEventListener("click", function () {

    if (flashcards.length === 0) {
        return;
    }

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = flashcards.length - 1;
    }

    displayCard();
});


// Next Card

nextBtn.addEventListener("click", function () {

    if (flashcards.length === 0) {
        return;
    }

    currentIndex++;

    if (currentIndex >= flashcards.length) {
        currentIndex = 0;
    }

    displayCard();
});


// Add Card

addBtn.addEventListener("click", function () {

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (question === "" || answer === "") {

        alert("Please enter both question and answer.");

        return;
    }

    flashcards.push({
        question: question,
        answer: answer
    });

    currentIndex = flashcards.length - 1;

    saveCards();

    displayCard();

    questionInput.value = "";
    answerInput.value = "";

    alert("Flashcard added successfully!");
});


// Edit Card

editBtn.addEventListener("click", function () {

    if (flashcards.length === 0) {
        alert("There is no card to edit.");
        return;
    }

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (question === "" || answer === "") {

        alert("Please enter both question and answer.");

        return;
    }

    flashcards[currentIndex].question = question;
    flashcards[currentIndex].answer = answer;

    saveCards();

    displayCard();

    alert("Flashcard updated successfully!");
});


// Delete Card

deleteBtn.addEventListener("click", function () {

    if (flashcards.length === 0) {
        alert("There are no flashcards to delete.");
        return;
    }

    const confirmDelete =
        confirm("Are you sure you want to delete this flashcard?");

    if (confirmDelete) {

        flashcards.splice(currentIndex, 1);

        if (currentIndex >= flashcards.length) {
            currentIndex = flashcards.length - 1;
        }

        if (currentIndex < 0) {
            currentIndex = 0;
        }

        saveCards();

        displayCard();
    }
});


// Save cards to browser

function saveCards() {

    localStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );
}


// Display first card when app starts

displayCard();