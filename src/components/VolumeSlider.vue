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

.vue-slider-dot-handle {
  box-shadow: none;
  background-color: var(--background-color);
  border: 1px solid var(--form-border-color);
}

.vue-slider-dot-handle-focus {
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
}

.vue-slider-rail {
  background-color: rgba(56, 39, 5, 0.17);
}
</style>
