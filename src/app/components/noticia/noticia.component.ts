import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalServicesService } from 'src/app/services/data-local-services.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor( private iab: InAppBrowser,
                private actionSheetCtrl: ActionSheetController,
                private socialSharing: SocialSharing,
                private dataLocalService: DataLocalServicesService) { }

  ngOnInit() {}

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if ( this.enFavoritos ) {
      //borrar de favoritos

      guardarBorrarBtn = {
        text: 'delete from favorites',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.borrarNoticia( this.noticia );
          this.dataLocalService.presentToast('the news has been removed from favorites');
        }
      };

    } else {
      guardarBorrarBtn = {
        text: 'Favorites',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('favorite clicked');
          this.dataLocalService.guardarNoticia( this.noticia );
          this.dataLocalService.presentToast('the news has been added to favorites');
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(this.noticia.title, this.noticia.source.name, '' , this.noticia.url);
          console.log(this.noticia.title);
        }
      }, guardarBorrarBtn, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}

