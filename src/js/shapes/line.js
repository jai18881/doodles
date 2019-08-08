class Line extends shape {
    constructor(coords) {
        super(coords);
        this.type = 'line';
        this.lineWidth = 1;
        this.strokeStyle = 'black';
        this.coordinates = [];
    }

    set setCoordinates(arr) {
        this.coordinates = arr;
    }
}

export default Line;
