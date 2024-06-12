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
export interface User {
  id: string;
  surveyId: string;
  position: string;
  area: string;
}

// Jeu de réponses aux question d'un sondage
export interface ResponseSet {
  id: string;
  surveyId: string;
  userId: string;
  responses: string; // csv: question;sentiment;commentaire
  createdAt: string;
}
