import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerCheck,
  tablerEdit,
  tablerEye,
  tablerX,
} from '@ng-icons/tabler-icons';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ProjectStatusComponent } from '../project-status/project-status.component';
@Component({
  selector: 'project-table',
  imports: [
    TableModule,
    DatePipe,
    CommonModule,
    BadgeModule,
    ProjectStatusComponent,
    NgIcon,
    IconButtonComponent,
    ConfirmDialogModule,
  ],
  templateUrl: './project-table.component.html',
  providers: [ConfirmationService],
  viewProviders: [
    provideIcons({ tablerEye, tablerEdit, tablerCheck, tablerX }),
  ],
})
export class ProjectTableComponent implements OnInit {
  constructor(
    public projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
  ) {}

  confirmToggle(project: Project) {
    this.confirmationService.confirm({
      header: project.ativo ? 'Inativar projeto?' : 'Ativar projeto?',
      message: `Deseja realmente ${project.ativo ? 'inativar' : 'ativar'} <b>${project.projeto}?</b>`,
      acceptLabel: project.ativo ? 'Inativar' : 'Ativar',
      accept: () => {
        this.projectService.toggleProjectStatus(project);
      },
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-text',
      reject: () => {
        this.toastr.info('Operação cancelada');
      },
    });
  }

  view(p: Project) {
    this.projectService.selectProject(p.id_projeto);
    this.projectService.setDialogMode('view');
  }

  edit(p: Project) {
    this.projectService.selectProject(p.id_projeto);
    this.projectService.setDialogMode('edit');
  }

  ngOnInit(): void {
    this.projectService.getProjects();
  }
}
