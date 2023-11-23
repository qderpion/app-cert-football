import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuCountryComponent } from '../../components/menu-country/menu-country.component';
import { Country } from '../../interfaces';
import { FootballService } from '../../services';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, CdkTableModule, MenuCountryComponent, RouterLink],
})
export class HomeComponent {
  /**
   * Les colonnes à afficher dans le tableau
   */
  public readonly displayedColumns: string[] = [
    'rank',
    'logo',
    'name',
    'games',
    'win',
    'lose',
    'draw',
    'goalsDiff',
    'points',
  ];

  /**
   * @param footballService Le service FootballService
   */
  constructor(public readonly footballService: FootballService) {}

  /**
   * Permet de sélectionner un pays
   * @param country Le pays à sélectionner
   */
  public selectCountry(country: Country): void {
    this.footballService.setCurrentCountry(country);
  }
}
