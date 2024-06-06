// paramétrage du sondage
export interface Survey {
  id: string;
  name: string;
  description?: string;
  context?: string;
  positions?: string[];
  areas?: string[];
  hash: string; // hashed securityCode
  createdAt: number; // timestamp
}

// Instantané de sondage
export interface Snapshot {
  surveyId: string;
  createdAt: number; // timestamp
}

// Utilisateur
export interface User {
  id: string;
  surveyId: string;
  position: string;
  area: string;
}

// Question d'un sondage
export interface Question {
  id: string;
  surveyId: string;
  label: string;
}

// Réponse à une question d'un sondage
export interface Response {
  id: string;
  questionId: string;
  userId: string;
  value: string;
  comment: string;
  createdAt: string; // Les réponses d'un utilisateur à un sondage sont groupées par date de création et forment un jeu de réponses
}

// Analyse des résultats d'un instantané, tel que renvoyé par l'IA
export interface Result {
  id: string;
  surveyId: string;
  snapshotId: string;
  data: string; // format JSON ; schéma à définir
  createdAt: number; // timestamp
  completedAt: number; // timestamp
}
