import {Component, inject, OnInit} from '@angular/core';
import {ITeam} from '../../models/team.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-win',
  imports: [],
  templateUrl: './dialog-win.component.html',
  styleUrls: ['./dialog-win.component.css']
})
export class DialogWinComponent implements OnInit {
    protected data = inject<ITeam>(MAT_DIALOG_DATA);
    protected audio = new Audio(`/audios/anthem/${this.data.simplifiedName}.mp3`);

    constructor(protected dialogRef: MatDialogRef<DialogWinComponent>) {}

    ngOnInit() {
      this.audio.currentTime = 0;
      this.audio.play()

      this.dialogRef.afterClosed().subscribe(() => {
        this.audio.pause();
        this.audio.currentTime = 0;
      });
    }

    protected close() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.dialogRef.close()
    }
}
