import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerCheck,
  tablerEdit,
  tablerEye,
  tablerX,
} from '@ng-icons/tabler-icons';
import { ConfirmationService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../services/api.service';
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
  public projects: any;

  constructor(
    private api: ApiService,
    private confirmationService: ConfirmationService,
  ) {}

  confirmToggle(project: any) {
    this.confirmationService.confirm({
      header: project.ativo ? 'Inativar projeto?' : 'Ativar projeto?',
      message: `Deseja realmente ${project.ativo ? 'inativar' : 'ativar'} <b>${project.projeto}?</b>`,
      acceptLabel: project.ativo ? 'Inativar' : 'Ativar',
      accept: () => {
        console.log('acepted');
      },
      rejectLabel: 'Cancelar',
      reject: () => {
        console.log('rejected');
      },
    });
  }

  toggleStatus(current: boolean) {
    console.log(`${current} => ${!current}`);
    return;
  }

  ngOnInit(): void {
    this.api.get('projetos/listar').subscribe((data) => {
      this.projects = data;
    });
  }
}
