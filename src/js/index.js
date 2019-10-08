import { COLORS } from './colors.js';
import Circle from './shapes/circle.js';
import Scene from './scene/scene.js';

const scene = new Scene(canvas);

document.querySelector('.button.circle').onclick = function () {
    window.mode = 'c';
}

document.querySelector('.button.line').onclick = function () {
    window.mode = 'l';
}

const list = document.querySelectorAll('li');
list.forEach((item, i) => {
    item.style.backgroundColor = COLORS[i * 2];
    item.tabIndex = -1;

    item.addEventListener('click', function(event) {
        scene.strokeStyle = event.target.style.backgroundColor;
    });
});

const strokeGroup = document.getElementsByName('strokeGroup');
strokeGroup.forEach((pen) => {
    pen.addEventListener('click', (event) => {
        scene.lineWidth = event.target.value;
    });
});

document.querySelector('.export-button').onclick = function() {
    scene.exportPng(canvas2);
}
