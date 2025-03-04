import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerSearch } from '@ng-icons/tabler-icons';
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
    NgIcon,
  ],
  templateUrl: './project-search.component.html',
  viewProviders: [provideIcons({ tablerSearch })],
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
