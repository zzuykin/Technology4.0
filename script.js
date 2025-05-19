const machineThresholds = {
    "Токарный станок с ЧПУ": { temp_max: 30, pressure_min: 4, pressure_max: 6, vibration_max: 0.5, rpm_min: 500, rpm_max: 3000, current_max: 15 },
    "Фрезерный станок с ЧПУ": { temp_max: 30, pressure_min: 4, pressure_max: 6, vibration_max: 0.5, rpm_min: 1000, rpm_max: 8000, current_max: 20 },
    "Шлифовальный станок с ЧПУ": { temp_max: 30, pressure_min: 4, pressure_max: 6, vibration_max: 0.5, rpm_min: 1000, rpm_max: 2000, current_max: 15 }
};

function checkMachine() {
    // Получаем значения полей формы
    const machine = document.getElementById('machine').value;
    const temp = parseFloat(document.getElementById('temp').value);
    const pressure = parseFloat(document.getElementById('pressure').value);
    const vibration = parseFloat(document.getElementById('vibration').value);
    const rpm = parseInt(document.getElementById('rpm').value);
    const current = parseFloat(document.getElementById('current').value);

    // Получаем блоки для вывода сообщений об ошибках
    const tempError = document.getElementById('temp-error');
    const pressureError = document.getElementById('pressure-error');
    const vibrationError = document.getElementById('vibration-error');
    const rpmError = document.getElementById('rpm-error');
    const currentError = document.getElementById('current-error');

    // Скрываем ошибки по умолчанию
    tempError.textContent = '';
    pressureError.textContent = '';
    vibrationError.textContent = '';
    rpmError.textContent = '';
    currentError.textContent = '';

    // Флаг для проверки ошибок
    let hasError = false;

    // Проверка на пустые или некорректные значения
    if (isNaN(temp) || temp === "") {
        tempError.textContent = "Это поле не должно быть пустым";
        hasError = true;
    }
    if (isNaN(pressure) || pressure === "") {
        pressureError.textContent = "Это поле не должно быть пустым";
        hasError = true;
    }
    if (isNaN(vibration) || vibration === "") {
        vibrationError.textContent = "Это поле не должно быть пустым";
        hasError = true;
    }
    if (isNaN(rpm) || rpm === "") {
        rpmError.textContent = "Это поле не должно быть пустым";
        hasError = true;
    }
    if (isNaN(current) || current === "") {
        currentError.textContent = "Это поле не должно быть пустым";
        hasError = true;
    }

    // Если есть ошибки, прекращаем выполнение
    if (hasError) {
        return;
    }

    // Если ошибок нет, продолжаем обработку данных
    const rules = machineThresholds[machine];
    const problems = [];

    if (temp > rules.temp_max) {
        problems.push("Превышение температуры");
    }
    if (pressure < rules.pressure_min || pressure > rules.pressure_max) {
        problems.push("Аномальное давление");
    }
    if (vibration > rules.vibration_max) {
        problems.push("Высокая вибрация");
    }
    if (rpm < rules.rpm_min || rpm > rules.rpm_max) {
        problems.push("Обороты вне нормы");
    }
    if (current > rules.current_max) {
        problems.push("Превышение тока");
    }

    let result = "";
    if (problems.length === 0) {
        result = "Станок работает в норме.";
    } else if (problems.length >= 2) {
        result = `Тревога! Необходим ремонт. Проблемы: ${problems.join(", ")}`;
    } else {
        result = `Рекомендуется диагностика. Проблема: ${problems[0]}`;
    }

    document.getElementById('result').innerText = result;
}


function showAbout() {
    document.getElementById("aboutModal").style.display = "block";
}

// Функция для закрытия модального окна "О проекте"
function closeAbout() {
    document.getElementById("aboutModal").style.display = "none";
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {  // Проверка на нажатие клавиши Esc
        closeAbout();
    }
});