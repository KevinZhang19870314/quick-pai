# x-controls - Angular 6+ common components, controls.

## Get started

#### 1. Install the x-controls
```shell
npm i x-controls
```

#### 2. Import style themes to style.scss file
```scss
@import 'x-controls/lib/theming.scss';
@import 'x-controls/lib/theme/theming/prebuilt/teal-light.scss';
```

#### 3. Import CilButtonModule (as an example) to AppModule file
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { XButtonModule } from 'x-controls';
import { AppComponent } from './app.component';
@NgModule({
  imports: [
      BrowserModule, 
      FormsModule,
      XButtonModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

#### 4. Add below html to App.component.html file
```html
<x-button>primary</x-button>
<br />
<x-button xColor="accent">accent</x-button>
<br />
<x-button xColor="warn">warn</x-button>
```

#### 5. All done!


## Online [demo](https://stackblitz.com/edit/x-button?embed=1&file=src/app/app.component.html)


## Learn more at [My blog site](https://blog.csdn.net/zxz414644665/category_8975492.html)
