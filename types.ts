
export enum MatchStatus {
  LIVE = 'LIVE',
  UPCOMING = 'UPCOMING',
  FINISHED = 'FINISHED'
}

export interface Team {
  name: string;
  code: string;
  flagUrl: string;
  score?: string;
  overs?: string;
}

export interface Match {
  id: string;
  title: string;
  venue: string;
  status: MatchStatus;
  teamA: Team;
  teamB: Team;
  lastUpdate: string;
  prediction?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface LiveUpdateResponse {
  text: string;
  sources: GroundingSource[];
}
