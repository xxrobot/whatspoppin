<template>
    <div>

    </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      defaultPlaces: [
        // name: "Charlie's",
        'ChIJ4_PwtofGyIARbPGqdKAIVqg',

        // name: 'Phoenix Bar',
        'ChIJ0WUydFHByIARke_VznhZuXM',

        // name: 'Piranha Nightclub',
        'ChIJjRyfDa3FyIARXJ9Mi8poXDw',

        // name: 'Quadz',
        'ChIJiZSbAa3FyIAR1-VJHOeI60w',

        // name: 'The Garage',
        'ChIJ7RMVtf3EyIARW8scUrFqPGA',

        // name: "Hamburger Mary's",
        'ChIJ1Qpl0fzEyIARnHzKYOHk1uY',

        // name: 'Las Vegas Eagle',
        // 'ChIJoWGOKzTFyIARpTHBPbAaVDA'
      ]
    }
  },
  methods: {
  },
  mounted: function () {
    var arr = this.defaultPlaces.join(',')
    this.$router.push({ path: `/places/${arr}?title=Vegas%20Gay%20Bars` })
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
