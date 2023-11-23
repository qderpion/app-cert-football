import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterGoBackDirective } from '../../directives/router-go-back.directive';
import { Fixture } from '../../interfaces';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    CommonModule,
    RouterGoBackDirective,
    CdkTableModule,
    NgOptimizedImage,
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent {
  /**
   * Liste des colonnes à afficher
   */
  public readonly displayedColumns: string[] = [
    'teamHomeLogo',
    'teamHomeName',
    'teamHomeScore',
    'separator',
    'teamAwayScore',
    'teamAwayName',
    'teamAwayLogo',
  ];

  /**
   * Liste des fixtures
   */
  @Input()
  public fixtures!: Fixture[];
}
