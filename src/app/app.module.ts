import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";
import { AppComponent } from "./app.component";
import { MultiplayerComponent } from "./components/multiplayer/multiplayer.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { HomeComponent } from "./components/home/home.component";
import { NgMaterialModule } from "./ng-material/ng-material.module";
import { InviteFriendsComponent } from "./components/invite-friends/invite-friends.component";
import { ShareButtonsModule } from "ngx-sharebuttons/buttons";
import { ShareButtonsConfig } from "ngx-sharebuttons";
import { ShareIconsModule } from "ngx-sharebuttons/icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

const customConfig: ShareButtonsConfig = {
  include: ["whatsapp", "telegram", "messenger", "line", "sms", "email"],
  theme: "circles-dark",
  autoSetMeta: false,
};

@NgModule({
  declarations: [
    AppComponent,
    MultiplayerComponent,
    NavBarComponent,
    HomeComponent,
    InviteFriendsComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FontAwesomeModule,
    ShareIconsModule,
    BrowserModule,
    HttpClientModule,
    ShareButtonsModule.withConfig(customConfig),
    BrowserAnimationsModule,
    NgMaterialModule,
    RouterModule.forRoot(
      [
        { path: "", component: HomeComponent, pathMatch: "full" },
        { path: "game/:gameid", component: MultiplayerComponent },
        { path: "**", component: HomeComponent },
      ],
      { relativeLinkResolution: "legacy" }
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
