import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({

  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],

})

export class PerfilPage {

  datos: any[] = [];
  usuario = String(localStorage.getItem("usuario"))
  correo = String(localStorage.getItem("correo"))
  estudiante = String(localStorage.getItem("estudiante"))

  constructor(private storage: Storage, private router: Router) { }


  async ngOnInit() {
    const nuevoElemento = {
      usuario: this.usuario,
      correo: this.correo,
      estudiante: this.estudiante
    };

    this.datos.push(nuevoElemento);
  }


  paginaHome() {
    this.router.navigate(['/home'])
  }
  paginaLogin() {
    this.router.navigate(['/login'])
  }


}
