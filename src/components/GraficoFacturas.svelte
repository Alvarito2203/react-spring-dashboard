<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import { getFacturas } from "../lib/firebase";

  let ingresosGastosChart;
  let emitidasChart;
  let recibidasChart;
  let ingresosGastosCanvas;
  let emitidasCanvas;
  let recibidasCanvas;

  onMount(async () => {
    const emitidas = await getFacturas("facturas_emitidas");
    const recibidas = await getFacturas("facturas_recibidas");

    // Agrupar por mes
    let ingresos = agruparPorMes(emitidas);
    let gastos = agruparPorMes(recibidas);

    // Formatear datos para Chart.js
    const datos = Object.keys(ingresos).map((mes) => ({
      mes,
      ingreso: ingresos[mes] || 0,
      gasto: gastos[mes] || 0,
    }));

    ingresosGastosChart = new Chart(ingresosGastosCanvas, {
      type: "bar",
      data: {
        labels: datos.map(d => d.mes),
        datasets: [
          {
            label: "Ingresos",
            data: datos.map(d => d.ingreso),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
          },
          {
            label: "Gastos",
            data: datos.map(d => d.gasto),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    const emitidasData = agruparPorEmisor(emitidas);
    emitidasChart = new Chart(emitidasCanvas, {
      type: "pie",
      data: {
        labels: Object.keys(emitidasData),
        datasets: [{
          data: Object.values(emitidasData),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    const recibidasData = agruparPorReceptor(recibidas);
    recibidasChart = new Chart(recibidasCanvas, {
      type: "pie",
      data: {
        labels: Object.keys(recibidasData),
        datasets: [{
          data: Object.values(recibidasData),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  });

  function agruparPorMes(facturas) {
    return facturas.reduce((acc, factura) => {
      let mes = factura.fecha.slice(0, 7);
      acc[mes] = (acc[mes] || 0) + factura.total;
      return acc;
    }, {});
  }

  function agruparPorEmisor(facturas) {
    return facturas.reduce((acc, factura) => {
      let emisor = factura.emisor;
      acc[emisor] = (acc[emisor] || 0) + factura.total;
      return acc;
    }, {});
  }

  function agruparPorReceptor(facturas) {
    return facturas.reduce((acc, factura) => {
      let receptor = factura.receptor;
      acc[receptor] = (acc[receptor] || 0) + factura.total;
      return acc;
    }, {});
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center; /* Centrar el texto */
  }

  .chart-container {
    width: 100%;
    max-width: 300px;
    height: 300px;
    margin-bottom: 40px; /* Añadir margen entre las gráficas */
  }

  .chart-title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
  }

  .explicacion {
    text-align: center; /* Centrar el texto */
    margin-top: 20px;
    font-size: 16px;
    color: #000000;
  }

  .explicacion h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .explicacion p {
    font-size: 16px;
    color: #555;
  }
</style>

<div class="explicacion">
  <h2>Explicación de las Gráficas</h2>
  <p>Las gráficas muestran una comparación mensual entre los ingresos y los gastos de las facturas emitidas y recibidas, así como la distribución de las facturas emitidas y recibidas. Las barras verdes representan los ingresos, mientras que las barras rojas representan los gastos. En las gráficas de pastel, puedes ver la distribución de las facturas por emisor o receptor.</p>
</div>

<div class="container">
  <div class="chart-container">
    <div class="chart-title">Ingresos y Gastos Mensuales</div>
    <canvas bind:this={ingresosGastosCanvas}></canvas>
  </div>
  <div class="chart-container">
    <div class="chart-title">Distribución de Facturas Emitidas</div>
    <canvas bind:this={emitidasCanvas}></canvas>
  </div>
  <div class="chart-container">
    <div class="chart-title">Distribución de Facturas Recibidas</div>
    <canvas bind:this={recibidasCanvas}></canvas>
  </div>
</div>

