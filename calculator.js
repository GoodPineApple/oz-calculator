let history = []; // 계산 기록을 저장하는 배열
let currentInput = ""; // 현재 입력값
let firstNumber = null; // 첫 번째 숫자
let operator = null; // 선택된 연산자
let isError = false;
const VALID_NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const VALID_OPERATORS = ["+", "-", "*", "/"];

const resetDisplay = () => {
  const display = document.getElementById("display");
  display.textContent = "0";
  currentInput = "";
};

const setDisplay = (text) => {
  const display = document.getElementById("display");
  display.textContent = text;
  currentInput = text;
};

const subDisplay = () => {
  const display = document.getElementById("display");
  const textSubbed = display.textContent.slice(0, -1);
  if (textSubbed === "") resetDisplay();
  else setDisplay(textSubbed);
};

checkValidAppendNumber = (number) => {
  if (!VALID_NUMBERS.includes(number)) {
    isError = true;
    throw new Error("유효한 숫자를 입력하세요.");
  }
};

checkValidCurrentInput = (op) => {
  if (!["+", "-", "*", "/"].includes(op)) {
    isError = true;
    throw new Error("유효한 연산자를 선택하세요.");
  }
  if (!currentInput) {
    isError = true;
    throw new Error("숫자를 먼저 입력하세요.");
  }
  if (isNaN(firstNumber)) {
    isError = true;
    throw new Error("유효한 숫자를 입력하세요.");
  }
};

const appendNumber = (number) => {
  try {
    checkValidAppendNumber(number);
    setDisplay((currentInput += number));
    removeError();
  } catch (error) {
    showError(error.message);
  }
};

// 연산자 버튼 클릭 시 연산자 설정
const setOperator = (op) => {
  try {
    checkValidCurrentInput(op);
    firstNumber = Number(currentInput);
    if (isNaN(firstNumber)) throw new Error("유효한 숫자를 입력하세요.");
    operator = op;
    resetDisplay();
  } catch (error) {
    showError(error.message);
  }
};

// 초기화 버튼 클릭 시 모든 값 초기화
const clearDisplay = () => {
  currentInput = "";
  firstNumber = null;
  operator = null;
  document.getElementById("display").textContent = "0";
  document.getElementById("result").classList.add("d-none");
};

const calculate = () => {
  const resultElement = document.getElementById("result");
  try {
    if (firstNumber === null || operator === null || !currentInput) {
      isError = true;
      throw new Error("계산에 필요한 값이 부족합니다.");
    }

    const secondNumber = Number(currentInput);
    if (isNaN(secondNumber)) {
      isError = true;
      throw new Error("유효한 숫자를 입력하세요.");
    }
    if (operator === "/" && secondNumber === 0) {
      isError = true;
      throw new Error("0으로 나눌 수 없습니다.");
    }

    let result;
    // 7. operator에 따라 사칙연산 수행 (switch 문 사용 권장)
    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
    }
    // 계산 기록 저장
    const record = { firstNumber, operator, secondNumber, result };
    history.push(record);
    console.log("계산 기록:", JSON.stringify(history, null, 2));

    clearDisplay();

    // 결과 출력
    resultElement.classList.remove("d-none", "alert-danger");
    resultElement.classList.add("alert-info");
    resultElement.textContent = `결과: ${result}`;

    // // 계산 후 초기화
    // currentInput = result.toString();
    // firstNumber = null;
    // operator = null;
    // document.getElementById("display").textContent = currentInput;
  } catch (error) {
    showError(error.message);
  }
};

// 에러 메시지 출력
const showError = (message) => {
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("d-none", "alert-info");
  resultElement.classList.add("alert-danger");
  resultElement.textContent = `에러: ${message}`;
};

const removeError = () => {
  isError = false;
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("alert-danger");
  resultElement.textContent = "";
};

document.addEventListener("keydown", (event) => {
  // console.log(event);
  const key = event.key;
  console.log(key);
  if (VALID_NUMBERS.includes(key)) appendNumber(key);
  if (VALID_OPERATORS.includes(key)) setOperator(key);
  if (key === "Enter") calculate();
  if (key === "Backspace") subDisplay();
});
