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
import { BookCreationPageComponent } from './book-creation-page/book-creation-page.component';
import { BrowseBooksPageComponent } from './browse-books-page/browse-books-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowseOffersPageComponent } from './browse-offers-page/browse-offers-page.component';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';

//The Angular Routes
const appRoutes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'create-textbook', component: TextbookCreationPageComponent},
  {path: 'create-offer', component: OfferCreationPageComponent},
  {path: 'add-book', component: BookCreationPageComponent},
  {path: 'browse-books', component: BrowseBooksPageComponent},
  {path: 'browse-offers', component: BrowseOffersPageComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    TextbookCreationPageComponent,
    OfferCreationPageComponent,
    NavbarComponent,
    BookCreationPageComponent,
    BrowseBooksPageComponent,
    HomePageComponent,
    BrowseOffersPageComponent,
    UserLoginPageComponent
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
