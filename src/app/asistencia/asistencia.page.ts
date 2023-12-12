import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';
import { FilterByRamoPipe } from './filter-by-ramo.pipe';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
  providers: [FilterByRamoPipe],
})

export class AsistenciaPage implements OnInit {
  asistencias:any[] = []
  filtroRamo: string = ""
  constructor(private storage: Storage, private router: Router) { }


  async ngOnInit(){
    await this.storage.create();
  }

  async ionViewDidEnter(){
    this.asistencias = await this.storage.get("asistencias") || []
  }

  paginaHistorial(){
    this.router.navigate(['/historial'])
  }

}
