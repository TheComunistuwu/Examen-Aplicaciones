import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular'; 
import { IonicStorageModule } from '@ionic/storage-angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  aaa =localStorage.getItem("nombre")
  conexion: any

  constructor(private router: Router, private alert: AlertController, private sqlite: SQLite, private platform: Platform ) { }
  ngOnInit() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.conexion = db
        })
        .catch(e => console.log(e));
    })
    
  }
  paginaUsuario(){
    this.router.navigate(['/perfil'])
  }
  paginaQr(){
    this.router.navigate(['/qr'])
  }
  paginaAsistencia(){
    this.router.navigate(['/asistencia'])
  }

  compartirApp() {
    Share.share({
      title: 'Compartir myApp',
      url: 'https://drive.google.com/drive/folders/1zYprqP4eKaz98VcV_oENPDdEQfTZJqu1?usp=drive_link',
      dialogTitle: 'Es perfecta !',
    });
  }

}


