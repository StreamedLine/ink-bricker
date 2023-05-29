import {getRandomColor} from "./utils.js";

export const WIDTH = 16;
export const HEIGHT = 12;

export class Game {
    constructor() {
        this.over = false;
    }

    // restart() {}
}

class Cell {
    constructor(x, y) {
        this.x=x;
        this.y=y;
        this.symb = " ";
    }
}

export class Player {
    constructor(x, y) {
        this.x=x;
        this.y=y;
        this.symb = "@";
        this.lives = 3;
    }

    move(x, y, updateGrid) {
        let newX = this.x + x;
        let newY = this.y + y;
        if (newX < 0 || newX > WIDTH-1 || newY < 0 || newY > HEIGHT-1) {
            return;
        }
        
        this.x+=x;
        this.y+=y;

        if (updateGrid) {
            grid.updateGrid();
        }
    }

    takeHit() {
        this.lives -= 1;

        if (!this.lives) {
            game.over = true;
        }
    }
}

export class Killer {
    constructor(direction) {
        this.x=Math.floor(Math.random() * WIDTH);
        this.y=0;
        this.symb = " ";
        this.backgroundColor = getRandomColor();
        this.direction = direction || [0, 1];
        this.complete = false;
    }

    move() {
        this.x += this.direction[0];
        this.y += this.direction[1];

        //out of bounds
        if (this.y === HEIGHT-1) {
            this.complete = true;
        }
    }
}

class Grid {
    constructor(player) {
        this.player = player;
        this.killers = [];
        this.updateGrid();
        this.danger = 0.6; // the lower the more dangerous
    }
    
    emptyGrid() {
        this.cells = [];
        this.friendlyGrid = [];
        for (let i = 0; i < HEIGHT; i++) {
            this.friendlyGrid.push([]);
            
            for(let j = 0; j < WIDTH; j++) {
                const cell = new Cell(j, i)
                this.friendlyGrid[i].push(cell);
                this.cells.push(cell);
            }
        }
    }

    incrementTime() {
        this.killers = this.killers.filter(killer => !killer.complete);
        this.killers.forEach(killer => killer.move());
        if (Math.random() > this.danger) {
            this.danger -= 0.01;
            this.killers.push(new Killer())
        }

        this.updateGrid();
    }

    updateGrid() {
        const collision = this.killers.some(({x,y}) => this.player.x === x && this.player.y === y);
        if (collision) {
            this.player.takeHit();
        }

        this.emptyGrid();

        [this.player, ...this.killers].forEach(filler => {
            this.friendlyGrid[filler.y][filler.x].symb = filler.symb;
            this.friendlyGrid[filler.y][filler.x].backgroundColor = collision ? 'red' : filler.backgroundColor;
        });
        
    }
}

export const game  = new Game();
export const player = new Player(WIDTH-Math.floor(WIDTH/2), HEIGHT-1);
export const grid = new Grid(player);
