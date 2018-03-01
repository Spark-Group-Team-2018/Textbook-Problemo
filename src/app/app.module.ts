import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: '', component: ProfilePageComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent
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
