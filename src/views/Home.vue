<template>
  <div class="home">
    <DefaultPlaces />
  </div>
</template>

<script>
// @ is an alias to /src
import DefaultPlaces from "@/components/DefaultPlaces.vue";

export default {
  name: "home",
  components: {
    DefaultPlaces
  }
};
</script>
