import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsConfig } from '@ngx-share/core';
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { MultiplayerComponent } from './components/multiplayer/multiplayer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { InviteFriendsComponent } from './components/invite-friends/invite-friends.component';

const customConfig: ShareButtonsConfig = {
  include: ['whatsapp', 'telegram', 'messenger', 'line', 'sms', 'email'],
  theme: 'circles-dark',
  autoSetMeta: false
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
    BrowserModule,
    HttpClientModule,
    ShareButtonsModule.withConfig(customConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot([
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'game/:gameid', component: MultiplayerComponent },
    { path: '**', component: HomeComponent }
], { relativeLinkResolution: 'legacy' })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
