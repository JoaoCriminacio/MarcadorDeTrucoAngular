import {Component, input, output} from '@angular/core';
import {ITeam} from '../../models/team.model';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {DialogWinComponent} from '../dialog-win/dialog-win.component';

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
    trucoPoints = input<number>(1);
    playSounds = input<boolean>(true);

    selectedTeam = output<ITeam | undefined>();
    teamWon = output<void>();
    handScored = output<void>();
    scoreAdjusted = output<void>();

    public points: number = 0;
    public victories: number = 0;

    protected selectedIndex: number = 0;
    protected nextIndex: number | null = null;
    protected isTeamSelected: boolean = false;

    protected currentAnimation = '';
    protected nextAnimation = '';

    constructor(private dialog: MatDialog) {}

    protected get imagesArray(): ITeam[] {
      const value = this.teams();
      return Array.isArray(value) ? value : value ? [value] : [];
    }

    public resetPoints() {
      this.points = 0;
    }

    protected navigate (direction: number) {
      const arr = this.imagesArray;
      let newIndex = this.selectedIndex + direction;

      if (newIndex >= 0 && newIndex < arr?.length) this.nextIndex = newIndex;
      if (newIndex < 0) this.nextIndex = arr.length - 1;
      if (newIndex >= arr.length) this.nextIndex = 0;

      if (direction > 0) {
        this.currentAnimation = 'slide-out-left';
        this.nextAnimation = 'slide-in-right';
      } else {
        this.currentAnimation = 'slide-out-right';
        this.nextAnimation = 'slide-in-left';
      }
    }

    protected onAnimationEnd() {
      if (this.nextIndex !== null) {
        this.selectedIndex = this.nextIndex as number;
        this.nextIndex = null;
      }

      this.currentAnimation = '';
      this.nextAnimation = 'hidden';
    }

    protected onSelectTeam(team: ITeam) {
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
      this.points += this.trucoPoints();
      this.handScored.emit();

      if (this.points >= 12) {
        this.openWinDialog();
      }
    }

    protected removePoints() {
      if (this.points === 0) return;
      this.points -= 1;
      this.scoreAdjusted.emit();
    }

    private openWinDialog() {
      this.victories > 99999 ? this.victories = 0 : this.victories++;
      this.teamWon.emit();

      this.dialog.open(DialogWinComponent, {
        data: {
          team: this.teams(),
          playSounds: this.playSounds(),
        },
        backdropClass: 'dialog-backdrop',
        panelClass: 'transparent-dialog-panel'
      })
    }
}
