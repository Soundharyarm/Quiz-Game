document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Mars"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            choices: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "Jane Austen"],
            answer: "Harper Lee"
        }
        // Add more questions as needed
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionContainer = document.getElementById('questionContainer');
    const nextButton = document.getElementById('nextButton');
    const scoreContainer = document.getElementById('scoreContainer');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restartButton');

    function renderQuestion() {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
            <h2>${question.question}</h2>
            <div class="choices">
                ${question.choices.map(choice => `
                    <div class="choice">${choice}</div>
                `).join('')}
            </div>
        `;

        const choices = document.querySelectorAll('.choice');
        choices.forEach(choice => {
            choice.addEventListener('click', () => {
                const selectedChoice = choice.textContent;
                if (selectedChoice === question.answer) {
                    choice.classList.add('correct');
                    score++;
                } else {
                    choice.classList.add('incorrect');
                }
                choices.forEach(c => {
                    if (c.textContent === question.answer) {
                        c.classList.add('correct');
                    }
                });
                nextButton.disabled = false;
            });
        });
    }

    function showScore() {
        questionContainer.style.display = 'none';
        scoreContainer.style.display = 'block';
        scoreElement.textContent = score;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        scoreContainer.style.display = 'none';
        questionContainer.style.display = 'block';
        nextButton.disabled = true;
        renderQuestion();
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            renderQuestion();
            nextButton.disabled = true;
        } else {
            showScore();
        }
    });

    restartButton.addEventListener('click', () => {
        restartQuiz();
    });

    // Initialize the quiz
    renderQuestion();
});
