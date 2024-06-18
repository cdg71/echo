/* eslint-disable */
// @ts-nocheck
(() => {
  // Données pour le graphique
  const data = {
    datasets: [
      {
        label: "21/06/2024 09:15",
        data: [
          { x: 0.5, y: 0.5, name: "Point 1" },
          { x: 0.5, y: 1.5, name: "Point 2" },
          { x: 1.5, y: 0.5, name: "Point 3" },
          { x: 1.5, y: 1.5, name: "Point 4" },
        ],
        backgroundColor: "oklch(0.5686 0.255 257.57)",
        pointRadius: 10,
        showLine: false,
      },
      {
        label: "21/06/2024 12:13",
        data: [
          { x: 0.25, y: 0.25, name: "Point A" },
          { x: 0.25, y: 1.75, name: "Point B" },
          { x: 1.75, y: 0.25, name: "Point C" },
          { x: 1.75, y: 1.75, name: "Point D" },
        ],
        backgroundColor: "oklch(0.599398 0.191515 335.171)",
        pointRadius: 10,
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
          min: 0,
          max: 2,
          ticks: {
            stepSize: 1,
            display: false,
          },
          title: {
            display: true,
            text: "Valence",
            font: {
              size: 20, // Increase font size of the axis title
            },
          },
        },
        y: {
          type: "linear",
          position: "left",
          min: 0,
          max: 2,
          ticks: {
            stepSize: 1,
            display: false,
          },
          title: {
            display: true,
            text: "Activation",
            font: {
              size: 20, // Increase font size of the axis title
            },
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.raw.name;
            },
          },
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
            { text: "Inquiétude", x: width * 0.25, y: height * 0.75 },
            { text: "Prudence", x: width * 0.25, y: height * 0.25 },
            { text: "Confiance", x: width * 0.75, y: height * 0.75 },
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

  document
    .getElementById("myQuadrantChart")
    .addEventListener("pointerdown", (event) => {
      const points = myQuadrantChart.getElementsAtEventForMode(
        event,
        "nearest",
        { intersect: true },
        true
      );

      if (points.length) {
        const firstPoint = points[0];
        const datasetIndex = firstPoint.datasetIndex;
        const index = firstPoint.index;
        const dataset = myQuadrantChart.data.datasets[datasetIndex];
        const dataPoint = dataset.data[index];

        // alert(
        //   `Dataset: ${dataset.label}, Name: ${dataPoint.name}, x: ${dataPoint.x}, y: ${dataPoint.y}`
        // );

        if (dataPoint.name === "Point A")
          htmx.ajax("GET", "/dummy", {
            target: "#appshellContent",
            swap: "innerHTML",
          });
      }
    });
})();
