import rock from "../img/rock.png";
import paper from "../img/paper.png";
import scissors from "../img/scissors.png";

let round = 0;
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const result_p = document.querySelector(".result > p");

const rock_div = document.getElementById("r");
rock_div.children[0].src = rock;
const paper_div = document.getElementById("p");
paper_div.children[0].src = paper;
const scissors_div = document.getElementById("s");
scissors_div.children[0].src = scissors;

const finish = () => {
  if (round === 3) {
    alert(`User: ${userScore} to Computer: ${computerScore}`);
    location.reload();
  }
};

const getComputerChoice = () => {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
};

const convertToWord = letter => {
  switch (letter) {
    case "r":
      return "Rock";
    case "p":
      return "Paper";
    default:
      return "Scissors️";
  }
};

const win = (user, computer) => {
  const smallUserWord = "user";
  const smallCompWord = "comp";
  round++;

  userScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;

  result_p.innerHTML = `Round:${round} ${convertToWord(
    user
  )} ${smallUserWord} beats ${convertToWord(
    computer
  )} ${smallCompWord} ==> You win!`;
};

const lose = (user, computer) => {
  const smallUserWord = "user";
  const smallCompWord = "comp";
  round++;

  computerScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;

  result_p.innerHTML = `Round:${round} ${convertToWord(
    user
  )} ${smallUserWord} lose to ${convertToWord(
    computer
  )} ${smallCompWord} ==> You lost!`;
};

const draw = (user, computer) => {
  const smallUserWord = "user";
  const smallCompWord = "comp";

  result_p.innerHTML = `${convertToWord(
    user
  )} ${smallUserWord} is same as ${convertToWord(
    computer
  )} ${smallCompWord} ==> It is a draw!`;
};

const game = userChoice => {
  const computerChoice = getComputerChoice();
  finish();
  switch (userChoice + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;
    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice);
      break;
    default:
      draw(userChoice, computerChoice);
  }
};

const main = () => {
  rock_div.addEventListener("click", () => game("r"));

  paper_div.addEventListener("click", () => game("p"));

  scissors_div.addEventListener("click", () => game("s"));
};
main();
export { main };
