import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerPlus, tablerTable } from '@ng-icons/tabler-icons';
import { TableModule } from 'primeng/table';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { ProjectDialogComponent } from './components/project-dialog/project-dialog.component';
import { ProjectSearchComponent } from './components/project-search/project-search.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { ProjectService } from './services/project.service';

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
    ProjectSearchComponent,
  ],
  templateUrl: './app.component.html',
  viewProviders: [provideIcons({ tablerPlus, tablerTable })],
})
export class AppComponent {
  title = 'Projetos';

  constructor(public projectService: ProjectService) {}

  createProject() {
    this.projectService.dialogMode = 'create';
    this.projectService.dialogOpen = true;
  }
}
