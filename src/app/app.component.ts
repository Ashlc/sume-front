import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerPlus } from '@ng-icons/tabler-icons';
import { TableModule } from 'primeng/table';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PageTitleComponent,
    TableModule,
    ProjectTableComponent,
    IconButtonComponent,
    NgIcon,
    ProjectDialogComponent,
  ],
  templateUrl: './app.component.html',
  viewProviders: [provideIcons({ tablerPlus })],
})
export class AppComponent {
  title = 'Projetos';
  dialogVisible = false;

  toggleDialog() {
    this.dialogVisible = !this.dialogVisible;
  }

  closeDialog() {
    this.dialogVisible = false;
  }
}
