<template>
  <div id="app">
    <div class="title-container">
      <div class="hidden-balance">✕</div>
      <a href="/" class="title">
        <h1>Lunch.report</h1>
      </a>

      <a href="/places" class="clear-places title">✕</a>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
.hidden-balance {
  opacity: 0;
  margin-right: 1rem;
}
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

:root {
  --page-background-color: #fff;

  --text-primary-color: #2c3e50;
  --text-secondary-color: #757575;
  --place-card-background-color: #fff;
  --progressbar-background-color: #fcfcfc;
  --progressbar-hover-background-color: #f5f5f5;

  --hour-am-background-color: ;
  --hour-am-text-color: ;
  --hour-pm-background-color: #f9f9f9;
  --hour-pm-text-color: ;

  --input-text-background-color: #fff;
  --input-text-color: ;

  --pac-container-background: #fff;
  --pac-item--border: #363636;
  --pac-container-text-color: ;
  --pac-query: #000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --page-background-color: #000;

    --text-primary-color: #d8d5d1;
    --text-secondary-color: #959595;
    --place-card-background-color: #000;
    --progressbar-background-color: #0a0a0a;
    --progressbar-hover-background-color: #252525;

    --hour-am-background-color: #191919;
    --hour-am-text-color: #757575;
    --hour-pm-background-color: #000;
    --hour-pm-text-color: #757575;

    --input-text-background-color: #000;
    --input-text-color: #000;

    --pac-container-background: var(--page-background-color);
    --pac-item--border: #252525;
    --pac-container-text-color: ;
    --pac-query: var(--text-primary-color);

    --input-text-color: var(--text-primary-color);
  }

  .place {
    background-color: var(--place-card-background-color);
  }

  input {
    color: var(--input-text-color);
  }
}

body {
  font-size: 16px;
  line-height: 1.25;
  background-color: var(--place-card-background-color);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-primary-color);
}

.title,
.title:visited {
  display: inline-block;
  text-decoration: none;
  color: var(--text-primary-color);
}

.clear-places {
  margin-left: 1rem;
  opacity: 0;
  transition: opacity 0.5s ease;
  position: relative;
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-container:hover .clear-places {
  opacity: 1;
}

.clear-places:hover:after {
  content: "CLEAR ALL";
  position: absolute;
  display: block;
  font-size: 0.65rem;
  width: 69px;
  line-height: 20px;
  top: 0;
  left: 1rem;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
