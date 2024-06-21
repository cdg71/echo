import { t, type Static } from "elysia";

export const ChartDataset = t.Array(
  t.Object({
    label: t.String(),
    x: t.Number(),
    y: t.Number(),
  })
);
export type ChartDataset = Static<typeof ChartDataset>;

export const resultChartScript = (props: {
  selectedDataset: ChartDataset;
  otherDataset: ChartDataset;
}) => {
  return `
(() => {
  // Données pour le graphique
  const data = {
    datasets: [
      {
        label: "selectedDataset",
        data: ${JSON.stringify(props.selectedDataset)},
        backgroundColor: "oklch(0.5686 0.255 257.57)",
        pointRadius: 12,
        showLine: false,
      },
      {
        label: "otherDataset",
        data: ${JSON.stringify(props.otherDataset)},
        backgroundColor: "oklch(0.418869 0.053885 255.825)",
        pointRadius: 12,
        showLine: false,
      },
    ],
  };

  const config = {
    type: "scatter",
    data: data,
    options: {
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
          enabled: true,
          callbacks: {
            label: function (context) {
              return context.raw.label; // Return only the point label
            },
          },
          padding: 10, // Add padding inside the tooltip
          caretPadding: 10, // Add padding between the tooltip and the caret
          position: 'nearest', // Ensure the tooltip stays near the point
          xAlign: 'center', // Align the tooltip horizontally
          yAlign: 'center', // Align the tooltip vertically
          intersect: true, // Tooltip will only appear when hovering directly over a point
        },
        legend: {
          display: false,
        },
      },
    },
    plugins: [
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
};
