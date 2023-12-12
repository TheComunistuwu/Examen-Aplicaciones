import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  usuario = ""
  nombre = ""
  correo = ""
  clave = ""
  conexion: any

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
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
        })
        .catch(e => console.log(e));
    })
  }

  registrar() {
    this.conexion.executeSql(
      'insert into usuario values(?,?,?,?)', [this.usuario, this.clave, this.nombre, this.correo])
      .then(() => this.alerta('usuario agregado!'))
      .catch((e: any) => console.log(e));

    /*this.conexion.executeSql(
      'select usuario,correo from usuario where usuario = ? and clave = ?', [this.usuario, this.clave])
      .then((resultados: any) => {
        if (resultados.rows.length > 0) {
          let usuario = resultados.rows.item(0).usuario;
          let correo = resultados.rows.item(1).correo;
          localStorage.setItem("usuario", usuario)
          localStorage.setItem("correo", correo)

          console.log("usuario en registro: ", usuario)
          console.log("correo en registro: ", correo)
        }
      })
      .catch((e: any) => console.log(e));*/
  }

  async alerta(texto: string) {
    const alert = await this.alert.create({
      header: 'Aviso',
      subHeader: 'Important message',
      message: texto,
      buttons: ['OK'],
    });
    await alert.present();
  }

  paginaLogin() {
    this.router.navigate(['/login'])
  }

}
