let history = []; // 계산 기록을 저장하는 배열
let currentInput = "0"; // 현재 입력값 (초기값 "0"으로 변경하여 숫자 입력 시 '0'이 사라지도록 처리)
let firstNumber = null; // 첫 번째 숫자
let operator = null; // 선택된 연산자

// DOM 요소 가져오기 (전역 변수로 선언하여 반복적인 DOM 접근 줄이기)
const displayElement = document.getElementById("display");
const resultElement = document.getElementById("result");

// 숫자 버튼 클릭 시 디스플레이에 숫자 추가
const appendNumber = (number) => {
  try {
    // TODO: 학생들이 작성해야 할 로직
    // 1. number가 유효한 숫자인지 확인 (예: 문자열 "0" ~ "9")
    if (!/^[0-9]$/.test(number)) {
      throw new Error("유효한 숫자를 입력하세요.");
    }

    // currentInput에 숫자 추가 (0 처리 로직 포함)
    if (currentInput === "0" && number === "0") {
      // '0' 다음에 또 '0'을 입력하면 '0' 유지 (예: 00 -> 0)
      return;
    } else if (currentInput === "0" && number !== "0") {
      // '0' 다음에 다른 숫자를 입력하면 '0'을 대체 (예: 05 -> 5)
      currentInput = number;
    } else {
      // 기존 입력값 뒤에 숫자 추가
      currentInput += number;
    }

    // 디스플레이 업데이트
    if (!displayElement) throw new Error("디스플레이 요소를 찾을 수 없습니다.");
    displayElement.textContent = currentInput;

    // 에러 메시지 초기화 (새로운 입력 시작 시)
    resultElement.classList.add("d-none");
    resultElement.textContent = "";
  } catch (error) {
    showError(error.message);
  }
};

// 연산자 버튼 클릭 시 연산자 설정
const setOperator = (op) => {
  try {
    // TODO: 학생들이 작성해야 할 로직
    // 2. op가 유효한 연산자(+, -, *, /)인지 확인
    const validOperators = ["+", "-", "*", "/"];
    if (!validOperators.includes(op)) {
      throw new Error("유효한 연산자를 선택하세요.");
    }

    // 현재 입력값이 없으면 예외 처리 (currentInput이 "0"인 경우도 숫자가 입력된 것으로 간주)
    if (currentInput === "" || currentInput === null) {
      throw new Error("숫자를 먼저 입력하세요.");
    }

    // 이미 firstNumber와 operator가 설정된 상태에서 다시 연산자를 누르면,
    // 현재까지의 값으로 중간 계산을 수행
    if (firstNumber !== null && operator !== null) {
      calculate(); // 이전 연산자와 현재 입력값으로 계산 수행
    }

    // 첫 번째 숫자 저장
    firstNumber = Number(currentInput);

    // TODO: 학생들이 작성해야 할 로직
    // 3. firstNumber가 유효한 숫자인지 확인
    if (isNaN(firstNumber)) {
      throw new Error("유효한 숫자를 입력하세요.");
    }

    operator = op;
    currentInput = ""; // 다음 숫자 입력을 위해 입력값 초기화
    displayElement.textContent = "0"; // 디스플레이를 0으로 설정하여 다음 숫자 입력 대기

    // 에러 메시지 초기화 (새로운 연산 시작 시)
    resultElement.classList.add("d-none");
    resultElement.textContent = "";
  } catch (error) {
    showError(error.message);
  }
};

// 초기화 버튼 클릭 시 모든 값 초기화
const clearDisplay = () => {
  currentInput = "0"; // 초기값을 "0"으로 설정
  firstNumber = null;
  operator = null;
  displayElement.textContent = "0";
  resultElement.classList.add("d-none"); // 에러/결과 메시지 숨김
  resultElement.textContent = ""; // 내용도 비워줌
};

// 계산 실행
const calculate = () => {
  try {
    // TODO: 학생들이 작성해야 할 로직
    // 4. firstNumber, operator, currentInput(두 번째 숫자)이 모두 존재하는지 확인
    if (firstNumber === null || operator === null || currentInput === "") {
      throw new Error("계산에 필요한 값이 부족합니다.");
    }

    const secondNumber = Number(currentInput);

    // TODO: 학생들이 작성해야 할 로직
    // 5. secondNumber가 유효한 숫자인지 확인
    if (isNaN(secondNumber)) {
      throw new Error("유효한 숫자를 입력하세요.");
    }
    // 6. 나눗셈에서 secondNumber가 0인지 확인
    if (operator === "/" && secondNumber === 0) {
      throw new Error("0으로 나눌 수 없습니다.");
    }

    let result;
    // TODO: 학생들이 작성해야 할 로직
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
      default:
        throw new Error("알 수 없는 연산자입니다.");
    }

    // 결과 출력
    resultElement.classList.remove("d-none", "alert-danger");
    resultElement.classList.add("alert-info");
    resultElement.textContent = `결과: ${result}`;

    // 계산 기록 저장 (firstNumber, operator는 계산 전에 사용된 값이어야 하므로, record 객체 생성 시 현재 변수 값 사용)
    const record = { firstNumber, operator, secondNumber, result };
    history.push(record);
    console.log("계산 기록:", JSON.stringify(history, null, 2));

    // 계산 후 다음 연산을 위해 currentInput을 결과값으로 설정
    currentInput = result.toString();
    firstNumber = null; // 첫 번째 숫자 초기화 (결과값이 다음 연산의 첫 번째 숫자가 됨)
    operator = null; // 연산자 초기화
    displayElement.textContent = currentInput; // 디스플레이에 결과값 표시
  } catch (error) {
    showError(error.message);
  }
};

// 에러 메시지 출력
const showError = (message) => {
  resultElement.classList.remove("d-none", "alert-info");
  resultElement.classList.add("alert-danger");
  resultElement.textContent = `에러: ${message}`;

  // 에러 발생 시 계산기 상태 초기화
  currentInput = "0";
  firstNumber = null;
  operator = null;
  displayElement.textContent = "0";
};

// HTML 문서가 완전히 로드된 후 이벤트 리스너 설정
document.addEventListener("DOMContentLoaded", () => {
  // 숫자 버튼 이벤트 리스너
  document.querySelectorAll(".number").forEach((button) => {
    button.addEventListener("click", () => appendNumber(button.textContent));
  });

  // 연산자 버튼 이벤트 리스너
  document.querySelectorAll(".operator").forEach((button) => {
    button.addEventListener("click", () => setOperator(button.textContent));
  });

  // '=' 버튼 이벤트 리스너
  document.getElementById("equals").addEventListener("click", calculate);

  // 'C' (초기화) 버튼 이벤트 리스너
  document.getElementById("clear").addEventListener("click", clearDisplay);
});
