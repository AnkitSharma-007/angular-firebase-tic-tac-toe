import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { MultiplayerService } from "src/app/services/multiplayer.service";

@Component({
  selector: "app-invite-friends",
  templateUrl: "./invite-friends.component.html",
  styleUrls: ["./invite-friends.component.scss"],
})
export class InviteFriendsComponent implements OnInit {
  shareURL: string;
  inviteMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private multiPlayerService: MultiplayerService
  ) {}

  async ngOnInit() {
    this.inviteMessage = "Join me for a game of Tic-Tac-Toe";
    this.multiPlayerService.gameId$.pipe().subscribe((gameid) => {
      if (gameid) {
        this.setShareURL(gameid);
      }
    });
  }

  setShareURL(gameid: string) {
    this.route.snapshot.url[1].path = gameid;
    this.shareURL = location.origin + this.router.url;
  }
}
