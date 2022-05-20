import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor(public game: Gamelogic) { }

  ngOnInit(): void {
  }

  startGame(): void {
    // debugger
    // console.log('startGame() called.');
    this.game.startGameUtil();
    const currentPlayer = 'Current turn: Player ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    // console.log('information = ' + information);
    if (information != null) {
      information.innerHTML = currentPlayer;
    }
  }

  async clickSubfield(subfield: any): Promise<void> {
    // debugger
    // console.log('clickSubfield() called.');
    const position = subfield.currentTarget.getAttribute('position');
    // console.log('Position = ' + position);

    if (this.game.gameStatus === 1 && this.game.getField(position) === 0) {
      const information = document.querySelector('.current-status');
      
      this.game.setField(position, this.game.currentTurn);
      
      var color: string = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);
      // var divs = document.getElementsByClassName(color);
      // divs[position].innerHTML = this.game.currentTurn === 1 ? 'X' : 'O';
      // divs[position].style.backgroundColor = '#4d4d4d';

      await this.game.checkGameEndWinner().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          if (information !== null)
            information.innerHTML = 'The winner is ' + this.game.currentTurn;
        }
      });
      
      await this.game.checkGameEndFull().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          if (information !== null)
            information.innerHTML = 'No winner, draw';
        }
      });

      this.game.changePlayer();
  
      if (this.game.gameStatus === 1) {
        const currentPlayer = 'Current turn: Player ' + this.game.currentTurn;
        const information = document.querySelector('.current-status');
        // console.log('information = ' + information);
        if (information != null) {
          information.innerHTML = currentPlayer;
        }
      }
    }
  }

}
