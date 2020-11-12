import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ButtonComponent } from './sample/button/button.component';
import { CheckboxComponent } from './sample/checkbox/checkbox.component';
import { RadioButtonComponent } from './sample/radio-button/radio-button.component';
import { InputComponent } from './sample/input/input.component';
import { TabsComponent } from './sample/tabs/tabs.component';
import { TooltipComponent } from './sample/tooltip/tooltip.component';
import { DropdownComponent } from './sample/dropdown/dropdown.component';

const routes: Routes = [
  { path: 'button', component: ButtonComponent },
  { path: 'checkbox', component: CheckboxComponent },
  { path: 'radio-button', component: RadioButtonComponent },
  { path: 'input', component: InputComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'tooltip', component: TooltipComponent },
  { path: 'dropdown', component: DropdownComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
