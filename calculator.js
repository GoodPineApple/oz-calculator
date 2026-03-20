let history = []; // 계산 기록을 저장하는 배열
let currentInput = ""; // 현재 입력값
let firstNumber = null; // 첫 번째 숫자
let operator = null; // 선택된 연산자
const VALID_NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const VALID_OPERATOR = ["+", "-", "*", "/"];
let isReset = false;

setDisplay = (text) => {
  const display = document.getElementById("display");
  if (!display) throw new Error("디스플레이 요소를 찾을 수 없습니다.");
  display.textContent = text;
};

resetDisplay = () => {
  currentInput = ""; // 입력값 초기화
  document.getElementById("display").textContent = "0";
};

checkValidAppendNumber = (number) => {
  if (!/^[0-9]$/.test(number)) throw new Error("유효한 숫자를 입력하세요.");
};

checkValidOperator = (op) => {
  if (!["+", "-", "*", "/"].includes(op))
    throw new Error("유효한 연산자를 선택하세요.");
  if (!currentInput) throw new Error("숫자를 먼저 입력하세요.");
};

checkValidFirstNumber = () => {
  if (isNaN(firstNumber)) throw new Error("유효한 숫자를 입력하세요.");
};

checkValidCalculate = () => {
  if (firstNumber === null || operator === null || !currentInput)
    throw new Error("계산에 필요한 값이 부족합니다.");
};

checkValidSecondNumber = (secondNumber) => {
  if (isNaN(secondNumber)) throw new Error("유효한 숫자를 입력하세요.");
  if (operator === "/" && secondNumber === 0)
    throw new Error("0으로 나눌 수 없습니다.");
};

// 숫자 버튼 클릭 시 디스플레이에 숫자 추가
const appendNumber = (number) => {
  if (isReset) {
    resetDisplay();
    isReset = false;
  }
  try {
    checkValidAppendNumber(number);
    setDisplay((currentInput += number));
  } catch (error) {
    showError(error.message);
  }
};

// 연산자 버튼 클릭 시 연산자 설정
const setOperator = (op) => {
  try {
    checkValidOperator(op);
    firstNumber = Number(currentInput);
    checkValidFirstNumber();
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

const calculateResult = (firstNumber, operator, secondNumber) => {
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
};

const showResult = (result) => {
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("d-none", "alert-danger");
  resultElement.classList.add("alert-info");
  resultElement.textContent = `결과: ${result}`;
};

const saveHistory = (record) => {
  history.push(record);
  console.log(history);
  console.log("계산 기록:", JSON.stringify(history, null, 2));
};

const resetClaculate = () => {
  currentInput = result.toString();
  firstNumber = null;
  operator = null;
  document.getElementById("display").textContent = currentInput;
  isReset = true;
};

// 계산 실행
const calculate = () => {
  try {
    checkValidCalculate();
    const secondNumber = Number(currentInput);
    checkValidSecondNumber(secondNumber);
    const result = calculateResult(firstNumber, operator, secondNumber);
    showResult(result);
    saveHistory({ firstNumber, operator, secondNumber, result });
    clearDisplay();
    resetClaculate(result);
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

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (VALID_NUMBERS.includes(key)) appendNumber(key);
  if (VALID_OPERATOR.includes(key)) setOperator(key);
  if (key === "Enter") calculate();
});
