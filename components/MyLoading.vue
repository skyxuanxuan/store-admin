<template>
  <div class="loading-overlay" style="top: 0px">
    <div class="bounce-loader">
      <div class="bounce1" />
      <div class="bounce2" />
      <div class="bounce3" />
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  transition: visibility 0s ease-in-out 0.5s, opacity 0.5s ease-in-out;
  background: #f2f0ee;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 50;
}

.bounce-loader {
  transition: all 0.2s;
  margin: -9px 0 0 -35px;
  text-align: center;
  width: 70px;
  left: 50%;
  position: absolute;
  top: 50%;
  z-index: 10000;
}

.bounce-loader .bounce1,
.bounce-loader .bounce2,
.bounce-loader .bounce3 {
  animation: 1.4s ease-in-out 0s normal both infinite running bouncedelay;
  background-color: #9b6e57;
  border-radius: 100%;
  box-shadow: 0 0 20px 0 rgb(0 0 0 / 30%);
  display: inline-block;
  height: 18px;
  width: 18px;
}

.bounce-loader .bounce1 {
    animation-delay: -0.32s;
}

.bounce-loader .bounce2 {
    animation-delay: -0.16s;
}

@keyframes bouncedelay {
  0%,
  80%,
  to {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
