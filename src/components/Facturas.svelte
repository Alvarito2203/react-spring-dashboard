<script>
  import { onMount } from "svelte";
  import { getFacturas } from "../lib/firebase";

  let facturasEmitidas = [];
  let facturasRecibidas = [];

  onMount(async () => {
    facturasEmitidas = await getFacturas("facturas_emitidas");
    facturasRecibidas = await getFacturas("facturas_recibidas");
  });
</script>

<style>
  .container {
    padding: 20px;
    font-family: 'Roboto', sans-serif;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center; /* Centrar el texto */
  }

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-top: 20px;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    padding: 15px;
    margin-top: 10px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
    text-align: left; /* Alinear el texto a la izquierda dentro del elemento */
  }

  li:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .factura-info {
    display: flex;
    flex-direction: column;
  }

  .factura-fecha {
    font-size: 14px;
    color: #888;
  }

  .factura-emisor-receptor {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }

  .factura-total {
    font-size: 18px;
    font-weight: 600;
    color: #007bff;
  }

  .section-title {
    margin-bottom: 20px;
    border-bottom: 2px solid #007bff;
    display: inline-block;
    padding-bottom: 5px;
  }
</style>

<div class="container">
  <h2 class="section-title">Facturas Emitidas</h2>
  <ul>
    {#each facturasEmitidas as factura}
      <li>
        <div class="factura-info">
          <span class="factura-fecha">{factura.fecha}</span>
          <span class="factura-emisor-receptor">{factura.emisor}</span>
        </div>
        <span class="factura-total">{factura.total}€</span>
      </li>
    {/each}
  </ul>

  <h2 class="section-title">Facturas Recibidas</h2>
  <ul>
    {#each facturasRecibidas as factura}
      <li>
        <div class="factura-info">
          <span class="factura-fecha">{factura.fecha}</span>
          <span class="factura-emisor-receptor">{factura.receptor}</span>
        </div>
        <span class="factura-total">{factura.total}€</span>
      </li>
    {/each}
  </ul>
</div>