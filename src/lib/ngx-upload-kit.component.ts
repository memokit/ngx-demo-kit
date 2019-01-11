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


    let index = _.findIndex(extensionList, (etn) => { return etn === fileType; });

    return index >= 0? true : false;

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

}

//Input style
//https://codepen.io/CreativeJuiz/pen/HbwcG

//Exam Doc
//https://github.com/kzrfaisal/angular-file-uploader
