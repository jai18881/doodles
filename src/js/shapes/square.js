import shape from 'shape';

class Square extends shape {
    constructor(coords) {
        super(coords);
        this.type = 'square';
    }
}

export default Square;
