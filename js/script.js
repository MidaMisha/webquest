// Базовые функции навигации и печати

// 1. Подсветка активной страницы в навигации
document.addEventListener('DOMContentLoaded', function() {
    // Определяем текущую страницу
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        const btnPage = btn.getAttribute('href');
        if (btnPage === currentPage) {
            btn.classList.add('active');
        }
    });
    
    // 2. Функция печати текущей миссии
    const printButtons = document.querySelectorAll('.print-btn');
    printButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.print();
        });
    });
    
    // 3. Простая проверка заполнения полей (опционально)
    const answerInputs = document.querySelectorAll('.answer-input');
    answerInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#4df0d6';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
        });
    });
});

// 4. Сохранение названия команды в LocalStorage (опционально)
function saveTeamName() {
    const teamNameInput = document.getElementById('team-name');
    if (teamNameInput) {
        const teamName = teamNameInput.value.trim();
        if (teamName) {
            localStorage.setItem('quest-team-name', teamName);
            alert(`Название команды "${teamName}" сохранено!`);
        }
    }
}

// Расширенный script.js с дополнительными функциями

document.addEventListener('DOMContentLoaded', function() {
    // 1. Подсветка активной страницы
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        const btnPage = btn.getAttribute('href');
        if (btnPage === currentPage) {
            btn.classList.add('active');
        }
    });
    
    // 2. Функция печати
    const printButtons = document.querySelectorAll('.print-btn');
    printButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            window.print();
        });
    });
    
    // 3. Подсветка заполненных полей
    const answerInputs = document.querySelectorAll('.answer-input');
    answerInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#4df0d6';
                this.style.backgroundColor = 'rgba(77, 240, 214, 0.05)';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
    });
    
    // 4. Таймер обратного отсчета (опционально для уроков)
    const timerElement = document.getElementById('quest-timer');
    if (timerElement) {
        let timeLeft = 45 * 60; // 45 минут в секундах
        
        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            timerElement.innerHTML = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 300) { // Последние 5 минут
                timerElement.style.color = '#ff6b6b';
                timerElement.style.animation = 'pulse 1s infinite';
            }
            
            if (timeLeft > 0) {
                timeLeft--;
                setTimeout(updateTimer, 1000);
            } else {
                timerElement.innerHTML = 'Время вышло! ⏰';
                timerElement.style.color = '#ff6b6b';
            }
        }
        
        updateTimer();
    }
    
    // 5. Сохранение прогресса команды
    function saveProgress() {
        const progress = {
            page: currentPage,
            timestamp: new Date().toISOString(),
            inputs: {}
        };
        
        // Сохраняем значения всех полей ввода
        document.querySelectorAll('input, textarea').forEach(input => {
            if (input.id && input.value.trim()) {
                progress.inputs[input.id] = input.value;
            }
        });
        
        localStorage.setItem('quest-progress', JSON.stringify(progress));
    }
    
    // Автосохранение каждые 30 секунд
    setInterval(saveProgress, 30000);
    
    // 6. Восстановление сохраненного прогресса
    const savedProgress = localStorage.getItem('quest-progress');
    if (savedProgress) {
        try {
            const progress = JSON.parse(savedProgress);
            Object.keys(progress.inputs).forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.value = progress.inputs[id];
                    // Триггерим событие input для подсветки
                    element.dispatchEvent(new Event('input'));
                }
            });
        } catch (e) {
            console.log('Не удалось загрузить сохраненный прогресс');
        }
    }
    
    // 7. Анимация появления элементов
    const animatedElements = document.querySelectorAll('.task-block, .role-card, .criteria-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Глобальные функции
function saveTeamInfo() {
    const teamName = document.getElementById('team-name');
    if (teamName && teamName.value.trim()) {
        localStorage.setItem('quest-team-name', teamName.value.trim());
    }
}

function resetProgress() {
    if (confirm('Вы уверены, что хотите сбросить весь прогресс? Все сохраненные данные будут удалены.')) {
        localStorage.removeItem('quest-team-data');
        localStorage.removeItem('quest-progress');
        alert('Прогресс сброшен. Страница будет перезагружена.');
        window.location.reload();
    }
}

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .mission-icon {
        animation: float 3s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// === Квест: прогресс, тесты, подсказки и пароли ===

// Общее количество миссий в квесте
const TOTAL_MISSIONS = 10;

// Пометить миссию как завершённую
function markMissionCompleted(missionId) {
    const key = `mission_completed_${missionId}`;
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, 'true');
    }
    updateQuestProgress();
}

