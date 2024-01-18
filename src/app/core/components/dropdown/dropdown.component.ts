import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  openDropDown = signal<boolean>(false);

  toggleDropDown() {
    this.openDropDown.update((v) => !v);
  }
}
