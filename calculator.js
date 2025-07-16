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
        document.getElementById("display").textContent = "0";
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

        // 계산 후 초기화
        currentInput = result.toString();
        firstNumber = null;
        operator = null;
        document.getElementById("display").textContent = currentInput;
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

// 파일 맨 위에 추가
const VALID_OPERATORS = ["+", "-", "*", "/"]; // const 사용
var calculationCount = 0; // var 사용 (전역 스코프)

// calculate 함수 안에 추가 (let result; 위에)
let isCalculating = true; // let 사용 (블록 스코프)
calculationCount++; // var 변수 증가
