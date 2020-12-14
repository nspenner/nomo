<template>
  <button v-on:click="$emit('toggle-play')">
    <svg
      v-if="playing"
      xmlns="http://www.w3.org/2000/svg"
      class="button"
      viewBox="0 0 512 512"
    >
      <title>Stop Circle</title>
      <path
        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 288H176V176h160z"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="button"
      viewBox="0 0 512 512"
    >
      <title>Play Circle</title>
      <path
        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-56 296V168l144 88z"
      />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    playing: Boolean,
    handleClick: Function,
  },
};
</script>

<style scoped>
button {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
}

.button {
  height: 192px;
  width: 192px;
  color: var(--text-color-primary);
  fill: var(--text-color-primary);
  cursor: pointer;
}
</style>
