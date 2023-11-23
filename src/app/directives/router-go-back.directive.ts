import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appRouterGoBack],[routerGoBack]',
  standalone: true,
})
export class RouterGoBackDirective {
  /**
   * Constructeur
   * @param location Location
   */
  constructor(private location: Location) {}

  /**
   * Permet de revenir en arrière lors d'un clic
   */
  @HostListener('click')
  public onClick(): void {
    this.location.back();
  }
}
