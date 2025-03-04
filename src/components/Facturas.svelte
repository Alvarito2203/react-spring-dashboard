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
      font-family: Arial, sans-serif;
    }
  
    h2 {
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
    }
  
    ul {
      list-style: none;
      padding: 0;
    }
  
    li {
      border: 1px solid #ccc;
      padding: 10px;
      margin-top: 10px;
      border-radius: 5px;
    }
  </style>
  
  <div class="container">
    <h2>Facturas Emitidas</h2>
    <ul>
      {#each facturasEmitidas as factura}
        <li>
          {factura.fecha} - {factura.emisor} - {factura.total}€
        </li>
      {/each}
    </ul>
  
    <h2>Facturas Recibidas</h2>
    <ul>
      {#each facturasRecibidas as factura}
        <li>
          {factura.fecha} - {factura.receptor} - {factura.total}€
        </li>
      {/each}
    </ul>
  </div>
  