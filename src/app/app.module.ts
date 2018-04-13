import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';

//Form creation
import { FormsModule }   from '@angular/forms';

//Routing
import {RouterModule, Routes} from '@angular/router';

//Pages and Components
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TextbookCreationPageComponent } from './textbook-creation-page/textbook-creation-page.component';
import { OfferCreationPageComponent } from './offer-creation-page/offer-creation-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';


//The Angular Routes
const appRoutes: Routes = [
  {path: '', component: ProfilePageComponent},
  {path: 'create-textbook', component: TextbookCreationPageComponent},
  {path: 'create-offer', component: OfferCreationPageComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    TextbookCreationPageComponent,
    OfferCreationPageComponent,
    NavbarComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
