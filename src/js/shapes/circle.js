import shape from '../shapes/shape.js';

class Circle extends shape {
    constructor(coords) {
        super(coords);
        this.type = 'circle';
    }
}

export default Circle;
