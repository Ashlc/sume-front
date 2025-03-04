import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  tablerDeviceFloppy,
  tablerEdit,
  tablerX,
} from '@ng-icons/tabler-icons';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButton } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'project-dialog',
  imports: [
    DialogModule,
    InputTextModule,
    FloatLabel,
    FormsModule,
    RadioButton,
    ReactiveFormsModule,
    ButtonModule,
    SelectModule,
    NgIcon,
  ],
  templateUrl: './project-dialog.component.html',
  viewProviders: [provideIcons({ tablerDeviceFloppy, tablerEdit, tablerX })],
})
export class ProjectDialogComponent {
  projectForm: FormGroup = new FormGroup({});

  @Input() title: string = '';

  private sub?: Subscription;

  constructor(public projectService: ProjectService) {}

  ngOnInit() {
    this.initForm();
    this.projectService.getFormFields();
    this.sub = this.projectService.selectedProject.subscribe((p) => {
      this.projectForm.patchValue(p);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private initForm() {
    const project = this.projectService.selectedProject.value;
    this.projectForm = new FormGroup({
      projeto: new FormControl(project.projeto || null),
      id_financiador: new FormControl(project.id_financiador || null),
      id_area_tecnologica: new FormControl(project.id_area_tecnologica || null),
      coordenador: new FormControl(project.coordenador || null),
      ativo: new FormControl(project.ativo || false),
      inicio_vigencia: new FormControl(project.inicio_vigencia || null),
      fim_vigencia: new FormControl(project.fim_vigencia || null),
    });
    this.projectForm.patchValue(project);
  }

  getHeader() {
    switch (this.projectService.dialogMode) {
      case 'create':
        return 'Novo Projeto';
      case 'edit':
        return 'Editar Projeto';
      case 'view':
        return 'Visualizar Projeto';
      default:
        return 'Projeto';
    }
  }

  onSubmit() {
    switch (this.projectService.dialogMode) {
      case 'create':
        this.projectService.createProject(this.projectForm.value);
        this.projectService.closeDialog();
        break;
      case 'edit':
        this.projectService.updateProject(this.projectForm.value);
        this.projectService.closeDialog();
        break;
      default:
        throw new Error('Invalid dialog mode');
    }
  }

  onClose() {
    this.projectService.closeDialog();
  }
}
