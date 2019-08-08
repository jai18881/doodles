import { COLORS } from './colors.js';
import Circle from './shapes/circle.js';
import Scene from './scene/scene.js';

document.querySelector('.button.circle').onclick = function () {
    window.mode = 'c';
    console.log('circle clicked.....');
}

document.querySelector('.button.line').onclick = function () {
    window.mode = 'l';
    console.log('line clicked.....');
}

const list = document.querySelectorAll('li');
list.forEach((item, i) => {
    item.style.backgroundColor = COLORS[i * 2];

    item.addEventListener('click', function(event) {
        scene.strokeStyle = event.target.style.backgroundColor;
    })
});

console.log('canvas......', canvas);
const scene = new Scene(canvas);
