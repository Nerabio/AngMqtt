import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

// Базовый Сервис - обертка для HttpClient
@Injectable({ providedIn: 'root' })
export class ToastrServiceEx {
  protected errConfig = { disableTimeOut: true, enableHtml: true };
  protected infoConfig = { disableTimeOut: false, timeOut: 3000 };

  constructor(private toastr: ToastrService) {
  }

  // Выводит сообщение обошибке
  showError(msg: string, title: string) {
    this.toastr.error(msg, title, this.errConfig);
  }

  // Выводит информационное сообщение
  showInfo(info: string, title: string) {
    this.toastr.info(info, title, this.infoConfig);
  }

  private replaceAll(s: string, from: string, to: string): string {
    const ret = s.replace(from, to);
    return s !== ret ? this.replaceAll(ret, from, to) : ret;
  }

  private clearMsg(msg: string): string {
    if (typeof msg !== 'string') {
      return '';
    }
    console.log(msg);
    msg = msg.replace('Validation failed', 'Ошибка валидации');
    msg = this.replaceAll(msg, '--', '-');
    msg = this.replaceAll(msg, '  ', ' ');
    msg = this.replaceAll(msg, '"', '');
    msg = this.replaceAll(msg, '\\r', '');
    msg = this.replaceAll(msg, '\\n', '\n');
    msg = this.replaceAll(msg, '\n', '<br/>');
    return msg;
  }

  private errToString(err: any): string {
    return typeof err === 'string'
      ? err as string
      : 'Неудалось распарсить ошибку!\n' + JSON.stringify(err);
  }

  private jsonParse(str: string): any {
    try {
    return JSON.parse(str);
    } catch {
      return null;
    }
  }

  private getExceptionMessage(obj: any): any {
    if (obj) {
      if (typeof obj === 'object' && obj.exceptionMessage) {
        return obj.exceptionMessage;
      }
      if (typeof obj === 'string') {
        const _obj = this.jsonParse(obj);
        if (_obj && _obj.exceptionMessage) {
          return _obj.exceptionMessage;
        }
      }
    }
    return obj;
  }

  private parseHttpError(ex: any): any {
    if (ex._body) {
      return this.getExceptionMessage(ex._body);
    }
    if (ex.error) {
      return this.getExceptionMessage(ex.error);
    }
    if (ex.message) {
      return ex.message;
    }
    return ex;
   }

  showHttpError(ex: any, title: string) {
    console.log(ex); // временно для отладки
    let message = this.errToString(this.parseHttpError(ex));
    message = this.clearMsg(message);
    this.showError(message, title);
    console.log(message);
  }
}
