// paramétrage du sondage
export interface Survey {
  id: string;
  name: string;
  description?: string;
  context?: string;
  positions?: string; // csv
  areas?: string; // csv
  questions?: string; // csv
  hash: string; // hashed securityCode
  createdAt: number; // timestamp
}

// Instantané de sondage
export interface Snapshot {
  surveyId: string;
  result?: string; // format à définir : url vs json ?
  createdAt: number; // timestamp
  readyAt?: number; // timestamp
}

// Utilisateur
export interface Profile {
  id: string;
  surveyId: string;
  position: string;
  area: string;
}

// Jeu de réponses aux question d'un sondage
export interface Response {
  id: string;
  surveyId: string;
  userId: string;
  json: string; // csv: question;sentiment;commentaire
  createdAt: string;
}
