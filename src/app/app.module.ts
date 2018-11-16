import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MessageTypesComponent } from './message-types/message-types.component';
import { NodeComponent } from './node/node.component';
import { StructureMapperComponent } from './structure-mapper/structure-mapper.component';
import { DragulaModule } from 'ng2-dragula';
import { DragulaMapperComponent } from './dragula-mapper/dragula-mapper.component';


@NgModule({
  declarations: [
    AppComponent,
    MessageTypesComponent,
    StructureMapperComponent,
    NodeComponent,
    DragulaMapperComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
