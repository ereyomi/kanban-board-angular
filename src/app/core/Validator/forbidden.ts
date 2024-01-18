import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const ForbiddenCharactersValidator = (): ValidatorFn => {
  const forbiddenCharacters = /[@#$%^&*()_+{}[\]:;<>,.?~\\/]+/;
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = forbiddenCharacters.test(control.value);
    return forbidden ? { invalidCharacters: true } : null;
  };
};
