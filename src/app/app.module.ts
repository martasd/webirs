import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MessageTypesComponent } from './message-types/message-types.component';
import { NodeComponent } from './node/node.component';
import { StructureMapperComponent } from './structure-mapper/structure-mapper.component';
import { FilterBySourcePipe } from './filter-by-source.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MessageTypesComponent,
    StructureMapperComponent,
    NodeComponent,
    FilterBySourcePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
