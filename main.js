    document.addEventListener("DOMContentLoaded", () => {
        console.log("Le DOM est chargé et le script est en cours d'exécution."); // Vérification 1

        const questions = [
            {
                question: "Quel est votre animal préféré ?",
                options: ["A. Chat", "B. Chien", "C. Licorne", "D. Dragon"],
            },
            {
                question: "Quel est votre morning routine préférée ?",
                options: ["A. Prendre un café", "B. Faire du sport", "C. Méditer", "D. Dormir"],
            },
            {
                question: "Si vous étiez une chaise, vous seriez de quelle couleur ?",
                options: ["A. Blanc", "B. Noir", "C. Vert", "D. Rose"],
            },
            {
                question: "Quel est votre super pouvoir préféré ?",
                options: ["A. Voler", "B. Invisibilité", "C. Téléportation", "D. Lire dans les pensées"],
            },
            {
                question: "Quel est votre plat préféré ?",
                options: ["A. Pizza", "B. Sushi", "C. Salade", "D. Hamburger"],
            },
            {
                question: "Quel est votre film préféré ?",
                options: ["A. Star Wars", "B. Harry Potter", "C. Le Seigneur des Anneaux", "D. Avengers"],
            }
        ];

        const profiles = {
            backend: ["D", "A", "B", "C", "D", "A"],
            frontend: ["A", "B", "C", "D", "A", "B"],
            fullstack: ["C", "D", "A", "B", "C", "D"],
            distributor: ["B", "C", "D", "A", "B", "C"]
        };

        function displayQuiz() {
            console.log("Affichage du quiz..."); // Vérification 2
            const quizContainer = document.getElementById("quiz");
            quizContainer.innerHTML = "";

            questions.forEach((question, questionIndex) => {
                const questionDiv = document.createElement("div");
                questionDiv.classList.add("question");

                const questionTitle = document.createElement("h3");
                questionTitle.textContent = question.question;
                questionDiv.appendChild(questionTitle);

                question.options.forEach((option, optionIndex) => {
                    const label = document.createElement("label");
                    const input = document.createElement("input");
                    input.type = "radio";
                    input.name = `question${questionIndex}`;
                    input.value = String.fromCharCode(65 + optionIndex);

                    label.appendChild(input);
                    label.appendChild(document.createTextNode(option));
                    questionDiv.appendChild(label);
                    questionDiv.appendChild(document.createElement("br"));
                });

                quizContainer.appendChild(questionDiv);
            });
        }

        function calculateScore(userAnswers) {
            console.log("Calcul du score..."); // Vérification 3
            const score = {
                backend: 0,
                frontend: 0,
                fullstack: 0,
                distributor: 0
            };

            for (let profile in profiles) {
                profiles[profile].forEach((answer, index) => {
                    if (answer === userAnswers[index]) {
                        score[profile]++;
                    }
                });
            }

            return score;
        }

        function getResult(score) {
            console.log("Génération du résultat..."); // Vérification 4
            let maxScore = 0;
            let personality = "";
            for (let type in score) {
                if (score[type] > maxScore) {
                    maxScore = score[type];
                    personality = type;
                }
            }
            return `Votre profil de développeur est : ${personality} avec un score de ${maxScore}.`;
        }

        function submitQuiz() {
            console.log("Soumission du quiz..."); // Vérification 5
            const userAnswers = [];
            questions.forEach((_, questionIndex) => {
                const answer = document.querySelector(`input[name="question${questionIndex}"]:checked`);
                if (answer) {
                    userAnswers.push(answer.value);
                } else {
                    userAnswers.push("");
                }
            });

            if (userAnswers.includes("")) {
                alert("Veuillez répondre à toutes les questions.");
                return;
            }

            const score = calculateScore(userAnswers);
            const result = getResult(score);

            document.getElementById("result").textContent = result;
        }

        displayQuiz();
        document.getElementById("submit").addEventListener("click", submitQuiz);
    });