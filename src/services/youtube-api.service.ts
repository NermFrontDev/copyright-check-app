import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {

  private apiKey = environment.youtubeApiKey;
  private apiUrl = 'https://www.googleapis.com/youtube/v3/videos';
  private channelURL = 'https://www.googleapis.com/youtube/v3/channels'

  constructor(private http: HttpClient) { }

  getVideoDetails(videoId: string): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet,contentDetails,statistics')
      .set('id', videoId)
      .set('key', this.apiKey);

    return this.http.get<any>(this.apiUrl, { params });
  }

  getChannelDetails(channelId: string): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('id', channelId)
      .set('key', this.apiKey);

    return this.http.get<any>(this.channelURL, { params });
  }

}