// Проверить, завершена ли миссия
function isMissionCompleted(missionId) {
    return localStorage.getItem(`mission_completed_${missionId}`) === 'true';
}

// Обновить прогрессбар
function updateQuestProgress() {
    const completed = Array.from({ length: TOTAL_MISSIONS }, (_, i) => i + 1)
        .filter(id => isMissionCompleted(id)).length;

    const percent = Math.round((completed / TOTAL_MISSIONS) * 100);

    const barInner = document.getElementById('progress-bar-inner');
    const textEl = document.getElementById('progress-text');

    if (barInner) {
        barInner.style.width = percent + '%';
    }
    if (textEl) {
        textEl.textContent = `${completed} из ${TOTAL_MISSIONS} миссий (${percent}%)`;

    }
}

// Обработка тестов на миссиях
function submitMissionTest(missionId) {
    const form = document.querySelector(`.quiz-form[data-mission="${missionId}"]`);
    if (!form) return;

    const questions = form.querySelectorAll('.quiz-question');
    let total = questions.length;
    let correct = 0;

    questions.forEach(q => {
        const correctValue = q.dataset.correct;
        const groupName = q.dataset.name;
        const checked = form.querySelector(`input[name="${groupName}"]:checked`);
        if (checked && checked.value === correctValue) {
            correct++;
            q.classList.remove('quiz-wrong');
            q.classList.add('quiz-correct');
        } else {
            q.classList.remove('quiz-correct');
            q.classList.add('quiz-wrong');
        }
    });

    const resultEl = document.getElementById(`quiz-result-${missionId}`);
    if (!resultEl) return;

    if (correct === total && total > 0) {
        resultEl.textContent = `Отлично! Все ${total} ответ(ов) верные. Миссия зачтена!`;
        resultEl.classList.add('quiz-success');
        markMissionCompleted(missionId);
        showPassword(missionId);
    } else {
        resultEl.textContent = `Верных ответов: ${correct} из ${total}. Попробуй ещё раз.`;
        resultEl.classList.remove('quiz-success');
    }
}

// Показ / скрытие подсказок
document.addEventListener('click', function (e) {
    const hintBtn = e.target.closest('.hint-btn');
    if (!hintBtn) return;

    const targetId = hintBtn.dataset.hintTarget;
    const hint = document.getElementById(targetId);
    if (!hint) return;

    const hidden = hint.hasAttribute('hidden');
    if (hidden) {
        hint.removeAttribute('hidden');
        hintBtn.textContent = 'Скрыть подсказку';
    } else {
        hint.setAttribute('hidden', 'hidden');
        hintBtn.textContent = 'Показать подсказку';
    }
});

// Система паролей между миссиями
function showPassword(missionId) {
    const box = document.getElementById(`mission-password-${missionId}`);
    if (box) {
        box.hidden = false;
    }
}

function checkMissionPassword(missionId, expectedPassword) {
    const input = document.getElementById(`password-input-${missionId}`);
    const msg = document.getElementById(`password-message-${missionId}`);
    if (!input || !msg) return;

    const value = input.value.trim().toUpperCase();
    const normalizedExpected = expectedPassword.trim().toUpperCase();

    if (!value) {
        msg.textContent = 'Введи пароль, который ты получил(а) в предыдущей миссии.';
        msg.classList.remove('password-ok');
        msg.classList.add('password-error');
        return;
    }

    if (value === normalizedExpected) {
        msg.textContent = 'Пароль верный! Можешь продолжать выполнение миссии.';
        msg.classList.remove('password-error');
        msg.classList.add('password-ok');
    } else {
        msg.textContent = 'Пароль неверный. Проверь, правильно ли ты выполнил(а) предыдущую миссию.';
        msg.classList.remove('password-ok');
        msg.classList.add('password-error');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    updateQuestProgress();
});
