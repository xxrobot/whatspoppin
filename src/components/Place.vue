<template>
  <li
    class="place"
    v-bind:class="{'loading' : data.status === 'loading', 'loaded' : data.status !== 'loading'}"
  >
    <div>
      <div class="graph">
        <div
          v-for="(day, index) in data.week"
          class="day"
          v-show="currentDay == day.day"
          v-bind:key="index"
        >
          <div class="day-navigation">
            <button @click="$emit('go-to-yesterday')" class="change-day">◂</button>
            <div class="day-label">{{day.day}}</div>
            <div class="place-name-container">
              <span class="place-name">{{data.name}}</span>
              <span @click="removePlace(id)" class="remove-place">✕</span>
            </div>
            <button @click="$emit('go-to-tomorrow')" class="change-day">▸</button>
          </div>
          <div class="place-address">{{data.formatted_address}}</div>

          <div class="hours-graph">
            <!-- Good Data -->
            <div
              v-for="(hour, index) in day.hours"
              v-bind:key="index"
              class="hour"
              v-show="data.status === 'loading' || data.status==='ok'"
            >
              <div class="progressbar">
                <div
                  class="progressbar-fill now"
                  v-if="data.now && data.now.hour == hour.hour && today() == day.day"
                  v-bind:style="{ height: data.now.percentage + '%' }"
                ></div>
                <div class="progressbar-fill" v-bind:style="{ height: hour.percentage + '%' }"></div>
              </div>
              <div
                class="hour-label"
                v-bind:class="[ hour.hour >= 12 ? 'hour-pm': 'hour-am']"
              >{{hour.hour | twelveHour}}</div>
            </div>
            <!-- End Good Data -->
            <div class="daylight-gradient"></div>
          </div>
        </div>
        <!-- Bad Data -->
        <div class="day" v-show="data.status === 'error'">
          <div class="day-navigation">
            <div></div>

            <div class="place-name-container">
              <span class="place-name">{{data.name}}</span>
              <span @click="removePlace(id)" class="remove-place">✕</span>
            </div>
            <div></div>
          </div>
          <div class="place-address">{{data.formatted_address}}</div>

          <div class="hours-none">
            <div class="hours-error">{{data.message}}</div>
            <div class="place-remove" @click="removePlace(id)">Remove Place?</div>
          </div>
        </div>

        <!-- End Bad Data -->
      </div>
    </div>
  </li>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Place",
  props: {
    placeId: {
      type: String,
      required: true
    },
    currentDay: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      apiURL: "https://pacific-waters-66631.herokuapp.com/api/place/",
      isLoaded: false,
      data: {
        name: " ",
        formatted_address: " ",
        status: "loading",
        week: [
          {
            day: "Sun",
            hours: [
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 },
              { percentage: 0 }
            ]
          },
          {
            day: "Mon",
            hours: [
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {}
            ]
          },
          {
            day: "Tue",
            hours: [
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {}
            ]
          },
          {
            day: "Wed",
            hours: [
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {}
            ]
          },
          {
            day: "Thu",
            hours: [
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {}
            ]
          },
          {
            day: "Fri",
            hours: [
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {}
            ]
          },
          {
            day: "Sat",
            hours: [
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {}
            ]
          }
        ]
      },
      isTyping: false,
      childLoading: false
    };
  },
  computed: {
    day(){
      return this.currentDay
    },
    id() {
      return this.placeId;
    }
  },
  methods: {
    removePlace: function(id) {
      var arr = this.$route.params.places.split(",");
      var index = arr.indexOf(id);
      arr.splice(index, 1);
      arr.join(",");
      this.$router.push({ path: `/places/${arr}` });
    },
    getPlace: function() {
      const vm = this;

      axios
        .all([axios.get(this.apiURL + this.id)])
        .then(
          axios.spread(record => {
            if (typeof record.data.week != "undefined") {
              record.data.week.forEach(function(day) {
                var pad = 24 - day.hours.length;

                if (day.hours.length) {
                  var last = day.hours[day.hours.length - 1].hour;

                  if (day.hours.length != 24) {
                    // Something is awry! this needs to be 24

                    // omg why was this so hard
                    for (var i = 0; i < pad; i++) {
                      if (last + i >= 23) {
                        last = 0;
                        day.hours.push({ hour: last + i });
                      } else {
                        if (i == 0) {
                          i = 1;
                        }
                        day.hours.push({ hour: last + i });
                      }
                    }
                  }
                  day.hours.rotate(-day.hours[18].hour);
                }
              });
            }

            // Save to results
            vm.data = record.data;
            vm.isLoaded = true;
          })
        )
        .catch(error => {
          vm.isLoaded = true;
          vm.childLoading = false;
          console.log("Fetch Error :-S", err);
        });
    },
    today: function() {
      return this.moment().format("ddd");
    },
  },
  mounted: function() {
    this.getPlace();
  },
  watch: {
    id(oldId, newId) {
      this.getPlace();
    }
  },
  filters: {
    twelveHour: function(hour) {
      //returns time in 12 hour clock

      if (hour === 0) return "☽";

      if (hour == 12) return "☼";

      if (!hour) return "";

      if (hour <= 12) return hour;

      if (hour > 12) {
        return hour - 12;
      }
    }
  }
};

