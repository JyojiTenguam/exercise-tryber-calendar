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

const decemberDaysList = [29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

// Escreva seu código abaixo.

// Exercício 1 – Crie um calendário dinamicamente

const createDays = () => {
  const daysList = document.querySelector('#days');

  const specialDays = {
    24: ['holiday'],
    31: ['holiday'],
    4: ['friday'],
    11: ['friday'],
    18: ['friday'],
    25: ['holiday', 'friday'],
  };

  decemberDaysList.forEach((day) => {
    const dayOfDecember = document.createElement('li');
    dayOfDecember.classList.add('day', ...(specialDays[day] || []));
    dayOfDecember.innerText = day;
    daysList.appendChild(dayOfDecember);
  });
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
const dayItems = document.querySelectorAll('.day');

dayItems.forEach((day) => {
  day.addEventListener('mouseenter', (event) => {
    event.target.style.fontSize = '30px';
  });

  day.addEventListener('mouseleave', (event) => {
    event.target.style.fontSize = '20px';
  });
});

// 05 - Implemente uma função que seleciona uma tarefa e atribua a cor da tarefa ao dia do calendário
const tasksDiv = document.querySelectorAll('.task');

let taskColor;

tasksDiv.forEach((task) => {
  task.addEventListener('click', (event) => {
    if (task.classList.contains('selected')) {
      task.classList.remove('selected');
      taskColor = 'rgb(119, 119, 119)';
    } else {
      tasksDiv.forEach((t) => {
        t.classList.remove('selected');
      });

      task.classList.add('selected');
      taskColor = event.target.style.backgroundColor;
    }
  });
});

dayItems.forEach((day) => {
  day.addEventListener('click', () => {
    if (day.classList.contains('selectedDay')) {
      day.classList.remove('selectedDay');
      day.style.color = 'rgb(119, 119, 119)';
    } else {
      dayItems.forEach((d) => {
        d.classList.remove('selectedDay');
      });

      day.classList.add('selectedDay');
      day.style.color = taskColor;
    }
  });
});

// 06 - Adicionando compromissos a seu calendário
const addButton = document.querySelector('#btn-add');
const taskListParent = document.querySelector('#task-list');
const textArea = document.querySelector('#task-input');

// Função para gerar uma cor aleatória (pode ser substituída pela lógica de obtenção de cor apropriada)
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

addButton.addEventListener('click', () => {
  if (textArea.value === '') {
    return alert('A área de texto está vazia!');
  }

  const taskList = document.createElement('li');
  taskList.textContent = textArea.value;

  // Adiciona a lógica de seleção de tarefa ao clicar em um item da lista
  taskList.addEventListener('click', () => {
    tasksDiv.forEach((task) => {
      task.classList.remove('selected');
    });

    taskColor = getRandomColor(); // Ou use a lógica adequada para obter a cor da tarefa
    tasksDiv.forEach((task) => {
      task.style.backgroundColor = taskColor;
    });
  });

  taskListParent.appendChild(taskList);
});

textArea.addEventListener('keydown', (event) => {
  const { key: enter } = event;

  if (textArea.value === '') {
    return alert('A área de texto está vazia!');
  }

  if (enter === 'Enter') {
    const taskList = document.createElement('li');
    taskList.textContent = textArea.value;

    // Adiciona a lógica de seleção de tarefa ao clicar em um item da lista
    // eslint-disable-next-line sonarjs/no-identical-functions
    taskList.addEventListener('click', () => {
      tasksDiv.forEach((task) => {
        task.classList.remove('selected');
      });

      taskColor = getRandomColor(); // Ou use a lógica adequada para obter a cor da tarefa
      tasksDiv.forEach((task) => {
        task.style.backgroundColor = taskColor;
      });
    });

    taskListParent.appendChild(taskList);
  }
});
