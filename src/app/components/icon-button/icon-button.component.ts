import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'icon-button',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent {
  @Input() disabled: boolean = false;
  @Input() label: string = 'Botão';
  @Input() circle: boolean = false;
}
