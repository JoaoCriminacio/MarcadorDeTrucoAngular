import {Component, input, output} from '@angular/core';
import {ITeam} from '../../models/team.model';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {DialogWinComponent} from '../dialog-win/dialog-win.component';
import {take} from 'rxjs';

@Component({
  selector: 'app-teams',
  imports: [
    MatIcon,
    NgClass
  ],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
    teams = input<ITeam | ITeam[]>();
    isMatchInProgress = input<boolean>(false);
    playSounds = input<boolean>(true);
    selectedTeam = output<ITeam | undefined>();

    protected selectedIndex: number = 0;
    protected isTeamSelected: boolean = false;
    protected points: number = 0;
    protected victories: number = 0;
    protected trucoClicks: number = 0;
    protected trucoPoints: number = 1;
    protected trucoLabel: string = 'Truco';

    constructor(private dialog: MatDialog) {}

    protected get imagesArray(): ITeam[] {
      const value = this.teams();
      return Array.isArray(value) ? value : value ? [value] : [];
    }

    protected navigate (direction: number) {
      const arr = this.imagesArray;
      const newIndex = this.selectedIndex + direction;

      if (newIndex >= 0 && newIndex < arr?.length) this.selectedIndex = newIndex;

      if (newIndex < 0) this.selectedIndex = arr?.length - 1;

      if (newIndex >= arr?.length) this.selectedIndex = 0;
    }

    protected onSelectTeam(team: any) {
      this.selectedTeam.emit(team);
      this.isTeamSelected = true;

      if (this.playSounds()) {
        let audio = new Audio(`audios/call/${team.simplifiedName}.mp3`);
        audio.currentTime = 0;
        audio.play();
      }
    }

    protected onUnselectTeam() {
      this.selectedTeam.emit(undefined);
      this.victories = 0;
      this.isTeamSelected = false;
    }

    protected addPoints() {
      this.points += this.trucoPoints;
      this.trucoLabel = 'Truco';
      this.trucoPoints = 1;
      this.trucoClicks = 0;

      if (this.points >= 12) {
        this.openWinDialog();
      }
    }

    protected removePoints() {
      if (this.points === 0) return this.points = 0;
      return this.points -= 1;
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

    private openWinDialog() {
      this.dialog.open(DialogWinComponent, {
        data: {
          team: this.teams(),
          playSounds: this.playSounds(),
        },
        backdropClass: 'dialog-backdrop',
        panelClass: 'transparent-dialog-panel'
      }).afterClosed().pipe(take(1)).subscribe(async (value) => {
        this.points = 0;
        this.victories > 99999 ? this.victories = 0 : this.victories++;
        this.trucoPoints = 1;
        this.trucoLabel = 'Truco';
        this.trucoClicks = 0;
      });
    }
}
