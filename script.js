const createDaysOfTheWeek = () => {
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const weekDaysList = document.querySelector('.week-days');

  for (let index = 0; index < weekDays.length; index += 1) {
    const days = weekDays[index];
    const dayListItem = document.createElement('li');
    dayListItem.innerHTML = days;

    weekDaysList.appendChild(dayListItem);
  }
};

createDaysOfTheWeek();

const decemberDaysList = [29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

// Escreva seu código abaixo.

// Exercício 1 – Crie um calendário dinamicamente

const createDays = () => {
  const daysList = document.querySelector('#days');

  for (let index = 0; index < decemberDaysList.length; index += 1) {
    const day = decemberDaysList[index];
    const dayOfDecember = document.createElement('li');
    dayOfDecember.classList.add('day');

    if (day === 24 || day === 31) {
      dayOfDecember.classList.add('holiday');
    } else if (day === 4 || day === 11 || day === 18) {
      dayOfDecember.classList.add('friday');
    } else if (day === 25) {
      dayOfDecember.classList.add('holiday');
      dayOfDecember.classList.add('friday');
    }

    dayOfDecember.innerText = day;
    daysList.appendChild(dayOfDecember);
  }
};

createDays();

// 02 - Implemente uma função que muda a cor de fundo dos dias que possuem a classe "holiday".
document.addEventListener('DOMContentLoaded', () => {
  const btnHoliday = document.getElementById('btn-holiday');

  btnHoliday.addEventListener('click', () => {
    const holidayDays = document.querySelectorAll('.holiday');

    for (const day of holidayDays) {
      const currentColor = day.style.backgroundColor;
      const newColor = (currentColor === 'red') ? 'rgb(238,238,238)' : 'red';
      day.style.backgroundColor = newColor;
    }
  });
});

// 03 - Implemente uma função que modifica o texto exibido nos dias que são sextas-feiras
document.addEventListener('DOMContentLoaded', () => {
  const fridayDays = document.querySelectorAll('.friday');
  const originalFridayTexts = [];

  for (const day of fridayDays) {
    originalFridayTexts.push(day.innerText);
  }

  document.getElementById('btn-friday').addEventListener('click', () => {
    fridayDays.forEach((day, index) => {
      const originalText = originalFridayTexts[index];
      day.innerText = (day.innerText === 'É sexta') ? originalText : 'É sexta';
    });
  });
});

// 04 - Implemente duas funções que criem um efeito de "zoom"
document.addEventListener('DOMContentLoaded', () => {
  const daysList = document.getElementById('days');
  const dayItems = daysList.querySelectorAll('.day');

  dayItems.forEach((day) => {
    day.addEventListener('mouseenter', () => {
      day.style.cssText = 'font-size: 30px';
    });

    day.addEventListener('mouseleave', () => {
      day.style.cssText = 'font-size: 20px';
    });
  });
});
// 05 - Implemente uma função que seleciona uma tarefa e atribua a cor da tarefa ao dia do calendário

// 06 - Adicionando compromissos a seu calendário
