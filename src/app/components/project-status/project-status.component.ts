import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerX } from '@ng-icons/tabler-icons';
@Component({
  selector: 'project-status',
  imports: [NgIcon],
  templateUrl: './project-status.component.html',
  providers: [provideIcons({ tablerCheck, tablerX })],
})
export class ProjectStatusComponent {
  @Input() status: boolean = false;
}
