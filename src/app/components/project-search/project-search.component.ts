import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'project-search',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    FloatLabel,
  ],
  templateUrl: './project-search.component.html',
})
export class ProjectSearchComponent {
  filterForm: FormGroup = new FormGroup({});
  statusOptions = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false },
  ];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.filterForm = new FormGroup({
      projeto: new FormControl(null),
      inicio_vigencia: new FormControl(null),
      fim_vigencia: new FormControl(null),
      ativo: new FormControl(null),
    });
  }

  applyFilters() {
    this.projectService.filterProjects(this.filterForm.value);
  }

  clearFilters() {
    this.projectService.resetFilters();
  }
}
