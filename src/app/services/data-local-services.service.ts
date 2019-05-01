import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalServicesService {

  noticias: Article [] = [];

  constructor(private storage: Storage, public toastController: ToastController) { 
    this.cargarFavoritos();
  }

  async presentToast( descripcion: string) {
    const toast = await this.toastController.create({
      message: descripcion,
      duration: 2000,
      color: 'dark',
    });
    toast.present();
  }

  guardarNoticia( noticia: Article ) {

    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias );
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
    if (favoritos != null) {
      this.noticias = favoritos;
    }
  }

  async borrarNoticia( noticia: Article ) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias );
  }
}
