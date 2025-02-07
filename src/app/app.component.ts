import { Component, OnInit } from '@angular/core';
import { YoutubeApiService } from 'src/services/youtube-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'copyright-church-app';

  currentYear = new Date().getFullYear();

  videoId: string = '';
  videoDetails: any = null;
  channelDetails: any = null;
  error: string = '';

  constructor(private youtubeService: YoutubeApiService) {}

  onCheckVideo() {
    const videoId = this.extractVideoId(this.videoId);
    if (videoId) {
      this.youtubeService.getVideoDetails(videoId).subscribe(
        (data) => {
          this.videoDetails = data.items[0];
          this.error = '';

          const channelId = this.videoDetails.snippet.channelId;
          this.youtubeService.getChannelDetails(channelId).subscribe(
            (channelData) => {
              this.channelDetails = channelData.items[0];
            },
            (err) => {
              this.error = 'Error al obtener los detalles del canal';
            }
          );
        },
        (err) => {
          this.error = 'Video no encontrado o URL/ID incorrecto';
          this.videoDetails = null;
        }
      );
    } else {
      this.error = 'URL/ID del video no válido';
    }
  }

  extractVideoId(url: string): string | null {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
  }

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const options = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
    return date.toLocaleDateString('es-US', options);
  }

}
