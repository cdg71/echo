// paramétrage du sondage
export interface Survey {
  id: string;
  name: string;
  description: string;
  context: string;
  securityCode: string;
  created: number; // timestamp
  updated: number; // timestamp
  quiz: string[];
  snapshots: number[];
  position: string[];
  area: string[];
}

// Participants
export interface userId {
  id: string;
  surveyId: string;
  position: string;
  area: string;
}

// réponses
export interface response {
  id: string;
  surveyId: string;
  userId: string;
  answers: string[];
  created: number; // timestamp
}

// commentaires
export interface comment {
  id: string;
  surveyId: string;
  userId: string;
  message: string;
  created: number; // timestamp
}

export interface result {
  id: string;
  surveyId: string;
  detail: string; // json
  snapshot: string;
  created: number; // timestamp
  completed: number; // timestamp
}
