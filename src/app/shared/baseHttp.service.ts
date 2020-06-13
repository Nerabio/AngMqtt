import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../app-config.model';
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ToastrServiceEx } from './toastr.Service';
import 'rxjs/add/operator/catch';
import {BlobFile} from '../../shared/blob-file.model';

// Базовый Сервис - обертка для HttpClient
@Injectable({ providedIn: 'root' })
export class BaseHttpService {
  protected options = { headers: {'Content-Type': 'application/json'}, withCredentials: true };
  protected baseUrl = this.appConfig.webapiUrl; // Базовый путь для всех сервисов

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private toastr: ToastrServiceEx) {
  }

  // Базовый метод для получения данных с сервера GET-ом
  get<T>(url: string): Observable<T> {
    url = this.baseUrl + url;
    return this.http.get<T>(url, this.options);
  }

  // Базовый метод для 
  upload<E>(url: string, file: any): Observable<E> {
    url = this.baseUrl + url;
    let input = new FormData();
    input.append("file", file);
    return this.http.post<E>(url, input, {withCredentials: true})
  }

  download(url: string): Observable<BlobFile> {
    url = this.baseUrl + url;
    return Observable.create(observer => {
      let xhr = new XMLHttpRequest();

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.responseType = 'blob';
      xhr.withCredentials = true;

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {

            var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            var blob = new Blob([xhr.response], {type: contentType});
            //var filename = xhr.getResponseHeader('ReportFilename');
            //console.log(filename);
            var blobfile = new BlobFile();
            blobfile.blob = blob;
            //blobfile.filename = filename;
            observer.next(blobfile);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.send();
    });
  }

  // Базовый метод для отправки и получения данных с сервера POST-ом
  post<T, E>(url: string, data: T, onResponce?: (responce: E) => void, onError?: () => void): Observable<E> {
    url = this.baseUrl + url;
    return this.http.post<E>(url, JSON.stringify(data), this.options)
      .catch((ex: any) => {
        if (onError != null) {
          onError(); }
        this.toastr.showHttpError(ex, 'Ошибка');
        return observableOf({} as E);
      })
      .pipe(map(r => {
        if (onResponce != null) {
          onResponce(r); }
        return r;
      }));
  }
}
