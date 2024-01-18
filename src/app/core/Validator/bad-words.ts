import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import BadWordsFilter from 'bad-words';

export const BadWordsValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const isProfane = new BadWordsFilter().isProfane(control.value);
    return isProfane ? { hasBadWords: true } : null;
  };
};
