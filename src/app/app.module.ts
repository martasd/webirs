import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageTypesComponent } from './message-types/message-types.component';
import { StructureMapperComponent } from './structure-mapper/structure-mapper.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageTypesComponent,
    StructureMapperComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
