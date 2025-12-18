import {ITeam} from './team.model';

export interface IMatchState {
  isMatchInProgress: boolean;
  leftTeam?: ITeam;
  rightTeam?: ITeam;
  leftTeamStats?: {
    points: number;
    victories: number;
  };
  rightTeamStats?: {
    points: number;
    victories: number;
  };
}
