# x-controls

## Get started

#### 1. Install the x-controls
```shell
npm i x-controls
```

#### 2. Import style themes to style.scss file
```js
@import '../node_modules/cil-ngx-controls/lib/theming';
@import '../node_modules/cil-ngx-controls/theme/theming/prebuilt/teal-dark.scss';
```

#### 3. Import CilButtonModule (as an example) to AppModule file
```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CilButtonModule } from 'cil-ngx-controls';
import { AppComponent } from './app.component';
@NgModule({
  imports: [
      BrowserModule, 
      FormsModule,
      CilButtonModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

#### 4. Add below html to App.component.html file
```js
<cil-button>确定</cil-button>
<br />
<cil-button buttonType="secondary">点击上传</cil-button>
```

#### 5. All done!


## Learn more at [My blog site](https://blog.csdn.net/zxz414644665/category_8975492.html)
