import { NgClass } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Optional,
  Self,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { SelectOptionT } from '../../types/Select';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) options!: SelectOptionT[];

  @Input() placeholder: string = '';

  openDropDown = signal<boolean>(false);

  selectedValue = signal<SelectOptionT>({
    id: '',
    label: '',
  });

  disabled = false;

  value: string = '';

  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  public get inputControl() {
    return this.controlDir?.control;
  }

  ngOnInit(): void {
    // if I have a value passed in, do update my selected value
    if (this.inputControl?.value) {
      const f = this.options.find((v) => v.id === this.inputControl?.value);
      this.selectedValue.update((prevOp) => f || prevOp);
    }
  }

  writeValue(value: string): void {
    this.value = value;
    this.onChanged(value);
  }

  public registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectChange(item: SelectOptionT) {
    this.writeValue(item.id);
    this.selectedValue.set(item);
    this.toggleDropDown();
  }

  toggleDropDown() {
    this.openDropDown.update((v) => !v);
  }

  private onChanged: any = () => {};
  private onTouched: any = () => {};
}
