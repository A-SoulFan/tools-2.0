<template>
  <div class="app">
    ASF
    <div class="route-view">
      <router-view />
    </div>
  </div>
</template>

<style>
@font-face {
  font-family: "OPPOSan-M";
  src: url("./assets/font/OPPOSans-M.woff2");
  font-weight: normal;
  font-style: normal;
}
.app {
  font-family: "OPPOSan-M", Microsoft Yahei, Times, serif;
}
.route-view {
  padding: 0 5.83vw;
}
</style>
