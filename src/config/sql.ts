import { password } from "bun";

export const dbSetup = [
  `-- Table for Survey
  CREATE TABLE IF NOT EXISTS Survey (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    context TEXT,
    positions TEXT,
    areas TEXT,
    questions TEXT,
    hash TEXT NOT NULL,
    createdAt INTEGER NOT NULL
  );`,
  `-- Table for Snapshot
  CREATE TABLE IF NOT EXISTS Snapshot (
    id TEXT PRIMARY KEY,
    surveyId TEXT,
    result TEXT,
    createdAt INTEGER NOT NULL,
    readyAt INTEGER,
    FOREIGN KEY (surveyId) REFERENCES Survey(id) ON DELETE CASCADE
  );`,
  `-- Table for User
  CREATE TABLE IF NOT EXISTS User (
    id TEXT PRIMARY KEY,
    surveyId TEXT,
    position TEXT,
    area TEXT,
    FOREIGN KEY (surveyId) REFERENCES Survey(id) ON DELETE CASCADE
  );`,
  `-- Table for ResponseSet
  CREATE TABLE IF NOT EXISTS ResponseSet (
    id TEXT PRIMARY KEY,
    surveyId TEXT,
    userId TEXT,
    responses TEXT,
    createdAt INTEGER NOT NULL,
    FOREIGN KEY (surveyId) REFERENCES Survey(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
  );`,
];

export const getSurveyTestDatasetStatement = async () => {
  const hash = await password.hash("test");
  return `
    INSERT INTO Survey (id, name, description, context, positions, areas, questions, hash, createdAt)
    VALUES (
        'test',
        'Sondage de test',
        'En pleine transformation numérique, l''IA est un sujet d''actualité brûlant qui suscite de nombreuses interrogations. Comment cette technologie pourrait-elle accompagner la modernisation de nos services publics et l’optimisation de nos ressources de manière inédite ? Est-ce un atout ou au contraire une menace ?', 
        '### Présentation des impacts des technologies liées à l''intelligence artificielle, notamment pour les collectivités territoriales\n\n**Idées clés :**\n- **Amélioration de l''efficacité des services publics :** L''IA permet une gestion optimisée des ressources, une meilleure allocation des budgets et une administration plus réactive.\n- **Amélioration de la prise de décision :** Les technologies d''IA fournissent des analyses de données avancées pour appuyer les décideurs dans les collectivités territoriales, offrant des insights sur les tendances et les besoins locaux.\n- **Personnalisation des services aux citoyens :** Grâce à l''IA, les services peuvent être adaptés de manière plus précise aux besoins des citoyens, améliorant ainsi leur qualité de vie et l''engagement communautaire.\n- **Gestion intelligente des infrastructures :** L''IA contribue à une gestion plus efficace des infrastructures urbaines (transports, énergie, eau), réduisant les coûts et augmentant la durabilité.\n- **Sécurité et surveillance :** L''utilisation de l''IA pour la surveillance et la sécurité permet une détection précoce des incidents et une réponse rapide, améliorant la sécurité publique.\n\n### Usages et limites des outils d''IA\n\n**Idées clés :**\n- **Applications diverses :** L''IA est utilisée dans divers domaines comme la santé, l''éducation, la gestion urbaine, et la sécurité. Elle facilite des tâches telles que la reconnaissance d''images, la prédiction des comportements et l''optimisation des processus.\n- **Limites éthiques :** L''utilisation de l''IA pose des questions éthiques concernant la vie privée, la discrimination algorithmique et la transparence des décisions prises par les systèmes automatisés.\n- **Fiabilité et biais :** Les outils d''IA peuvent être sujets à des biais dans les données et les algorithmes, ce qui peut conduire à des résultats erronés ou injustes.\n- **Dépendance technologique :** Une utilisation excessive de l''IA peut mener à une dépendance technologique, réduisant la capacité des humains à prendre des décisions autonomes.\n- **Coûts et complexité :** L''implémentation des technologies d''IA peut être coûteuse et complexe, nécessitant des investissements importants en formation et en infrastructure.\n\n### Adaptation de ces technologies au contexte territorial\n\n**Idées clés :**\n- **Approche contextualisée :** L''adoption de l''IA doit être adaptée aux spécificités locales, prenant en compte les particularités socio-économiques et culturelles de chaque territoire.\n- **Engagement communautaire :** La mise en œuvre de l''IA doit inclure une consultation et une participation active des citoyens pour assurer une acceptation et une légitimité des initiatives.\n- **Formation et sensibilisation :** Il est crucial de former les agents territoriaux et d''informer les citoyens sur les bénéfices et les limites de l''IA pour garantir une utilisation efficace et responsable.\n- **Développement d''infrastructures locales :** Les territoires doivent investir dans les infrastructures technologiques locales pour soutenir le déploiement et l''entretien des solutions d''IA.\n- **Évaluation continue :** Il est essentiel de mettre en place des mécanismes d''évaluation et d''ajustement pour assurer que les technologies d''IA restent pertinentes et bénéfiques pour les collectivités locales.',
        'DGS;DSI;DRH',
        'MBA;Le Grand Chalon;CUCM',
        'code-1;libellé de question 1\ncode-2;libellé de question 2',
        '${hash}',
        '1717165982427'
    );
`;
};
