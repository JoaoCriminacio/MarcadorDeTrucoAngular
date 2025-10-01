import { Component } from '@angular/core';
import {ITeam} from '../shared/models/team.model';
import {TeamsComponent} from '../shared/components/teams/teams.component';
import {NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  imports: [
    TeamsComponent,
    NgClass,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    images: ITeam[] = [
      {
        src: 'teams/athletico.png',
        alt: 'Escudo do Athletico Paranaense',
        name: 'Athletico Paranaense',
        simplifiedName: 'athletico'
      },
      {
        src: 'teams/atletico-mineiro.png',
        alt: 'Escudo do Atlético Mineiro',
        name: 'Atlético Mineiro',
        simplifiedName: 'atletico-mineiro'
      },
      {
        src: 'teams/avai.png',
        alt: 'Escudo do Avaí',
        name: 'Avaí',
        simplifiedName: 'avai'
      },
      {
        src: 'teams/bahia.png',
        alt: 'Escudo do Bahia',
        name: 'Bahia',
        simplifiedName: 'bahia'
      },
      {
        src: 'teams/botafogo.png',
        alt: 'Escudo do Botafogo',
        name: 'Botafogo',
        simplifiedName: 'botafogo'
      },
      {
        src: 'teams/bragantino.png',
        alt: 'Escudo do Bragantino',
        name: 'Bragantino',
        simplifiedName: 'bragantino'
      },
      {
        src: 'teams/ceara.png',
        alt: 'Escudo do Ceará',
        name: 'Ceará',
        simplifiedName: 'ceara'
      },
      {
        src: 'teams/corinthians.png',
        alt: 'Escudo do Corinthians',
        name: 'Corinthians',
        simplifiedName: 'corinthians'
      },
      {
        src: 'teams/coritiba.png',
        alt: 'Escudo do Coritiba',
        name: 'Coritiba',
        simplifiedName: 'coritiba'
      },
      {
        src: 'teams/cruzeiro.png',
        alt: 'Escudo do Cruzeiro',
        name: 'Cruzeiro',
        simplifiedName: 'cruzeiro'
      },
      {
        src: 'teams/cuiaba.png',
        alt: 'Escudo do Cuiabá',
        name: 'Cuiabá',
        simplifiedName: 'cuiaba'
      },
      {
        src: 'teams/flamengo.png',
        alt: 'Escudo do Flamengo',
        name: 'Flamengo',
        simplifiedName: 'flamengo'
      },
      {
        src: 'teams/fluminense.png',
        alt: 'Escudo do Fluminense',
        name: 'Fluminense',
        simplifiedName: 'fluminense'
      },
      {
        src: 'teams/fortaleza.png',
        alt: 'Escudo do Fortaleza',
        name: 'Fortaleza',
        simplifiedName: 'fortaleza'
      },
      {
        src: 'teams/goias.png',
        alt: 'Escudo do Goiás',
        name: 'Goiás',
        simplifiedName: 'goias'
      },
      {
        src: 'teams/gremio.png',
        alt: 'Escudo do Grêmio',
        name: 'Grêmio',
        simplifiedName: 'gremio'
      },
      {
        src: 'teams/internacional.png',
        alt: 'Escudo do Internacional',
        name: 'Internacional',
        simplifiedName: 'internacional'
      },
      {
        src: 'teams/juventude.png',
        alt: 'Escudo do Juventude',
        name: 'Juventude',
        simplifiedName: 'juventude'
      },
      {
        src: 'teams/palmeiras.png',
        alt: 'Escudo do Palmeiras',
        name: 'Palmeiras',
        simplifiedName: 'palmeiras'
      },
      {
        src: 'teams/santos.png',
        alt: 'Escudo do Santos',
        name: 'Santos',
        simplifiedName: 'santos'
      },
      {
        src: 'teams/sao-paulo.png',
        alt: 'Escudo do São Paulo',
        name: 'São Paulo',
        simplifiedName: 'sao-paulo'
      },
      {
        src: 'teams/sport.png',
        alt: 'Escudo do Sport',
        name: 'Sport',
        simplifiedName: 'sport'
      },
      {
        src: 'teams/vasco.png',
        alt: 'Escudo do Vasco',
        name: 'Vasco',
        simplifiedName: 'vasco'
      },
      {
        src: 'teams/vitoria.png',
        alt: 'Escudo do Vitória',
        name: 'Vitória',
        simplifiedName: 'vitoria'
      }
    ];

    protected playSounds: boolean = true;
    protected isMatchInProgress: boolean = false;
    protected leftTeam: ITeam | undefined = undefined;
    protected rightTeam: ITeam | undefined = undefined;

    constructor() {}

    protected startMatch() {
      this.isMatchInProgress = true;
    }

    protected finishMatch() {
      this.leftTeam = undefined;
      this.rightTeam = undefined;
      this.isMatchInProgress = false;
    }
}
