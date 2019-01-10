import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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
  private file: File;
  public selectedFile: FileSnippet[] = [];

  /////////////// End Variable ////////////////


  public onFileChange(fileInput) {
    this.file = fileInput.files[0];

    const fileReader: FileReader = new FileReader();

    fileReader.readAsDataURL(this.file);
    fileReader.addEventListener('load', (event: any) => {

      if(this.multiple){
        this.selectedFile.push(new FileSnippet(event.target.result, this.file)) ;
      } else {
        this.selectedFile[0] = new FileSnippet(event.target.result, this.file)
      }


      console.log("reader");
      console.log(this.selectedFile);
      console.log("#####################");

    });

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
