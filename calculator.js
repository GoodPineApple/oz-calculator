const VALID_OPERATORS = ["+", "-", "*", "/"]; // const: 상수
var calculationCount = 0; // var: 전역 변수 (함수 스코프)
let history = []; // 계산 기록을 저장하는 배열
let currentInput = ""; // 현재 입력값
let firstNumber = null; // 첫 번째 숫자
let operator = null; // 선택된 연산자

// 숫자 버튼 클릭 시 디스플레이에 숫자 추가
const appendNumber = (number) => {
    try {
        // TODO 1: number가 유효한 숫자인지 확인
        if (!/^[0-9]$/.test(number)) {
            throw new Error("유효한 숫자를 입력하세요.");
        }

        // currentInput에 숫자 추가
        currentInput += number;

        // 디스플레이 업데이트
        const display = document.getElementById("display");
        if (!display) throw new Error("디스플레이 요소를 찾을 수 없습니다.");
        display.textContent = currentInput;
    } catch (error) {
        showError(error.message);
    }
};

// 연산자 버튼 클릭 시 연산자 설정
const setOperator = (op) => {
    try {
        // TODO 2: op가 유효한 연산자(+, -, *, /)인지 확인
        if (!["+", "-", "*", "/"].includes(op)) {
            throw new Error("유효한 연산자를 선택하세요.");
        }

        // 현재 입력값이 없으면 예외 처리
        if (!currentInput) throw new Error("숫자를 먼저 입력하세요.");

        // 첫 번째 숫자 저장
        firstNumber = Number(currentInput);

        // TODO 3: firstNumber가 유효한 숫자인지 확인
        if (isNaN(firstNumber)) {
            throw new Error("유효한 숫자를 입력하세요.");
        }

        operator = op;
        currentInput = ""; // 입력값 초기화
        const operatorDisplay = op === "*" ? "×" : op === "/" ? "÷" : op;
        document.getElementById(
            "display"
        ).textContent = `${firstNumber} ${operatorDisplay}`;
    } catch (error) {
        showError(error.message);
    }
};

// 소수점 버튼 추가를 위한 함수 (화살표 함수 사용)
const appendDecimal = () => {
    try {
        if (currentInput.includes(".")) {
            throw new Error("소수점은 한 번만 입력할 수 있습니다.");
        }

        if (currentInput === "") {
            currentInput = "0.";
        } else {
            currentInput += ".";
        }

        document.getElementById("display").textContent = currentInput;
    } catch (error) {
        showError(error.message);
    }
};

// 백스페이스 함수 (함수 표현식 사용)
const backspace = function () {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);

        if (currentInput === "") {
            document.getElementById("display").textContent = "0";
        } else {
            document.getElementById("display").textContent = currentInput;
        }
    }
};

// 키보드 이벤트 리스너 추가 (문서 로드 후 실행)
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keydown", function (event) {
        const key = event.key;

        // 숫자 키
        if (key >= "0" && key <= "9") {
            appendNumber(key);
        }
        // 연산자 키
        else if (["+", "-", "*", "/"].includes(key)) {
            setOperator(key);
        }
        // 엔터 또는 = 키
        else if (key === "Enter" || key === "=") {
            event.preventDefault();
            calculate();
        }
        // 백스페이스 키
        else if (key === "Backspace") {
            event.preventDefault();
            backspace();
        }
        // Escape 키 (초기화)
        else if (key === "Escape") {
            clearDisplay();
        }
        // 소수점
        else if (key === ".") {
            appendDecimal();
        }
    });
});

// 초기화 버튼 클릭 시 모든 값 초기화
const clearDisplay = () => {
    currentInput = "";
    firstNumber = null;
    operator = null;
    document.getElementById("display").textContent = "0";
    document.getElementById("result").classList.add("d-none");
};

// 계산 실행
const calculate = () => {
    const resultElement = document.getElementById("result");
    try {
        // TODO 4: firstNumber, operator, currentInput(두 번째 숫자)이 모두 존재하는지 확인
        if (firstNumber === null || operator === null || !currentInput) {
            throw new Error("계산에 필요한 값이 부족합니다.");
        }

        const secondNumber = Number(currentInput);

        // TODO 5: secondNumber가 유효한 숫자인지 확인
        if (isNaN(secondNumber)) {
            throw new Error("유효한 숫자를 입력하세요.");
        }

        // TODO 6: 나눗셈에서 secondNumber가 0인지 확인
        if (operator === "/" && secondNumber === 0) {
            throw new Error("0으로 나눌 수 없습니다.");
        }

        let result;
        // TODO 7: operator에 따라 사칙연산 수행
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

        // 계산 기록 저장
        const record = { firstNumber, operator, secondNumber, result };
        history.push(record);
        console.log("계산 기록:", JSON.stringify(history, null, 2));
        displayHistory();

        // 계산 후 초기화
        currentInput = result.toString();
        firstNumber = null;
        operator = null;
        document.getElementById("display").textContent = currentInput;
    } catch (error) {
        showError(error.message);
    }

    // calculate 함수 안에 추가 (let result; 위에)
    let isCalculating = true; // let 사용 (블록 스코프)
    calculationCount++; // var 변수 증가
};
// 계산 기록을 화면에 표시하는 함수 (함수 선언문 사용)
function displayHistory() {
    const historyListElement = document.getElementById("historyList");

    if (history.length === 0) {
        historyListElement.innerHTML =
            '<small class="text-muted">계산 기록이 여기에 표시됩니다.</small>';
        return;
    }

    let historyHTML = '<div class="fw-bold mb-2">기록:</div>';

    // for 루프로 history 배열 순회 (과제 요구사항)
    for (let i = 0; i < history.length; i++) {
        const record = history[i];
        const operatorSymbol =
            record.operator === "*"
                ? "×"
                : record.operator === "/"
                ? "÷"
                : record.operator;

        historyHTML += `<div class="mb-1">
            <span class="badge bg-secondary me-2">${i + 1}</span>
            ${record.firstNumber} ${operatorSymbol} ${record.secondNumber} = ${
            record.result
        }
        </div>`;
    }

    historyListElement.innerHTML = historyHTML;
}

// 에러 메시지 출력
const showError = (message) => {
    const resultElement = document.getElementById("result");
    resultElement.classList.remove("d-none", "alert-info");
    resultElement.classList.add("alert-danger");
    resultElement.textContent = `에러: ${message}`;
};
