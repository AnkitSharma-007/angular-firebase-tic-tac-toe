export class Game {
    cellValue: string[][];
    currentPlayer: string;

    constructor() {
        this.cellValue = [];
    }
}

export class GameDTO {
    id: string;
    row0: string[];
    row1: string[];
    row2: string[];
    currentPlayer: string;
}