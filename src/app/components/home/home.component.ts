import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameDTO } from 'src/app/models/game';
import { MultiplayerService } from 'src/app/services/multiplayer.service';
import { ViewEncapsulation } from '@angular/core';
import { faHandPointUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  faHandPointUp = faHandPointUp;
  gamedto = new GameDTO;

  constructor(private multiPlayerService: MultiplayerService) { }

  ngOnInit() {
    this.multiPlayerService.gameId$.subscribe(id => {
      this.gamedto.id = id;
    })
  }

}
