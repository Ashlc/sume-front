import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButton } from 'primeng/radiobutton';
import { ApiService } from '../../services/api.service';
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
  ],
  templateUrl: './project-dialog.component.html',
})
export class ProjectDialogComponent {
  projectForm: FormGroup<{
    projeto: FormControl<string>;
    id_financiador: FormControl<number>;
    id_area_tecnologica: FormControl<number>;
    id_coordenador: FormControl<number>;
    ativo: FormControl<boolean>;
    inicio_vigencia: FormControl<string>;
    fim_vigencia: FormControl<string>;
  }>;

  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Input() mode: 'create' | 'view' | 'edit' = 'create';
  @Input() project: any = {};
  @Input() onClose: Function = () => {};
  @Input() submitCallback: Function = (message: string) => {};

  constructor(private api: ApiService) {
    this.projectForm = new FormGroup({
      projeto: new FormControl(this.project.project || null),
      id_financiador: new FormControl(this.project.id_financiador || null),
      id_area_tecnologica: new FormControl(
        this.project.id_area_tecnologica || null,
      ),
      id_coordenador: new FormControl(this.project.id_coordenador || null),
      ativo: new FormControl(this.project.ativo || null),
      inicio_vigencia: new FormControl(this.project.inicio_vigencia || null),
      fim_vigencia: new FormControl(this.project.fim_vigencia || null),
    });
  }

  save() {
    switch (this.mode) {
      case 'create':
        this.api.post('projects', this.project).subscribe((res) => {
          this.submitCallback(res);
        });
        break;
      case 'edit':
        this.api
          .put(`projects/${this.project.id}`, this.project)
          .subscribe((res) => {
            this.submitCallback(res);
          });
        break;
      default:
        this.submitCallback('Invalid mode');
    }
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
