import {Component, OnInit, viewChild} from '@angular/core';
import {ITeam} from '../shared/models/team.model';
import {IMatchState} from '../shared/models/match.model';
import {TeamsComponent} from '../shared/components/teams/teams.component';
import {NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import confetti from 'canvas-confetti';

const teams: ITeam[] = [
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
export class HomeComponent implements OnInit {
    private readonly STORAGE_KEY = 'truco-match-state';

    protected images: ITeam[] = teams;

    protected leftTeamComponent = viewChild<TeamsComponent>('left');
    protected rightTeamComponent = viewChild<TeamsComponent>('right');

    protected playSounds: boolean = true;
    protected isMatchInProgress: boolean = false;
    protected leftTeam: ITeam | undefined = undefined;
    protected rightTeam: ITeam | undefined = undefined;
    protected trucoClicks = 0;
    protected trucoPoints = 1;
    protected trucoLabel = 'Truco';

    ngOnInit() {
      const matchInfo = localStorage.getItem(this.STORAGE_KEY);
      if (!matchInfo) return;

      const state = JSON.parse(matchInfo) as IMatchState;

      this.isMatchInProgress = state.isMatchInProgress;

      this.leftTeam = state.leftTeam;
      this.rightTeam = state.rightTeam;

      queueMicrotask(() => {
        if (state.leftTeamStats && this.leftTeamComponent()) {
          this.leftTeamComponent()!.points = state.leftTeamStats.points;
          this.leftTeamComponent()!.victories = state.leftTeamStats.victories;
        }

        if (state.rightTeamStats && this.rightTeamComponent()) {
          this.rightTeamComponent()!.points = state.rightTeamStats.points;
          this.rightTeamComponent()!.victories = state.rightTeamStats.victories;
        }
      });
    }

    protected startMatch() {
      this.isMatchInProgress = true;
      this.saveState();
    }

    protected finishMatch() {
      this.leftTeam = undefined;
      this.rightTeam = undefined;
      this.isMatchInProgress = false;
      this.resetTruco();
      localStorage.removeItem(this.STORAGE_KEY);
    }

    protected onTeamWin() {
      confetti({
        particleCount: 400,
        spread: 80,
        ticks: 400,
        origin: { y: 0.5 },
        zIndex: 2000
      });

      this.leftTeamComponent()?.resetPoints();
      this.rightTeamComponent()?.resetPoints();
      this.saveState();
    }

    protected truco () {
      if (this.trucoClicks === 0) {
        this.trucoPoints = 3;
        this.trucoLabel = 'Seis';
        this.trucoClicks++;
      } else if (this.trucoClicks === 1) {
        this.trucoPoints = 6;
        this.trucoLabel = 'Nove';
        this.trucoClicks++;
      } else if (this.trucoClicks === 2) {
        this.trucoPoints = 9;
        this.trucoLabel = 'Doze';
        this.trucoClicks++;
      } else if (this.trucoClicks === 3) {
        this.trucoPoints = 12;
        this.trucoLabel = '1 Ponto';
        this.trucoClicks++;
      } else {
        this.trucoPoints = 1;
        this.trucoLabel = 'Truco';
        this.trucoClicks = 0;
      }
    }

    protected resetTruco() {
      this.trucoPoints = 1;
      this.trucoLabel = 'Truco';
      this.trucoClicks = 0;
    }

    protected saveState() {
      const state: IMatchState = {
        isMatchInProgress: this.isMatchInProgress,
        leftTeam: this.leftTeam,
        rightTeam: this.rightTeam,
        leftTeamStats: this.leftTeamComponent() ? {
            points: this.leftTeamComponent()!.points >= 12 ? 0 : this.leftTeamComponent()!.points,
            victories: this.leftTeamComponent()!.victories
          }
          : undefined,
        rightTeamStats: this.rightTeamComponent() ? {
            points: this.rightTeamComponent()!.points >= 12 ? 0 : this.rightTeamComponent()!.points,
            victories: this.rightTeamComponent()!.victories
          }
          : undefined
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }
}
