import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColorInfo, ColorTheme } from './model/colorInfo';

const END_POINT = "http://getcolor.net:3031/api/";

@Injectable({ providedIn: 'root' })
export class ContentsService {
  public colorThemes:ColorTheme[] = [];
  constructor(private http: HttpClient) {}

  getColorThemeList(param: any): Observable<any> {
    return this.http.get<any>(END_POINT + 'color-theme/pallete', { params: param });
  }

  likePallete(param: any): Observable<any> {
    return this.http.post<any>(END_POINT + 'color-theme/like', { params: param });
  }

  getTagList(param: any): Observable<any> {
    return this.http.get<any>(END_POINT + 'color-theme/taglist', { params: param });
  }

  getColorTheme(pallete_id: string|null): ColorTheme {
    for(var i=0; i<this.colorThemes.length; i++) {
      if( this.colorThemes[i].pallete_id==pallete_id) {
        return this.colorThemes[i];
      }
    }
    return null!;
  }
}
