<script>
  import Facturas from "./components/Facturas.svelte";
  import GraficoFacturas from "./components/GraficoFacturas.svelte";
</script>

<style>
  .main-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }
</style>

<div class="main-container">
  <h1>Dashboard de Facturas</h1>
  <Facturas />
  <GraficoFacturas />
</div>
