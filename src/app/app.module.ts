import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular'; 
import {SQLite} from "@awesome-cordova-plugins/sqlite/ngx"
import { FormsModule } from '@angular/forms';
import { FilterByRamoPipe } from './asistencia/filter-by-ramo.pipe';


@NgModule({
  declarations: [AppComponent, FilterByRamoPipe],
  imports: [IonicStorageModule.forRoot(), BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [SQLite,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
