export const resultComponent = () => {
  return (
    <div class="w-full max-w-lg space-y-4 sm:mt-5">
      <div class="prose text-center">
        <h2>Résultats du sondage</h2>
      </div>

      <form class="join flex max-w-full">
        <select class="select select-secondary select-bordered join-item flex-grow">
          <option disabled selected>
            Données
          </option>
          <option>Sci-fi</option>
          <option>Drama</option>
          <option>Action</option>
        </select>
        <select class="select select-secondary select-bordered join-item flex-grow">
          <option disabled selected>
            Territoire
          </option>
          <option>Sci-fi</option>
          <option>Drama</option>
          <option>Action</option>
        </select>
        <select class="select select-secondary select-bordered join-item flex-grow">
          <option disabled selected>
            Service
          </option>
          <option>Sci-fi</option>
          <option>Drama</option>
          <option>Action</option>
        </select>
      </form>

      <div>
        <div class="flex justify-center w-full py-2 gap-2">
          <a href="#item1" class="btn btn-xs md:btn-sm">
            1
          </a>
          <a href="#item2" class="btn btn-xs md:btn-sm">
            2
          </a>
          <a href="#item3" class="btn btn-xs md:btn-sm">
            3
          </a>
          <a href="#item4" class="btn btn-xs md:btn-sm">
            4
          </a>
        </div>
        <div class="carousel w-full">
          <div id="item1" class="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
              class="w-full h-56 rounded-lg"
            />
          </div>
          <div id="item2" class="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
              class="w-full h-56 rounded-lg"
            />
          </div>
          <div id="item3" class="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
              class="w-full h-56 rounded-lg"
            />
          </div>
          <div id="item4" class="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
              class="w-full h-56 rounded-lg"
            />
          </div>
        </div>
      </div>

      <canvas
        id="myQuadrantChart"
        width="400"
        height="400"
        style=" width: auto !important; height: 100% !important;"
      ></canvas>
      <div class="prose text-justify text-base-content">
        <div class="text-center">
          <h3>Analyse détaillée</h3>
        </div>

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
            Amélioration de l'efficacité et de l'optimisation des services
            publics (gestion des ressources, réactivité, etc.)
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

      <script src="/static/scripts/chart.js"></script>
      <script src="/static/scripts/chartjs-plugin-datalabels.js"></script>
      <script src="/static/scripts/result-chart.js"></script>
    </div>
  );
};