Array.prototype.rotate = (function() {
  var unshift = Array.prototype.unshift,
    splice = Array.prototype.splice;

  return function(count) {
    var len = this.length >>> 0,
      count = count >> 0;

    unshift.apply(this, splice.call(this, count % len, len));
    return this;
  };
})();
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hours-graph,
.hours-none {
  margin-top: 1rem;
  position: relative;
}

.place-remove {
  cursor: pointer;
  text-decoration: underline;
}

.daylight-gradient {
  position: absolute;
  height: 1px;
  bottom: 1rem;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(218, 224, 237, 1) 1%,
    rgba(224, 238, 255, 1) 8%,
    rgba(241, 241, 241, 1) 47%,
    rgba(237, 223, 218, 1) 50%,
    rgba(133, 153, 173, 1) 58%,
    rgba(133, 153, 173, 1) 86%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
}

.loading .daylight-gradient{
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation: daylight-loading 2s;
  animation-iteration-count: infinite;
}

@media (prefers-reduced-motion: reduce) {
  .loading .daylight-gradient{
    animation: none;
  }
}

@keyframes daylight-loading {
  0% {
    background-position-x: -400px;
  }
  100% {
    background-position-x: 0;
  }
}

.places {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.place {
  padding: 1rem;
  flex-grow: 1;
  flex-basis: 100%;
  max-width: 400px;
  min-height: 191px;
  background-color: var(--place-card-background-color);
  border-radius: .25rem;
}

.progressbar {
  height: 100px;
  background-color: rgba(252, 252, 252, 1);
  border-radius: 2px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  overflow: hidden;
  margin: 0 2px;
  position: relative;
  transition: background-color 0.5s;
}

.loading .progressbar {
  background-color: rgba(252, 252, 252, 1);
}

.loaded .progressbar {
  background-color: var(--progressbar-background-color);
   transition: background-color 0s;
  
  &:hover{
    background-color: var(--progressbar-hover-background-color);
  }
}

.progressbar-fill {
  background-color: rgba(204, 204, 204, 0);
  border-radius: 2px;
  transition: background-color 2s;
}

.loaded .progressbar-fill {
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation: progress-bar-grow-up 0.5s;
  background-color: rgba(204, 204, 204, 1);
}

@keyframes progress-bar-grow-up {
  0% {
    height: 0;
  }
}

.progressbar-fill.now {
  background-image: -webkit-linear-gradient(#f50057 30%, #ff80ab 70%);
  background-size: 110% 300%;
  position: absolute;
  width: 100%;
  animation: livebar 2s ease-in-out infinite;
}

@keyframes livebar {
  0% {
    background-position: 0 0;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  55%,
  70% {
    background-position: 0 100%;
    opacity: 1;
  }
  100% {
    background-position: 0 100%;
    opacity: 0;
  }
}

.day {
  margin-bottom: 1rem;
}

/* Animation */

$elements: 24;
@for $i from 0 to $elements {
  .loading .hour:nth-child(#{$i + 1}) .progressbar {
    animation: loading 4s infinite;
    animation-delay: ($i/14) + s;
  }
}

@keyframes loading {
  0% {
    background-color: rgba(252, 252, 252, 1);
  }
  10% {
    background-color: rgba(252, 252, 252, 0.0);
  }
  // 50% {
  //   background-color: rgba(252, 252, 252, .3);
  // }
  // 85% {
  //   background-color: rgba(252, 252, 252, .30);
  // }
  100% {
    background-color: rgba(252, 252, 252, 1);
  }
}

.day-navigation {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 0.25rem;
}

.day-label {
  margin-bottom: 0.5rem;
  position: absolute;
  left: 1.25rem;
  top: 3px;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
}

.hours-graph {
  display: flex;
  justify-content: center;
}

.hour {
  min-height: 125px;
  width: calc(100% / 24);
}

.hour-label {
  font-size: 0.5rem;
  display: flex;
  height: 1rem;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ccc;
  margin-top: 0.5rem;
  user-select: none;
  opacity: 0;
  transition: opacity 0.5s;
}

.loaded .hour-label {
  opacity: 1;
}

.hour-am {
  color: var(--hour-am-text-color);
  background-color: var(--hour-am-background-color);
}

.hour-pm {
  color: var(--hour-pm-text-color);
  background-color: var(--hour-pm-background-color);
}

.place-name-container{
  display: flex;
  font-weight: bold;
  padding-left: 14px; /* offset close button*/
  opacity: 0;
  transition: opacity 0.5s;
}

.place-name {
  max-width: 261px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.loaded .place-name-container {
  opacity: 1;
}

.change-day {
  background-color: transparent;
  border: 0;
}

.remove-place {
  opacity: 0;
  cursor: pointer;
  margin-left: .5rem;
}

.place:hover .remove-place {
  opacity: 1;
}

.place-address {
  text-transform: uppercase;
  font-size: 0.65rem;
  color: var(--text-secondary-color);
}
</style>
