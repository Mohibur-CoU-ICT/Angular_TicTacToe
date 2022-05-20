import { Status } from "./game-status";

export class Gamelogic {

    gamefield: Array<number> = [];

    currentTurn: number;

    gameStatus: Status;

    winSituationsOne: Array<Array<number>> = [
        [1,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,1,0,0],
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,0,1],
        [0,0,1,0,1,0,1,0,0]
    ];
    
    winSituationsTwo: Array<Array<number>> = [
        [2,2,2,0,0,0,0,0,0],
        [0,0,0,2,2,2,0,0,0],
        [0,0,0,0,0,0,2,2,2],
        [2,0,0,2,0,0,2,0,0],
        [0,2,0,0,2,0,0,2,0],
        [0,0,2,0,0,2,0,0,2],
        [2,0,0,0,2,0,0,0,2],
        [0,0,2,0,2,0,2,0,0]
    ];

    public constructor() {
        this.gameStatus = Status.STOP;
        this.currentTurn = 1;
        this.gamefield = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    startGameUtil(): void {
        // debugger
        // console.log('startGameUtil() called.');
        this.gameStatus = Status.START;
        this.currentTurn = this.randomPlayerStart();
        this.gamefield = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    randomPlayerStart(): number {
        // debugger
        // console.log('randomPlayerStart() called.');
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;
    }

    getField(position: number): number {
        // debugger
        // console.log('getField() called.');
        return this.gamefield[position]
    }

    setField(position: number, value: number): void {
        // debugger
        // console.log('setField() called.');
        this.gamefield[position] = value;
        // console.log('gamefield = ' + this.gamefield);
    }

    getPlayerColorClass(): string {
        // debugger
        // console.log('getPlayerColorClass() called.');
        const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';
        return colorClass;
    }

    changePlayer() {
        // debugger
        // console.log('changePlayer() called.');
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
        // console.log('Current turn = ' + this.currentTurn);
    }

    arrayEquals(a: Array<number>, b:Array<number>): boolean {
        // debugger
        // console.log('arrayEquals() called.');
        return  Array.isArray(a) &&
                Array.isArray(b) && 
                a.length === b.length &&
                a.every((value, index) => value === b[index]);
    }

    async checkGameEndWinner(): Promise<boolean> {
        // debugger
        // console.log('checkGameEndWinner() called.');
        let isWinner = false;

        const checkArray = (this.currentTurn === 1) ? this.winSituationsOne : this.winSituationsTwo;

        const currentArray: number[] = [];

        this.gamefield.forEach((subfield, index) => {
            if (subfield !== this.currentTurn) {
                currentArray[index] = 0;
            }
            else {
                currentArray[index] = subfield;
            }
        });

        // console.log(currentArray);

        checkArray.forEach((checkField, checkIndex) => {
            if (this.arrayEquals(checkField, currentArray)) {
                isWinner = true;
            }
            console.log('isWinner = ' + isWinner);
        });

        if (isWinner) {
            console.log('field is full');
            this.gameEnd();
            return true;
        }
        else {
            return false;
        }
    }

    async checkGameEndFull(): Promise<boolean> {
        // debugger
        // console.log('checkGameEndFull() called.')
        let isFull = true;
        if (this.gamefield.includes(0)) {
            isFull = false;
        }
        if (isFull) {
            // console.log('field is full');
            this.gameEnd();
            return true;
        }
        else {
            return false;
        }
    }

    gameEnd(): void {
        // debugger
        // console.log('gameEnd() called.');
        this.gameStatus = Status.STOP;
    }

}
