import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from './services/multiplayer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private multiPlayerService: MultiplayerService) { }

  ngOnInit() {
    const gameId = localStorage.getItem('gameId');

    if (!gameId) {
      this.multiPlayerService.initializeGame();
    } else {
      this.multiPlayerService.setGameData();
    }
  }
}
