<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import { getFacturas } from "../lib/firebase";
  
    let datos = [];
  
    onMount(async () => {
      const emitidas = await getFacturas("facturas_emitidas");
      const recibidas = await getFacturas("facturas_recibidas");
  
      // Agrupar por mes
      let ingresos = {};
      let gastos = {};
  
      emitidas.forEach((factura) => {
        let mes = factura.fecha.slice(0, 7);
        ingresos[mes] = (ingresos[mes] || 0) + factura.total;
      });
  
      recibidas.forEach((factura) => {
        let mes = factura.fecha.slice(0, 7);
        gastos[mes] = (gastos[mes] || 0) + factura.total;
      });
  
      // Formatear datos para D3
      datos = Object.keys(ingresos).map((mes) => ({
        mes,
        ingreso: ingresos[mes] || 0,
        gasto: gastos[mes] || 0,
      }));
  
      drawChart();
    });
  
    function drawChart() {
      const width = 600;
      const height = 300;
      const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  
      const svg = d3
        .select("#grafico")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
  
      const x = d3
        .scaleBand()
        .domain(datos.map((d) => d.mes))
        .range([margin.left, width - margin.right])
        .padding(0.1);
  
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(datos, (d) => Math.max(d.ingreso, d.gasto))])
        .nice()
        .range([height - margin.bottom, margin.top]);
  
      svg
        .append("g")
        .selectAll("rect.ingreso")
        .data(datos)
        .join("rect")
        .attr("class", "ingreso")
        .attr("x", (d) => x(d.mes))
        .attr("y", (d) => y(d.ingreso))
        .attr("height", (d) => y(0) - y(d.ingreso))
        .attr("width", x.bandwidth() / 2)
        .attr("fill", "green");
  
      svg
        .append("g")
        .selectAll("rect.gasto")
        .data(datos)
        .join("rect")
        .attr("class", "gasto")
        .attr("x", (d) => x(d.mes) + x.bandwidth() / 2)
        .attr("y", (d) => y(d.gasto))
        .attr("height", (d) => y(0) - y(d.gasto))
        .attr("width", x.bandwidth() / 2)
        .attr("fill", "red");
  
      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));
  
      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
    }
  </script>
  
  <!-- svelte-ignore css_unused_selector -->
  <style>
    #grafico {
      margin-top: 20px;
      text-align: center;
    }
  
    svg {
      border: 1px solid #ddd;
    }
  </style>
  
  <div id="grafico"></div>
  