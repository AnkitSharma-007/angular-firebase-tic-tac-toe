import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game, GameDTO } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class MultiplayerService {

  gameId$ = new BehaviorSubject<string>(null);

  constructor(private db: AngularFirestore) { }

  initializeGame() {
    var initialGame = this.setArray();
    var initialGameDTO = new GameDTO()
    initialGameDTO.row0 = initialGame.cellValue[0];
    initialGameDTO.row1 = initialGame.cellValue[1];
    initialGameDTO.row2 = initialGame.cellValue[2];
    initialGameDTO.currentPlayer = 'X';

    const gameData = JSON.parse(JSON.stringify(initialGameDTO));
    this.db.collection('GameStatus').add(gameData).then(
      (docref) => {
        localStorage.setItem('gameId', docref.id);
        this.setGameData();
      }
    );
  }

  setGameData() {
    if (localStorage.getItem('gameId')) {
      const gameId = localStorage.getItem('gameId');
      this.gameId$.next(gameId);
    }
  }

  SaveGameStatus(gameId: string, game: Game) {
    var gameStatus = new GameDTO();
    gameStatus.row0 = game.cellValue[0];
    gameStatus.row1 = game.cellValue[1];
    gameStatus.row2 = game.cellValue[2];
    gameStatus.currentPlayer = game.currentPlayer;

    const gameData = JSON.parse(JSON.stringify(gameStatus));
    return this.db.doc('GameStatus/' + gameId).update(gameData);
  }

  fetchGameStatus(gameId: string): Observable<GameDTO> {
    return this.db.doc<GameDTO>('GameStatus/' + gameId).valueChanges();
  }

  setArray(): Game {
    var game = new Game();
    for (var i = 0; i < 3; i++) {
      game.cellValue[i] = [];
      for (var j = 0; j < 3; j++) {
        game.cellValue[i][j] = '';
      }
    }
    game.currentPlayer = 'X';
    return game;
  }

  deleteGame(gameId: string) {
    debugger;
    console.log(gameId);
    return this.db.doc('GameStatus/' + gameId).delete();
  }
}
