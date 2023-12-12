import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  asistencias:any[] = []
  alertController: any;
  usuario = "Fernando"
  

  constructor(private storage: Storage, private alert: AlertController) {}

  async ngOnInit() {
    await this.storage.create();
    //this.asistencias = await this.storage['get']('asistencias') || []
  }

  
  async ionViewDidEnter(){
    this.asistencias = await this.storage.get("asistencias") || []
  }

    async leerQR() {     
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    document.querySelector('body')!.classList.add('scanner-active');
    const result = await BarcodeScanner.startScan(); 
    if (result.hasContent) {
      let resultado = result.content 
      if(resultado.split("--").length != 4){ 
        document.querySelector('body')!.classList.remove('scanner-active');
        this.alerta("Codigo QR no valido.")
        return
      }

      this.asistencias.push({
        fecha: resultado.split("--")[0],
        ramo: resultado.split("--")[1],
        numero: resultado.split("--")[2],
        bloques: resultado .split("--")[3],
        alumno: this.usuario
      })
      await this.storage.set("asistencias", this.asistencias);
    }
  }




detenerQR() {
    document.querySelector('body')!.classList.remove('scanner-active');
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }

      async alerta(texto:string) {
        const alert = await this.alert.create({
          header: 'Alert',
          subHeader: 'Important message',
          message: texto,
          buttons: ['OK'],
        });
    
        await alert.present();
      }
    }


  
  



