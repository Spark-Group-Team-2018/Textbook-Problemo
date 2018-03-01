import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

import {RouterModule, Routes} from '@angular/router';
import { TextbookCreationPageComponent } from './textbook-creation-page/textbook-creation-page.component';

const appRoutes: Routes = [
  {path: '', component: ProfilePageComponent},
  {path: 'create-textbook', component: TextbookCreationPageComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    TextbookCreationPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
