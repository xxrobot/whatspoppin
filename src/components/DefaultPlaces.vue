<template>
  <div></div>
</template>
<script>
export default {
  name: "DefaultPlaces",
  data() {
    return {
      defaultPlaces: [
        // name: "Charlie's",
        "ChIJ4_PwtofGyIARbPGqdKAIVqg",

        // name: 'Phoenix Bar',
        "ChIJ0WUydFHByIARke_VznhZuXM",

        // name: 'Piranha Nightclub',
        "ChIJjRyfDa3FyIARXJ9Mi8poXDw",

        // name: 'Quadz',
        "ChIJiZSbAa3FyIAR1-VJHOeI60w",

        // name: 'The Garage',
        "ChIJ7RMVtf3EyIARW8scUrFqPGA",

        // name: "The Garden",
        "ChIJ0YYEo-7DyIARzQ9iD13F9Q4"

        // name: 'Las Vegas Eagle',
        // 'ChIJoWGOKzTFyIARpTHBPbAaVDA'
      ]
    };
  },
  methods: {},
  mounted: function() {
    var defaultPlaces = this.defaultPlaces.join(",");
    this.$router.push({ path: `/places/${defaultPlaces}?title=Vegas%20Gay%20Bars` });
  }
};
</script>