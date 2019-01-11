import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as _ from "lodash";
class FileSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'ngx-upload-kit',
  templateUrl: "./ngx-upload-kit.component.html",
  styleUrls: ["./ngx-upload-kit.component.scss"],
  encapsulation: ViewEncapsulation.Emulated
})
export class NgxUploadKitComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document
  ) { }

  ngOnInit() {
  }

  /////////////////// Config ///////////////////

	///////////////// End Config /////////////////

  ///////////////// Variable /////////////////
  @ViewChild("fileInput") fileInput: ElementRef;
  @Output("onUpload") onUploadEmit: EventEmitter<any> = new EventEmitter<any>();
  @Input("multiple")  multiple: boolean = false;
  @Input("accept")  accept: string = "*";

  public selectedFile: FileSnippet[] = [];

  /////////////// End Variable ////////////////


  public onFileChange(fileInput) {
    let fileList: FileList = fileInput.files

    for(let i = 0; i < fileList.length; i++){
      let file: File = fileList.item(i)
      const fileReader: FileReader = new FileReader();

      let isExistExtension = this.isExistExtension(file.type);

      if(isExistExtension){
        fileReader.readAsDataURL(file);
        fileReader.addEventListener('load', (event: any) => {

          if(this.multiple){
            this.selectedFile.push(new FileSnippet(event.target.result, file)) ;
          } else {
            this.selectedFile[0] = new FileSnippet(event.target.result, file)
          }
        });
      }
    }

  }

  private isExistExtension(fileTypeSelected: string) : boolean {

    let fileTypeList: string[] = _.split(fileTypeSelected, '/');
    let fileType = "." + fileTypeList[1];

    let extensionList: string[] = _.split(this.accept, ',');

    extensionList = _.map(extensionList, _.trim);

    if(extensionList.length > 0 && extensionList[0] === "*"){
      return true;
    } else if (extensionList.length > 0 && extensionList[0] !== "*") {
      let index = _.findIndex(extensionList, (etn) => { return etn === fileType; });
      return index >= 0? true : false;
    } else {
      return false;
    }

  }

  public startUpload(): void {

    if(this.multiple){
      let file: File[] = [];
      this.selectedFile.forEach((value) => {
        file.push(value.file)
      });

      this.onUploadEmit.emit(file);

    } else {
      this.onUploadEmit.emit(this.selectedFile[0].file);
    }
  }

  public onSelectFile(){
    let el: HTMLElement = this.fileInput.nativeElement as HTMLElement;
    el.click();
  }

  public getImage(fs : FileSnippet) {
    let fileTypeList: string[] = _.split(fs.file.type, '/');
    let fileType = fileTypeList[1];

    if(fileTypeList[0] === "image") {
      return fs.src;
    } else if (fileType === "pdf") {
      return this.getOtherFile();
    } else if (fileType === "mp3") {;
      return this.getOtherFile();
    } else {
      return this.getOtherFile();
    }
  }

  private getPDF() {
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEK0lEQVRYR8WXe2xTVRzHv7/bu3bvDoZ0AgYIhaATNLjEFyExChHpFoia6IK6mCxCJGKRmfl+BOOjAzSEbYmYKPwhjvAIdrpE0JD9wxYGw4pgwuYA58Imi13L1u7ee37mlIBrd9vdVhbPP/eP8zu/3+f8nucS/udFyew/1zjaENWxJhM+IZBrGNi932vfMNH5pADPNoye/ugpdfH0wqQiSXVv/V5He5cBA8qOQxvtL6WCSAngq8wMYHuLjpIiBS0/GxwewWcHXrZ7k0FkBNAzwNj6nY51D6sonUUIXBKoP2LgzdUqZk4hSAC3S4GrkFB/VOfgVWw7tMm+2QwiI4DeQYZ08/pHVMx3EX7tZez6SUdthQoZMgmgKgSXkxCOAv6TOgjiwwPenNcTITICmCixApcYbV3ihtjQCHCi2+j+eoNjnmWAtQ2jZ+oq1TukG81Wdz/HbpjnAMIRYCDEmHuLuWzf34zavXrH7vX2MksAFdsibrAS2FmlZs+aaq607bzAF8cMTCsgXAkzqh+yoWyuYgqbFsAKH+fZafRYYTY5tz+julOVoWBgMMwozidQimpNC8DjG61m8OzifCrPtAwT3ZAWQLkvuodttGNqDj6XAJ/4dQyEJkq71PuGAEIjrAlGk3+zY+1Y6XGOW+WL+qBQd3Eu1kmA177R0T/E4ywsW6ggqgGdFwXunKnEQtB5QWCeizCjiBCKACd+/7cSpAJitHxb41iZEmCNLzRdI/vBLIVKK8rI+UOAMTQyHmDLEzYc7GAsmQPcWkRoPsW4133tPsfPMy4PMWS/iDNmBUAeeLKJbVn92rlH7yK3v5MxHB0PsLNKxekLAp0XgeWlhA8OG3hrtQ1XwtdMdvQwZKVkBCAPyWFkFoLbigky+6uWKjGjcr3/uA2BPwCFgOJ8oKlN4K/QeGhLIbhOnAxANh5mINdBN4zIUtUNYPAqY0oeyYSDHn/5mNqMAPYeNxAc/m9VENGAs70iqOn41F/jeDdlEiZ6IFUjkuX14xmB5YvMO+B1XWn1gXQAZHm+vV+H7+ksFGQn99KkAUgPvPilhsbns1LGaNIApNWNezR4V6qYMy35MJg0ADmST/YIyO8rj6mwJUmFSQP4qtVA+RIFrecEfuvj2GvoPreChTPivTEpAMFhxhv7dMwvISwoUeDMBU71CDy4QMHds+NdcdMB5HOr8aiBVz0qbk+4rVk23nQA+SKWA6jyAZulDpUxwIpFyuJ8k/q+HARcznjboQjDbiM4TCpSPkqP/CKsvwmlao9Pux8w7jG9IuEdMN4bu8cgDwh9xNxhesamtPs32dsT99L/75JwddEuKMYyvzfnTxDFxt4qX3QLEQ/0FTjqO14gzVJs5ICyKjhWrrwuWiuIPVCoutnrOCv3yuu0pYCoFYzW5hrHx1b1ZgRgVbkVuX8AVT0xP87pkxEAAAAASUVORK5CYII=`;
  }

  private getMP4() {
    return ``;
  }

  private getSVG() {
    return ``;
  }

  private getMP3() {
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEcklEQVRYR8WXfUyVVRzHv7/nPve5XF4FVHTagkW2siSTbC3X67SSl+kWW3NGuiJlOQsGG72tWrasi1g5wcHoD23DcAmLizGyTVa5YGIvYLQUsgAJUOByucC9z8uvPfemMu7D5XILO9vz1/mdcz7n+zvf3zkP4X9uNNP6zx7ylLkVbA6FT9MQrqo4/HmetGu28TMCZJd5ftr7tLhqcfSMITPOve9LBS2dKlQIB2pfknYHgggIYNsSGsD+BgVLFgho+FnlsQl8dPxlKW8miJAALg4y9p1QsPMxESuXE9q6NZSeVPH6JhHLYgk6QHKCgIRoQunXCjtcKKnNlwqMIEIC6BlilJxQkLtexK0JhHM9jMpTCooyRegp0wFEgZAQQxhzA/azCgjae8fzrK9OhwgJYLaD1dbNaO7UroWNTgBnutSuql2WW4IG2FrmOVe8RbxDl9GodQ2wd4cRFmBsEhh0MpIWGcf2jTCKjiqth3Ol1KAAMksmk8FC28FtYtjyOONJmy9oqDilYlEUMOQCch4xITVJMISdE8AGG0dI5GmKDqOY/c+IyYFsqGrAsIsRH0mgAG6dE0C6zZPD4JvjIykjVBtOl2FOABk29xE20YE4Kyp0gA/sCgadsx27wP26Us4JljVGtb3AsnVqtJ9waTa3DQJ1xYdjpw7wymcKBkbZb4UHVgg4fV7zyr8wChAFICac8EsvQ1EZd94koL1bg3Py+lBiNNQVWp4MCLDZ5lwsk1RjFmhlZirFfNXGGJ3wB/g014y9dQruSdQBCFYJONasIWutgMZ2hiQCty0FPmm6bsegAHS6rGo2mQfkX59IoWT7j4xxtz/AG5tM+PMKwyoRwiV47dg7zBh2EWrOqNjxqIBLI4S6s+q1DQcNoI/QLyOjFCQuJOg5zV4nYHgcaO9hpCYRrGbg3S98i21MERBtJZhNjCPfhaBAIIAws29DFjNBVhgexbd73YeOcZ9S+sGKjSCvRadqF5ICR79X4Rj/dy6YlIGOXs0hK/jQXmh5K+AhvNp5NQWBCpG+e90h/Q5G/yi8qTCKn1MdCBbgtWoF/U5GfAQhNgIYGQfWJBKy7jP5yTUvANvLZaSvNuGKi+FwARcHNTx8u3DjALaVy7g3ibB0ge+70K9bEnhq7Q1S4IVKGeXPmaExcP4vRuvvmrf4zDuArPoKzjs1CipzzNhTq3jfA5edjMdTBGTNpwL6qS+okmERyZvzY7slZB+S8eJ6Ed/+pmHFEiBj9TymoHuIUVyvYPtDZhxslFHxvBlNHRqqTqtYFkfI3yj6itK09p+5gBn4uFHBD38w0u42ltuoZIUMsOEuYVVkmP+Ul53wXsFTm3OSIZkIln9K9dQ+/VF6sl0L/k2oD063yfcD6hrDIkx4E4y3p/YxKB2EPmJuNRxjElrs+VLL9L65/3fpcMXuTgjqg/Y86yUQee+bNJt7DxEP9kVZSlt3kBzs7RESQEaxu0gjTodAOfV5lg59sYxieR2gFWmMb+oLLe/PK0CwkwcT9zdkH1g/PWJCXAAAAABJRU5ErkJggg==`;
  }

  private getDOC() {
    return ``;
  }

  private getDOCX() {
    return ``;
  }

  private getPTT() {
    return ``;
  }

  private getPTTX() {
    return ``;
  }

  private getXLS() {
    return ``;
  }

  private getXLSX() {
    return ``;
  }

  private getZIP() {
    return ``;
  }

  private get7Z() {
    return ``;
  }

  private getRAR() {
    return ``;
  }

  private getHTML() {
    return ``;
  }

  private getRSS() {
    return ``;
  }

  private getCSS() {
    return ``;
  }

  private getICO() {
    return ``;
  }

  private getPSD() {
    return ``;
  }

  private getXML() {
    return ``;
  }

  private getTXT() {
    return ``;
  }

  private getOtherFile() {
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABNElEQVRYR+3XvS4FQRjG8d+pfCXUqFwCldCKjxolNyFRKY6am1CoEESnUKF0GUQpEUoyyRzZrN2zE+dsIzPVzswz7/ufJzuTeTt+tzUcYB4TFfNNQ4foNol6852ScBcnqYv76JIhigDjeMFkDHyP10SYRcyWtEkQRYAlPMQgR9hPTB5k59iM+k+Mxe9GiCLAFs7iwu0YNJWhCLCCm1SINgBCzB7EaJMTbQGEvKu4Rl+INgECxDquMFLnRNsAIe8GLusg2gC4qPhzFzBXGA+X3W3otwGQcnJ+Ttm/AUjZdeU9MywHMkB2IDuQHcgOZAeyA0NxYJDCJAXgGHtRuIzH8pMslGbPmPpDadYEMI2wwdDeMIOPMkDoD6s4rQP6wg5Oe4JydRzGBy3Pq5K/4wmhVrwrCr4BQ2CDIWOexnQAAAAASUVORK5CYII=`;
  }

}

//Input style
//https://codepen.io/CreativeJuiz/pen/HbwcG

//Exam Doc
//https://github.com/kzrfaisal/angular-file-uploader

//File icon
//https://www.iconfinder.com/iconsets/file-extension-vol-1
