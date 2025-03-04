import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Project, ProjectFilters } from '../models/project';
import { Sponsor } from '../models/sponsor';
import { TechArea } from '../models/tech-area';
import { ApiService } from './api.service';

interface FormResponse {
  financiadores: Sponsor[];
  areas_tecnologicas: TechArea[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  sponsors: Sponsor[] = [];
  techAreas: TechArea[] = [];
  dialogOpen = false;
  dialogMode = 'create';
  selectedProject = new BehaviorSubject<Project>({
    id_projeto: 0,
    coordenador: '',
    projeto: '',
    ativo: false,
    inicio_vigencia: '',
    fim_vigencia: '',
    valor: 0,
  });

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
  ) {}

  getFormFields() {
    this.api.get('projetos/form').subscribe((data: any) => {
      const formData = data as FormResponse;
      this.sponsors = formData.financiadores;
      this.techAreas = formData.areas_tecnologicas;
      this.sponsors = data['financiadores'] as Sponsor[];
      this.techAreas = data['areas_tecnologicas'] as TechArea[];
    });
  }

  getProjects() {
    this.api.get('projetos/listar').subscribe((data) => {
      this.projects = data as Project[];
      this.filteredProjects = this.projects;
    });
  }

  getProject(id: number) {
    return this.api.get(`projetos/${id}/visualizar`);
  }

  createProject(project: Project) {
    this.api.post('projetos/cadastrar', project).subscribe({
      next: (res) => {
        this.toastr.success('Projeto cadastrado com sucesso!', 'Sucesso');
        console.log('API Response:', res);
        this.getProjects();
      },
      error: (err) => {
        this.toastr.error('Erro ao cadastrar projeto', 'Erro');
        console.log(err);
      },
    });
  }

  updateProject(project: Project) {
    this.api
      .patch(
        `projetos/${this.selectedProject.value.id_projeto}/editar`,
        project,
      )
      .subscribe({
        next: (res) => {
          this.toastr.success('Projeto atualizado com sucesso!', 'Sucesso');
          console.log('API Response:', res);
          this.getProjects();
        },
        error: (err) => {
          this.toastr.error('Erro ao atualizar projeto', 'Erro');
          console.log(err);
        },
      });
  }

  deleteProject(project: Project) {
    this.api.delete(`projetos/${project.id_projeto}`).subscribe((res) => {
      console.log(res);
    });
  }

  toggleProjectStatus(p: Project) {
    if (p.ativo) {
      this.api.post(`projetos/${p.id_projeto}/inativar`, {}).subscribe({
        next: (res) => {
          console.log('API Response:', res);
          this.toastr.success('Projeto inativado com sucesso!', 'Sucesso');
        },
        error: (err) => {
          this.toastr.error('Erro ao inativar projeto', 'Erro');
          console.log(err);
        },
      });
    } else if (!p.ativo) {
      this.api.post(`projetos/${p.id_projeto}/ativar`, {}).subscribe({
        next: (res) => {
          console.log('API Response:', res);
          this.toastr.success('Projeto ativado com sucesso!', 'Sucesso');
        },
        error: (err) => {
          this.toastr.error('Erro ao ativar projeto', 'Erro');
          console.log(err);
        },
      });
    }
  }

  selectProject(projectId: number | string) {
    this.getProject(projectId as number).subscribe((data) => {
      console.log(data);
      this.selectedProject.next(data as Project);
    });

    this.openDialog();
  }

  setDialogMode(mode: 'create' | 'view' | 'edit') {
    this.dialogMode = mode;
  }

  resetSelectedProject() {
    this.selectedProject.next({
      id_projeto: 0,
      coordenador: '',
      projeto: '',
      ativo: false,
      inicio_vigencia: '',
      fim_vigencia: '',
      valor: 0,
    });
  }

  openDialog() {
    this.dialogOpen = true;
  }

  closeDialog() {
    this.dialogOpen = false;
    this.resetSelectedProject();
  }

  filterProjects(filters: ProjectFilters) {
    console.log(filters);
    this.filteredProjects = this.projects.filter((project) => {
      let match = true;
      if (filters.projeto) {
        if (
          !project.projeto.toLowerCase().includes(filters.projeto.toLowerCase())
        ) {
          console.log('name not a match');
          match = false;
        }
      }
      if (typeof filters.ativo === 'boolean') {
        if (project.ativo !== filters.ativo) {
          console.log('status not a match');
          match = false;
        }
      }
      if (filters.inicio_vigencia) {
        if (
          new Date(project.inicio_vigencia).getTime() <
          new Date(filters.inicio_vigencia).getTime()
        ) {
          console.log('start date not a match');
          match = false;
        }
      }
      if (filters.fim_vigencia) {
        if (
          new Date(project.fim_vigencia).getTime() >
          new Date(filters.fim_vigencia).getTime()
        ) {
          console.log('end date not a match');
          match = false;
        }
      }
      return match;
    });
  }

  resetFilters() {
    this.filteredProjects = this.projects;
  }
}
