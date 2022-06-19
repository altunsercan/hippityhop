<template>
  <div>
    <style>
      body{
        font-family: monospace;
      }
      .rc{
        display:flex;justify-content:center;
      }

    </style>
    <div class="rc" style="margin-top:50%;">
      <img src="easter-bunny.png" style="transform:scale(8);image-rendering:pixelated"/>
    </div>
    <div class="rc" style="margin-top: 5rem">
      Redirecting...
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  mounted () {
    const currCmd: string =
      new URL(window.location.href).searchParams.get('search') ?? ''

    this.$parseAndExecuteQuery(currCmd)
  }
})
</script>
