import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';

//Form creation
import { FormsModule }   from '@angular/forms';

//Routing
import {RouterModule, Routes} from '@angular/router';

//Auth
import {AngularFireModule} from 'angularfire2';

//Pages and Components
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TextbookCreationPageComponent } from './textbook-creation-page/textbook-creation-page.component';
import { OfferCreationPageComponent } from './offer-creation-page/offer-creation-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookCreationPageComponent } from './book-creation-page/book-creation-page.component';
import { BrowseBooksPageComponent } from './browse-books-page/browse-books-page.component';
import { BrowseOffersPageComponent } from './browse-offers-page/browse-offers-page.component';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { ViewBookPageComponent } from './view-book-page/view-book-page.component';
import { TextbookViewPageComponent } from './textbook-view-page/textbook-view-page.component';
import { OfferViewPageComponent } from './offer-view-page/offer-view-page.component';
import { PendingOfferViewPageComponent } from './pending-offer-view-page/pending-offer-view-page.component';
import { UserConfigPageComponent } from './user-config-page/user-config-page.component';

//The Angular Routes
const appRoutes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'user-config', component: UserConfigPageComponent},
  {path: 'login', component: UserLoginPageComponent},
  {path: 'view-book/:id', component: ViewBookPageComponent},
  {path: 'create-textbook', component: TextbookCreationPageComponent},
  {path: 'create-offer', component: OfferCreationPageComponent},
  {path: 'add-book', component: BookCreationPageComponent},
  {path: 'browse-books', component: BrowseBooksPageComponent},
  {path: 'browse-offers', component: BrowseOffersPageComponent},
  {path: 'view-textbook', component: TextbookViewPageComponent},
  {path: 'view-offer', component: OfferViewPageComponent},
  {path: 'view-pendingoffer', component: PendingOfferViewPageComponent}
]

export const firebaseConfig = {
    apiKey: "AIzaSyDNpj9LBLJuK6o39LwbGiIMDTbfZ5SjKyE",
    authDomain: "texbookio.firebaseapp.com",
    databaseURL: "https://texbookio.firebaseio.com",
    projectId: "texbookio",
    storageBucket: "texbookio.appspot.com",
    messagingSenderId: "844847264422"
  };


@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    TextbookCreationPageComponent,
    OfferCreationPageComponent,
    NavbarComponent,
    HomepageComponent,
    BookCreationPageComponent,
    BrowseBooksPageComponent,
    BrowseOffersPageComponent,
    UserLoginPageComponent,
    ViewBookPageComponent,
    TextbookViewPageComponent,
    OfferViewPageComponent,
    PendingOfferViewPageComponent,
    UserConfigPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
