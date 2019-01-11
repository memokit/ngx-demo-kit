Angular upload file is beta and currently in development, which supports angular version 7

### Install
```
npm i ngx-upload-kit
```

or

```
yarn add ngx-upload-kit
```

### Usage
- Bootstrap css is required. in your index.html.

- Import NgxUploadKitModule inside your app.module.ts 
  ```javascript
  import { NgxUploadKitModule } from "ngx-upload-kit";
  ```
  ```javascript
  @NgModule({
    imports: [
        ...,
        NgxUploadKitModule,
        ...
    ]
  })
  ```

##### Example
  ```html
  <ngx-upload-kit></ngx-upload-kit>
  ```
