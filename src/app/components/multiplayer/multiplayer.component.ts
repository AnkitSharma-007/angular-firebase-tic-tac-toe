import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from 'src/app/services/multiplayer.service';
import { Game, GameDTO } from 'src/app/models/game';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss']
})
export class MultiplayerComponent implements OnInit {

  playerRole: string;
  winner: string;
  win = false;
  gameFinished = false;
  gameId: string;
  gameBoard = [0, 1, 2];
  game = new Game();
  gamedto = new GameDTO();

  constructor(
    private multiPlayerService: MultiplayerService,
    private gameService: GameService,
    private route: ActivatedRoute) {
    if (this.route.snapshot.params['gameid']) {
      this.gameId = this.route.snapshot.paramMap.get('gameid');
    }
  }

  ngOnInit() {
    this.game = this.multiPlayerService.setArray();

    this.multiPlayerService.fetchGameStatus(this.gameId)
      .subscribe((result: GameDTO) => {
        this.gamedto = result;
        this.setBoard();
      });

    if (this.gameId == localStorage.getItem('gameId')) {
      this.playerRole = 'X';
    } else {
      this.playerRole = 'O';
    }
  }

  setBoard() {
    this.game.cellValue[0] = this.gamedto.row0;
    this.game.cellValue[1] = this.gamedto.row1;
    this.game.cellValue[2] = this.gamedto.row2;
    this.game.currentPlayer = this.gamedto.currentPlayer;

    this.win = this.gameService.GameWon(this.game);
    this.setCurrentPlayer();

    if (this.win) {
      this.winner = this.game.currentPlayer;
      this.gameFinished = false;
    }
  }

  SetCellValue(row: number, col: number) {
    if (!this.win) {
      if (this.game.currentPlayer != this.playerRole) {
        alert('The player ' + this.game.currentPlayer + ' has not yet played.\nPlease wait for your turn.');
      } else if (this.game.cellValue[row][col] == '') {
        this.game.cellValue[row][col] = this.game.currentPlayer;
        this.multiPlayerService.SaveGameStatus(this.gameId, this.game);
      }
    }
  }

  ResetGame() {
    var allowReset;
    if (!(this.win || this.gameFinished)) {
      allowReset = confirm('Game is in progress. Do you want to reset it ??');
    }
    if (this.win || allowReset || this.gameFinished) {
      this.win = false;
      this.gameFinished = false;
      this.game = this.multiPlayerService.setArray();
      this.multiPlayerService.SaveGameStatus(this.gameId, this.game);
    }
  }

  setCurrentPlayer() {
    var sum = 0;
    for (var i = 0; i < 3; i++) {
      sum += this.game.cellValue[i].filter(String).length;
    }
    if (!this.win) {
      if (sum % 2 == 0) {
        this.game.currentPlayer = 'X';
      } else {
        this.game.currentPlayer = 'O';
      }
      if (sum == 9) {
        this.gameFinished = true;
      } else {
        this.gameFinished = false;
      }
    }
  }
}
