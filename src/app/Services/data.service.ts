import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { User } from '../Types/user';

@Injectable()
export class DataService {

  private baseUrl: string = "https://jsonplaceholder.typicode.com";

  constructor(private http: Http) { }

  public getUsers(): Observable<User[]>{
    return this.http.get(this.baseUrl + "/users").map((res)=> res.json());
  }

  //todo specify type
  getAlbums(userId: number, skip: number, take: number): Observable<any[]> {
    return this.http.get(this.baseUrl + '/albums?userid='+userId+"_start=" + skip + "&_limit=" + take)
      .map((res: any) => res.json())
      .flatMap((albums: any[]) => {
        if (albums.length > 0) {
          return Observable.forkJoin(
            albums.map((album: any) => {
              return this.http.get(this.baseUrl + '/photos?_start=0&_limit=1&albumId=' + album.id)
                .map((res: any) => {
                  let photo: any = res.json();
                  if(photo[0])
                    album.thumbnail = photo[0].thumbnailUrl;
                  return album;
                });
            })
          )
        }
        return Observable.of([]);
      });
  }

  public getPhotos(albumId: number, skip: number, take: number): Observable<any[]>{
    return this.http.get(this.baseUrl + "/photos?albumId=" + albumId+"&_start=" + skip + "&_limit=" + take).map((res)=> res.json());
  }
}
