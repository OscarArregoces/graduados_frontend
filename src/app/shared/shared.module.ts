import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './components/card/card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CardDialogComponent } from './components/card-dialog/card-dialog.component';
import { DetailActivityComponent } from './components/detail-activity/detail-activity.component';
import { UpsComponent } from './components/ups/ups.component';
import { CardReportComponent } from './components/card-report/card-report.component';
import { PieGraphicComponent } from './components/graphics/pie-graphic/pie-graphic.component';
import { BarGraphicComponent } from './components/graphics/bar-graphic/bar-graphic.component';
import { ReportEncuestaComponent } from './components/reports/report-encuesta/report-encuesta.component';
import { ReportGraduadosComponent } from './components/reports/report-graduados/report-graduados.component';
import { CustomInfoCardComponent } from './components/custom-info-card/custom-info-card.component';
import { CustomPaginatorComponent } from './components/custom-paginator/custom-paginator.component';

import { ImgErrorDirective } from './directives/img-error.directive';

import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { MenubarModule } from 'primeng/menubar';
import { CarouselModule } from 'primeng/carousel';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';

import { RoleDirective } from './directives/role.directive';

import { ScannerPipe } from './pipes/scanner.pipe';
import { FormatPermissionNamePipe } from './pipes/format-permission-name.pipe';
import { CurrencyCopPipe } from './pipes/currency-cop.pipe';




@NgModule({
  declarations: [
    CardComponent,
    CardDialogComponent,
    SpinnerComponent,
    ImgErrorDirective,
    RoleDirective,
    ScannerPipe,
    DetailActivityComponent,
    UpsComponent,
    PieGraphicComponent,
    CardReportComponent,
    BarGraphicComponent,
    ReportEncuestaComponent,
    ReportGraduadosComponent,
    FormatPermissionNamePipe,
    CustomInfoCardComponent,
    CustomPaginatorComponent,
    CurrencyCopPipe,

  ],
  exports: [
    CardComponent,
    CardDialogComponent,
    SpinnerComponent,
    DetailActivityComponent,
    UpsComponent,
    CardReportComponent,
    ReportEncuestaComponent,
    ReportGraduadosComponent,
    CustomInfoCardComponent,
    CustomPaginatorComponent,

    ImgErrorDirective,
    RoleDirective,
    FormatPermissionNamePipe,

    ScannerPipe,
    CurrencyCopPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    CheckboxModule,
    RadioButtonModule,
    ToastModule,
    TableModule,
    DialogModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ChipModule,
    MenubarModule,
    CarouselModule,
    PaginatorModule,
    ChartModule,
    MultiSelectModule,
    DropdownModule
  ]
})
export class SharedModule { }
