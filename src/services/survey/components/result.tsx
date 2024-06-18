export const resultComponent = () => (
  <div class="w-full max-w-lg space-y-4 pt-5">
    <canvas
      id="myQuadrantChart"
      width="400"
      height="400"
      style=" width: auto !important; height: 100% !important;"
    ></canvas>
    <script src="/static/scripts/chart.js"></script>
    <script src="/static/scripts/result.js"></script>
  </div>
);

export const dummyComponent = () => {
  return (
    <div class=" max-w-lg space-y-4 pt-5 w-full prose">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <h2 class="card-title">
        Les usages de l'IA dans la Fonction Publique Territoriale en général.
      </h2>
      <p>
        Les répondants (DGS, DSI, DRH) se montrent enthousiastes quant à
        l'utilisation de l'IA dans les services publics territoriaux. Ils
        perçoivent un fort potentiel pour améliorer l'efficacité, transformer
        positivement les services et apporter de grandes améliorations. Les
        principales causes de cet enthousiasme semblent être les bénéfices
        attendus de l'IA, tels que :
      </p>
      <ol>
        <li>
          Amélioration de l'efficacité et de l'optimisation des services publics
          (gestion des ressources, réactivité, etc.)
        </li>
        <li>
          Aide à la prise de décision grâce à l'analyse avancée de données
        </li>
        <li>
          Personnalisation et adaptation des services aux besoins des citoyens
        </li>
        <li>
          Gestion intelligente des infrastructures urbaines (transports,
          énergie, etc.)
        </li>
        <li>Amélioration de la sécurité et de la surveillance</li>
      </ol>
    </div>
  );
};
