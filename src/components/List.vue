<template>
  <div class="hello">
    <div
      class="collection-add-title"
      @click="editTitle"
      v-show="collectionTitle.length === 0 && isEditingTitle === false"
    ></div>
    <div
      class="collection-title"
      @click="isEditingTitle = true"
      v-show="!isEditingTitle"
    >
      {{ collectionTitle }}
    </div>

    <div v-show="isEditingTitle">
      <input
        type="text"
        v-model="collectionTitle"
        @blur="doneEditingTitle"
        class="collection-title-input"
        ref="titleInput"
      />
    </div>
    <div v-show="!places"></div>
    <draggable
      v-model="places"
      :element="'ul'"
      :options="{
        delay: 100,
        touchStartThreshold: 3,
        animation: 250,
        handle: '.hours-graph'
      }"
      @start="drag = true"
      @end="onDragEnd"
      class="places"
    >
      <place
        v-for="(place, index) in places"
        :placeId="place"
        v-bind:key="index"
        :currentDay="currentDay"
        v-on:go-to-yesterday="goToYesterday"
        v-on:go-to-tomorrow="goToTomorrow"
      />
    </draggable>

    <div class="search-container">
      <vue-google-autocomplete
        id="map"
        class="form-control"
        placeholder="Add a Place"
        title="Add a Place"
        v-on:placechanged="addPlace"
        types="establishment"
        :enable-geolocation="true"
        ref="autocomplete"
      ></vue-google-autocomplete>

      <div class="bookmark-note">Bookmark this page to save your dashboard</div>

      <nav class="collection-links">
        <ul>
          <li v-for="(city, index) in cities" v-bind:key="index">
            {{ city.cityName }}
            <ul class="collection-city">
              <li
                v-for="(collection, index) in city.collections"
                v-bind:key="index"
              >
                <a
                  v-bind:href="
                    '/places/' +
                      collection.placeIds +
                      '?title=' +
                      collection.displayName
                  "
                  >{{ collection.displayName }}</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <a href="https://twitter.com/xxrobot" class="social-link">@xxRobot</a
      >&nbsp;
      <a href="https://github.com/xxrobot/whatspoppin" class="social-link"
        >GitHub</a
      >
    </div>
  </div>
</template>
<script>
import Place from "./Place.vue";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import draggable from "vuedraggable";

