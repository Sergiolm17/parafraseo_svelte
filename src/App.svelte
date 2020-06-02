<script>
  import TextBox from "./components/TextBox.svelte";
  let input = "";
  let output = { output: "" };
  async function handleClick() {
    if (!input) return false;
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/http://parafraseo.herokuapp.com/",
      {
        method: "POST",
        body: JSON.stringify({
          text: input,
          number: 1
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    output = await response.json();
    console.log(output);
  }
  /*
  $: console.log("input", input);
  $: console.log("output", output);
*/
</script>

<style>
  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 50vh 1fr;
    min-height: 50vh;
  }
</style>

<div>
  <TextBox bind:value={input} />
  <TextBox bind:value={output.output} />
  <button on:click={handleClick}>Generar</button>
  {#if output.rute}
    <p>{output.rute.map(ele => ele.from)}</p>
  {/if}
</div>
