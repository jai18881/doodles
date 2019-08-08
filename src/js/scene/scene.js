import Circle from "../shapes/circle.js";

class Scene {
    constructor(canvas) {
        const self = this;
        this.canvas = canvas;
        this.board = canvas.getContext('2d');
        this.board2 = canvas2.getContext('2d');
        this.shapesArr = [];
        this.mouseDown = false;
        this.currentX = -9999;
        this.currentY = -9999;
        this.strokeStyle = 'black';

        this.setLineDrawing = function(event) { return self.drawLine(event, self) };
        this.setCircleDrawing = function(event) { return self.drawCircle(event, self) };

        this.registerListeners();
        this.paintObj = {};
    }

    getPaintObj() {
        return {
            type: 's',
            coordinates: [],
            fillStyle: '',
            strokeStyle: '',
            lineWidth: 1
        };
    }

    addShape(shape) {
        this.shapesArr.push(shape);
    }

    setMouseDown(event) {
        this.paintObj = this.getPaintObj();
        this.paintObj.strokeStyle = this.strokeStyle;

        const self = this;
        this.mouseDown = true;

        if(window.mode === 'c') {
            this.currentX = event.offsetX;
            this.currentY = event.offsetY;

            this.paintObj.type = 'c';
            this.paintObj.coordinates.push([this.currentX, this.currentY]);

            this.canvas.addEventListener('mousemove', this.setCircleDrawing);
        } else if (window.mode === 's') {

        } else if (window.mode === 'l') {
            this.paintObj.type = 'l';
            this.canvas.addEventListener('mousemove', this.setLineDrawing);
        }
    }

    drawLine(event, self) {
        const board = canvas.getContext('2d');

        const x = event.offsetX;
        const y = event.offsetY;

        board.beginPath();

        if (this.currentX === -9999 && this.currentY === -9999) {
            board.moveTo(x, y);
            self.paintObj.coordinates.push([x, y]);
        }
        else {
            // board.moveTo(self.currentX, self.currentY);
            board.quadraticCurveTo(self.currentX, self.currentY, x, y);
            // ignore same coordinates. e.g. user holds the keypad down and does not move the cursor
            if (x !== self.currentX && y !== self.currentY) {
                self.paintObj.coordinates.push([x, y]);
            }
        }

        self.currentX = x;
        self.currentY = y;

        board.lineWidth = 1;
        board.closePath();
        board.strokeStyle = self.strokeStyle;
        board.stroke();
    }

    redrawLine(shapeObj) {
        shapeObj.coordinates.forEach((coordinate, i, coordinates) => {
            if (i === 0) {
                this.board.moveTo(...coordinate);
                this.board2.moveTo(...coordinate);
            } else {
                console.log(...coordinates[i - 1], ...coordinate);
                this.board.quadraticCurveTo(...coordinates[i - 1], ...coordinate);
                this.board2.quadraticCurveTo(...coordinates[i - 1], ...coordinate);
                // this.board.lineTo(...coordinate);
            }
        });
        this.board.stroke();
        this.board2.stroke();
    }

    drawCircle (event, self) {
        const board = canvas.getContext('2d');

        const x = event.offsetX;
        const y = event.offsetY;
        let distance = 0;

        board.clearRect(0, 0, canvas.width, canvas.height);
        board.beginPath();

        if (this.currentX === -9999 && this.currentY === -9999) {
            board.moveTo(x, y);
        }
        else {
            distance = Math.sqrt(Math.pow(x - self.currentX, 2) + Math.pow(y - self.currentY, 2));
            board.arc(x, y, distance, 0, 2 * Math.PI);
        }

        board.lineWidth = 1;
        board.closePath();
        board.strokeStyle = self.strokeStyle;
        board.stroke();
    }

    redrawCircle(shapeObj) {
        const coords = shapeObj.coordinates;
        const distance = Math.sqrt(Math.pow(coords[1][0] - coords[0][0], 2) + Math.pow(coords[1][1] - coords[0][1], 2));

        this.board.beginPath();
        this.board2.beginPath();

        this.board.moveTo(coords[0][0], coords[0][1]);
        this.board2.moveTo(coords[0][0], coords[0][1]);

        this.board.arc(coords[1][0], coords[1][1], distance, 0, 2 * Math.PI);
        this.board2.arc(coords[1][0], coords[1][1], distance, 0, 2 * Math.PI);

        this.board.stroke();
        this.board2.stroke();
    }

    setMouseUp(event) {
        const self = this;
        this.mouseDown = false;
        this.currentX = -9999;
        this.currentY = -9999;

        if(window.mode === 'c') {
            const x = event.offsetX;
            const y = event.offsetY;
            self.paintObj.coordinates.push([x, y]);
            this.canvas.removeEventListener('mousemove', this.setCircleDrawing);
        } else if (window.mode === 's') {

        } else if (window.mode === 'l') {
            this.canvas.removeEventListener('mousemove', this.setLineDrawing);
        }

        self.shapesArr.push(self.paintObj);
        console.log('shapesArr.....', self.shapesArr);
        this.redrawAll(self.shapesArr);
    }

    resize(event) {
        const centerRect = document.querySelector('.center').getBoundingClientRect();
        const parentWidth = centerRect.width;
        const parentHeight = centerRect.height;
        const canvas = document.querySelector('#canvas');

        canvas.width = parentWidth - 2;
        canvas.height = parentHeight - 2;

        canvas2.width = parentWidth - 2;
        canvas2.height = parentHeight - 2;
    }

    registerListeners() {
        this.drawLine = this.drawLine.bind(this);
        this.canvas.addEventListener('mousedown', this.setMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.setMouseUp.bind(this));
        window.addEventListener('resize', this.resize);
        window.addEventListener('load', this.resize);
    }

    redrawAll() {
        this.board.clearRect(0, 0, canvas.width, canvas.height);
        this.shapesArr.forEach((shape, i) => {
            if(shape.type === 'l') {
                this.redrawLine(shape);
            } else if (shape.type === 'c') {
                this.redrawCircle(shape);
            }
        })
    }
}

export default Scene;