export default {
  name: "Places",
  components: {
    place: Place,
    VueGoogleAutocomplete,
    draggable
  },
  data() {
    return {
      places: [],
      currentDay: "",
      isTyping: false,
      collectionTitle: "",
      isEditingTitle: false,
      cities: [
        {
          cityName: "Vegas",
          collections: [
            {
              displayName: "Gay Bars",
              placeIds: [
                "ChIJ4_PwtofGyIARbPGqdKAIVqg",
                "ChIJ0WUydFHByIARke_VznhZuXM",
                "ChIJjRyfDa3FyIARXJ9Mi8poXDw",
                "ChIJiZSbAa3FyIAR1-VJHOeI60w",
                "ChIJ7RMVtf3EyIARW8scUrFqPGA",
                "ChIJ1Qpl0fzEyIARnHzKYOHk1uY"
              ]
            },
            {
              displayName: "Ramen",
              placeIds: [
                "ChIJgZSkprrGyIARb44_7rgbT7Q",
                "ChIJFW4uB77GyIAR2L9jh42VF38",
                "ChIJBxV89s3GyIARdRSRkZuiRDI",
                "ChIJc0pn2RzByIARixb07Ed0wfo",
                "ChIJiSV9azrEyIAR72KhZkJvKjE"
              ]
            },
            {
              displayName: "Costco",
              placeIds: [
                "ChIJ65oh-_LQyIARiKfmgHdipf4",
                "ChIJn5FUr0y-yIARfCWlUvOgWcI",
                "ChIJRVMwXurryIARfXySBa3wknY",
                "ChIJ68OMAkDNyIAR2IvcqiNWVc0"
              ]
            },
            {
              displayName: "Downtown Bars",
              placeIds: [
                "ChIJhU_yio_DyIARpQGpcw5ZS0k",
                "ChIJxU0e84_DyIARELiEw8h1n-w",
                "ChIJCeq4d33EyIARtUyOjvaNnfQ",
                "ChIJFVgScHXDyIARJMhG-JF5cIU",
                "ChIJyY-QApDDyIARQlMZbA6YYd0",
                "ChIJhUHRX5rqyIAR1NOZQG0bwqM",
                "ChIJ44w1UIXDyIAR4Gj6uVkFoPY",
                "ChIJddY3lprDyIAR8QYE97F2XPY",
                // Able Baker
                "ChIJI-7R1BPRyIARWArciDNbsSc"
              ]
            },
            {
              displayName: "Downtown Coffee",
              placeIds: [
                // Vesta
                "ChIJt3AWTYXDyIARcYXpVjOsvAU",
                // PublicUs
                "ChIJM7jaCHHDyIARPHMuFhyy8hI",
                // Makers & Finders
                "ChIJyY-QApDDyIARAuN4Vd8aYhQ",
                // Mothership
                "ChIJkbda4CXDyIARSGNPfnmbb-4"
              ]
            },
            {
              displayName: "Downtown Lunch",
              placeIds: [
                // Tacotarian
                "ChIJE7jV_vDDyIARmErr0TQTa-0",
                // D E Thai
                "ChIJr6G3MoXDyIARdhKCxXCjlZo",
                //PublicUs
                "ChIJM7jaCHHDyIARPHMuFhyy8hI",
                //Bronze Cafe at ReBar
                // "ChIJPyK6r3XDyIARJb01WQewoyc",
                // Cornish Pasty
                "ChIJCeq4d33EyIARtUyOjvaNnfQ",
                // Capriotties Sahara
                "ChIJBdLqqHXEyIARZ5K8Sz5w5ks",
                // Capriotties Regional Justic Center
                "ChIJpdu2w57DyIARAOQhegrBKkg"
              ]
            }
          ]
        },
        {
          cityName: "Austin",
          collections: [
            {
              displayName: "Torchy's Tacos",
              placeIds: [
                "ChIJh_3dRvu0RIYRLBSOysYanEY",
                "ChIJs0xtzooyW4YRkVD_-fc3JhI",
                "ChIJlVQKQ8pHW4YRnjH4ppBUFQE",
                "ChIJyXNZn9s5W4YRsN39PEkzP_w",
                "ChIJm_b1tV_KRIYRP8fuxEG-rDk",
                "ChIJ3fhWWeAsW4YRRAQLRAew5CY",
                "ChIJz4sPdQDKRIYRnfLvHUhLOgg",
                "ChIJg239z-m0RIYRp2mpN1qppiU",
                "ChIJazq3RmzLRIYRmkc3uz-VRYw",
                "ChIJHVQ9FmaoXIYR0HHxV16KFgc",
                "ChIJi1wGI9O0RIYRptZhcRFaglw",
                "ChIJuzq2ZpdLW4YRZ_qwsv7d0jM",
                "ChIJVd1o8OBJW4YR7Py7JSE6utk"
              ]
            },
            {
              displayName: "Torchy's Tacos again",
              placeIds: [
                "ChIJh_3dRvu0RIYRLBSOysYanEY",
                "ChIJs0xtzooyW4YRkVD_-fc3JhI",
                "ChIJlVQKQ8pHW4YRnjH4ppBUFQE",
                "ChIJyXNZn9s5W4YRsN39PEkzP_w",
                "ChIJm_b1tV_KRIYRP8fuxEG-rDk",
                "ChIJ3fhWWeAsW4YRRAQLRAew5CY",
                "ChIJz4sPdQDKRIYRnfLvHUhLOgg",
                "ChIJg239z-m0RIYRp2mpN1qppiU",
                "ChIJazq3RmzLRIYRmkc3uz-VRYw",
                "ChIJHVQ9FmaoXIYR0HHxV16KFgc",
                "ChIJi1wGI9O0RIYRptZhcRFaglw",
                "ChIJuzq2ZpdLW4YRZ_qwsv7d0jM",
                "ChIJVd1o8OBJW4YR7Py7JSE6utk"
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {},
  methods: {
    editTitle() {
      this.isEditingTitle = true;
      this.$refs.titleInput.focus();
    },
    doneEditingTitle() {
      this.isEditingTitle = false;
      this.$router.push({
        path: this.$route.path,
        query: { title: this.collectionTitle }
      });
    },
    collectionUrl(collection) {
      debugger;
      return "/places/" + collection.split(",");
    },
    onDragEnd() {
      // Send user to their newly ordered list
      var newParams = this.places.join(",");
      this.$router.push({ path: `/places/${newParams}` });
    },
    initPlaces() {
      if (this.$route.params && this.$route.params.places) {
        this.places = this.$route.params.places.split(",");
      }

      //Title
      if (this.$route.query && this.$route.query.title) {
        var title = this.$route.query.title;
        this.collectionTitle = title;
        document.title = title + " | Lunch Report";
      }
    },
    addPlace: function(addressData, placeResultData, id) {
      var newParams;
      if (typeof this.$route.params.places === "undefined") {
        newParams = placeResultData.place_id;
      } else {
        newParams = this.$route.params.places + "," + placeResultData.place_id;
      }

      // Should be this, but its not workin this.$refs.autocomplete.clear()
      document.getElementById(id).value = "";

      this.$router.push({ path: `/places/${newParams}` });
    },
    setCurrentDayToToday: function() {
      this.currentDay = this.moment().format("ddd");
    },
    goToYesterday: function() {
      this.currentDay = this.moment(this.currentDay, "ddd")
        .subtract(1, "day")
        .format("ddd");
    },
    goToTomorrow: function() {
      this.currentDay = this.moment(this.currentDay, "ddd")
        .add(1, "day")
        .format("ddd");
    }
  },
  mounted: function() {
    this.initPlaces();
    this.setCurrentDayToToday();
  },

  watch: {
    $route() {
      this.initPlaces();
    },
    collectionTitle() {
      document.title = this.collectionTitle + " | Lunch.report";
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
input[type="text"] {
  box-sizing: border-box;
  padding: 0.5rem;
  border-radius: 1px;
  border: 1px solid #ccc;
}

.social-link {
  font-size: 0.75rem;
  color: #757575;
  margin-top: 2rem;
}

.search-container {
  padding: 0 0.5rem;
}

.form-control {
  margin: 1rem 0;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: var(--input-text-background-color);
}

.bookmark-note {
  font-size: 0.75rem;
  color: #757575;
  margin-bottom: 3rem;
}

.collection-links {
  display: flex;
  justify-content: center;
}

.collection-add-title {
  height: 30px;
  width: 6rem;
  margin: 0 auto;
  border-radius: 2px;
  transition: background-color 1s;
}

.collection-add-title:hover {
  background-color: #eee;
}

.collection-city {
  display: block;
  margin-bottom: 1rem;
}

.collection-links a {
  position: relative;
  color: var(--text-secondary-color);
  text-decoration: none;
  font-size: 0.75rem;
  padding: 0 1rem;
  line-height: 1.25;

  &::before {
    content: "{ ";
    display: inline-block;
    padding-right: 0.25rem;
  }

  &::after {
    content: "} ";
    display: inline-block;
    padding-left: 0.25rem;
  }

  &:hover {
    text-decoration: underline;
  }
}
</style>
