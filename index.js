import { data } from './data.js';

const body = document.querySelector('body');

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
body.appendChild(wrapper);

const textArea = document.createElement('textarea');
wrapper.appendChild(textArea);
textArea.value = ' ';
textArea.autofocus = true;

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
wrapper.appendChild(keyboard);

const text1 = document.createElement('p');
text1.innerText = 'Клавиатура создана в операционной системе Mac OS'
wrapper.appendChild(text1);

const text2 = document.createElement('p');
text2.innerText = 'Для переключения языка используйте caps lock'
wrapper.appendChild(text2);

let lang = 'eng';

function mouseClick(button) {
  button.addEventListener('mousedown', (event) => {
    if (event.target.dataset.type === 'key') {
      textArea.value += event.target.dataset.value;
      event.target.classList.add('focus');
    } else {
      event.target.classList.add('focus');
    }
  });

  button.addEventListener('mouseup', (event) => {
    event.target.classList.remove('focus');
  });
}

function keyboardClick(button) {
  document.addEventListener('keydown', (event) => {
    if (button.value === event.key && button.dataset.type !== 'specialKey' && button.dataset.type !== 'arrow') {
      textArea.value += button.dataset.value;
      button.classList.add('focus');
    }

    if (button.value === event.key && button.dataset.type === 'specialKey') button.classList.add('focus');

    if (button.value === event.key && button.dataset.type === 'arrow') button.classList.add('focus');
  });

  document.addEventListener('keyup', () => {
    button.classList.remove('focus');
  });
}

function changeLang(button) {
  button.addEventListener('click', () => {
    if (lang === 'eng') {
      for (const key of buttons) {
        key.innerText = key.dataset.valueRu.toUpperCase();
        key.dataset.value = key.dataset.valueRu;
        lang = 'ru';
      }
    } else {
      for (const key of buttons) {
        key.innerText = key.value.toUpperCase();
        key.dataset.value = key.value;
        lang = 'eng';
      }
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'CapsLock') {
    if (lang === 'eng') {
      for (const key of buttons) {
        key.innerText = key.dataset.valueRu.toUpperCase();
        key.dataset.value = key.dataset.valueRu;
        lang = 'ru';
      }
    } else {
      for (const key of buttons) {
        key.innerText = key.value.toUpperCase();
        key.dataset.value = key.value;
        lang = 'eng';
      }
    }
  }
});

let i = 0;

while (i < 5) {
  const row = document.createElement('div');
  row.classList.add('row', `${i + 1}`);
  keyboard.appendChild(row);
  i += 1;
}

const rows = document.querySelectorAll('.row');

for (const item of data) {
  const button = document.createElement('button');
  button.classList.add(`${item.size}`);
  button.value = `${item.key}`;
  button.dataset.type = item.type;
  button.dataset.value = item.keyEng;
  button.dataset.valueRu = item.keyRu;

  if (button.dataset.type === 'key') {
    button.innerText = item.keyEng.toUpperCase();
  } else if (button.dataset.type === 'specialKey') {
    button.innerText = item.keyEng;
  }

  for (const row of rows) {
    if (row.classList.contains(`${item.row}`)) {
      if (button.dataset.type === 'arrow') {
        const arrows = document.createElement('div');
        const arrowUpDown = document.createElement('div');

        if (button.value === 'ArrowLeft') {
          arrows.classList.add('wrapper-arrows');
          row.appendChild(arrows);
          arrows.appendChild(button);
          arrows.appendChild(arrowUpDown);
          arrowUpDown.classList.add('arrowUpDown');
        }

        const containerUpDown = document.querySelector('.arrowUpDown');

        if (button.value === 'ArrowUp' || button.value === 'ArrowDown') containerUpDown.appendChild(button);

        const containerArrows = document.querySelector('.wrapper-arrows');

        if (button.value === 'ArrowRight') containerArrows.appendChild(button);
      } else {
        row.appendChild(button);
      }
    }
  }

  mouseClick(button);
  keyboardClick(button);
  if (button.value === 'CapsLock') changeLang(button);
}

const buttons = document.querySelectorAll('.key');
