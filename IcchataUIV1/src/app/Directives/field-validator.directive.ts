import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFieldValidator]'
})
export class FieldValidatorDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('keydown') onkeydown() {
    if (this.elementRef.nativeElement.validity.valid){
      this.elementRef.nativeElement.parentElement.classList.remove('has-error');
      this.elementRef.nativeElement.parentElement.classList.add('has-success');
    }
    else {
      if (this.elementRef.nativeElement.parentElement.classList.contains('has-error')){
      }
      else {
        this.elementRef.nativeElement.parentElement.classList.add('has-error');
      }

    }
  }

}
