import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = ""
  clave = ""
  conexion: any

  constructor(private sss: AnimationController,
    private aaa: ToastController,
    private sqlite: SQLite,
    private platform: Platform,
    private nav: NavController,
    private router: Router,
    private alert: AlertController) { }


  ngOnInit() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.conexion = db
          db.executeSql('create table usuario(usuario VARCHAR(20) PRIMARY KEY, clave VARCHAR(12), nombre VARCHAR(50), correo VARCHAR(50))', [])
          // db.executeSql('DROP TABLE usuario;')
          db.executeSql('insert into usuario values("Juanito", "1234", "Juan", "juan@duocuc.cl")')
          
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    })
  }

  login() {
    this.conexion.executeSql(
      'select usuario,correo from usuario where usuario = ? and clave = ?', [this.usuario, this.clave])
      .then((resultados: any) => {
        if (resultados.rows.length > 0) {
          let usuario = resultados.rows.item(0).usuario;
          //let correo = resultados.rows.item(1).correo;
          this.alerta("Bienvenido " + usuario,
            () => {
              localStorage.setItem("usuario", usuario)
              //localStorage.setItem("correo", correo)

              console.log("usuario: " , usuario)
              //console.log("correo: " , correo)
              this.nav.navigateForward(['/home'])
            })
        } else {
          this.alerta("Datos incorrectos!.", () => { })
        }
      })
      .catch((e: any) => console.log(e));
  }

  async alerta(texto: string, action: () => void) {
    const alert = await this.alert.create({
      header: 'Aviso',
      subHeader: 'Important message',
      message: texto,
      buttons: [{
        text: "OK", handler: action
      }],
    });
    await alert.present();
  }

  paginaRegistro(){
    this.router.navigate(['/registrarse'])
  }
  paginaHome(){
    this.router.navigate(['/home'])
  }
  paginaRecuperar(){
    this.router.navigate(['/recuperar'])
  }

}