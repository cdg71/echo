export const resultChartScript = () =>
  `
  /* eslint-disable */
// @ts-nocheck
(() => {
  // Données pour le graphique
  const data = {
    datasets: [
      {
        label: "21/06/2024 09:15",
        data: [
          { x: -0.5, y: -0.5, label: "Prudence" },
          { x: 0.5, y: -0.5, label: "Inquiétude" },
          { x: -0.5, y: 0.5, label: "Confiance" },
          { x: 0.5, y: 0.5, label: "Enthousiasme" },
        ],
        backgroundColor: "oklch(0.5686 0.255 257.57)",
        datalabels: {
          labels: {
            title: {
              color: "oklch(0.5686 0.255 257.57)",
            },
          },
        },
        pointRadius: 10,
        showLine: false,
      },
    ],
  };

  const config = {
    type: "scatter",
    data: data,
    options: {
      events: [],
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          min: -1,
          max: 1,
          ticks: {
            stepSize: 1,
            display: false,
          },
          title: {
            display: true,
            text: "Activation",
            font: {
              size: 16,
            },
          },
        },
        y: {
          type: "linear",
          position: "left",
          min: -1,
          max: 1,
          ticks: {
            stepSize: 1,
            display: false,
          },
          title: {
            display: true,
            text: "Valence",
            font: {
              size: 16,
            },
          },
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        datalabels: {
          align: "top",
          anchor: "end",
          font: {
            size: 14,
          },
          formatter: (value, context) => {
            return value.label;
          },
          color: "black", // Set the color of the data labels
        },
      },
    },
    plugins: [
      ChartDataLabels,
      {
        id: "backgroundText",
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          const width = chart.width;
          const height = chart.height;
          const textOptions = [
            { text: "Prudence", x: width * 0.25, y: height * 0.75 },
            { text: "Confiance", x: width * 0.25, y: height * 0.25 },
            { text: "Inquiétude", x: width * 0.75, y: height * 0.75 },
            { text: "Enthousiasme", x: width * 0.75, y: height * 0.25 },
          ];
          ctx.save();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "20px Arial";
          ctx.fillStyle = "rgba(128, 128, 128, 0.5)";
          textOptions.forEach((option) => {
            ctx.fillText(option.text, option.x, option.y);
          });
          ctx.restore();
        },
      },
    ],
  };

  const myQuadrantChart = new Chart(
    document.getElementById("myQuadrantChart"),
    config
  );
})();
`;
