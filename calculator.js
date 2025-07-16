let history = []; // 계산 기록 저장
let currentInput = "";
let firstNumber = null;
let operator = null;
let isResultDisplayed = false; // 계산 결과가 방금 표시됐는지 여부

// 숫자 버튼 클릭 시
const appendNumber = (number) => {
  if (!/^[0-9]$/.test(number)) {
    showError("숫자를 입력하세요.");
    return;
  }

  // 결과가 표시된 상태라면 입력 초기화
  if (isResultDisplayed) {
    currentInput = "";
    isResultDisplayed = false;
  }

  currentInput += number;
  updateDisplay(currentInput);
};

// 연산자 버튼 클릭 시
const setOperator = (op) => {
  if (!["+", "-", "*", "/"].includes(op)) {
    showError("올바른 연산자를 선택하세요.");
    return;
  }

  if (currentInput === "") {
    showError("숫자를 먼저 입력하세요.");
    return;
  }

  firstNumber = Number(currentInput);
  if (isNaN(firstNumber)) {
    showError("유효한 숫자를 입력하세요.");
    return;
  }

  operator = op;
  currentInput = "";
  updateDisplay("0");
};

// 디스플레이 업데이트
const updateDisplay = (value) => {
  const display = document.getElementById("display");
  if (display) {
    display.textContent = value;
  }
};

// 계산 실행
const calculate = () => {
  const resultElement = document.getElementById("result");

  if (firstNumber === null || operator === null || currentInput === "") {
    showError("계산에 필요한 값이 부족합니다.");
    return;
  }

  const secondNumber = Number(currentInput);
  if (isNaN(secondNumber)) {
    showError("두 번째 숫자가 유효하지 않습니다.");
    return;
  }

  if (operator === "/" && secondNumber === 0) {
    showError("0으로 나눌 수 없습니다.");
    return;
  }

  let result;

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
    default:
      showError("올바른 연산자가 아닙니다.");
      return;
  }

  resultElement.classList.remove("d-none", "alert-danger");
  resultElement.classList.add("alert-info");
  resultElement.textContent = `결과: ${result}`;

  // 계산 기록 저장
  const record = {
    firstNumber,
    operator,
    secondNumber,
    result,
  };
  history.push(record);
  showHistory();

  // 다음 입력을 위한 초기화
  currentInput = result.toString();
  firstNumber = null;
  operator = null;
  updateDisplay(currentInput);
  isResultDisplayed = true; // 결과가 표시됨
};

// 전체 초기화
const clearDisplay = () => {
  currentInput = "";
  firstNumber = null;
  operator = null;
  isResultDisplayed = false;
  updateDisplay("0");
  const result = document.getElementById("result");
  result.classList.add("d-none");
  result.textContent = "";
  document.getElementById("historyList").innerHTML = "";
  history = [];
};

// 에러 메시지 출력
const showError = (message) => {
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("d-none", "alert-info");
  resultElement.classList.add("alert-danger");
  resultElement.textContent = `에러: ${message}`;
};

// 히스토리 출력
const showHistory = () => {
  const historyList = document.getElementById("historyList");
  if (!historyList) return;

  historyList.innerHTML = "";
  history.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${index + 1}. ${entry.firstNumber} ${entry.operator} ${
      entry.secondNumber
    } = ${entry.result}`;
    historyList.appendChild(li);
  });
};
