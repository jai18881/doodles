class Shape {
    constructor(size) {
        this.coordinates = 0;
        this.type = 'shape';
        this.width = size.width;
        this.height = size.height;
    }

    get size() {
        return { width: this.width, height: this.height };
    }

    set size({ width, height }) {
        this.width = width;
        this.height = height;
    }

    get coordinates() {
        return this.coordinates;
    }

    set coordinates(coords) {
        this.coordinates = coords;
    }
}

export default Shape;
