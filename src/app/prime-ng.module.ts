import { NgModule } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FieldsetModule } from 'primeng/fieldset';

import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';


import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PanelModule } from 'primeng/panel';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  exports: [
    FileUploadModule,
    ToastModule,
    TableModule,
    DynamicDialogModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    OverlayPanelModule,
    FieldsetModule,
    ScrollPanelModule,
    AccordionModule,
    TabViewModule,
    MessageModule,
    MessagesModule,
    SidebarModule,
    ToolbarModule,
    MenubarModule,
    BreadcrumbModule,
    PanelModule,
    BlockUIModule,
    ProgressSpinnerModule
  ]
})
export class PrimeNgModule { }
