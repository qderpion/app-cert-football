import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from '../../interfaces';

@Component({
  selector: 'app-menu-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-country.component.html',
  styleUrl: './menu-country.component.scss',
})
export class MenuCountryComponent {
  /**
   * Liste des pays
   */
  @Input()
  public countries: Country[] = [];

  /**
   * Pays sélectionné
   */
  @Input()
  public selectedCountry: Country = {} as Country;

  /**
   * Evènement émis lors de la sélection d'un pays
   */
  @Output()
  public selectedCountryChange: EventEmitter<Country> = new EventEmitter();

  /**
   * Permet de sélectionner un pays
   * @param country Le pays à sélectionner
   */
  public selectCountry(country: Country): void {
    this.selectedCountryChange.emit(country);
  }
}
