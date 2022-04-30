import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';


const matModules = [MatInputModule,MatCardModule,MatButtonModule,MatToolbarModule,MatExpansionModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    matModules
  ],
  exports:[
    matModules
  ]
})
export class MatModuleModule { }
