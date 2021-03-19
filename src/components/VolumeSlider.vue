<template>
  <vue-slider v-model="value" width="100%"></vue-slider>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      value: 50,
    };
  },
};
</script>

<style>
.vue-slider-process {
  background-color: var(--text-color-primary);
}

.vue-slider-dot-tooltip-inner {
  background-color: var(--text-color-primary);
  border-color: var(--text-color-primary);
  color: var(--background-color);
}
</style>
