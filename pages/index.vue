<template>
  <div>
    <main>
      <h1>ANS 경제성 분석</h1>
    </main>
    <br /><br /><br />
    <NuxtLink to="/Data">
      <button class="button-main">Data Input &amp; View</button>
    </NuxtLink>
    <button class="button2-main">Analysis</button>
    <button class="button3-main">Review &amp; Report</button>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  components: {},
};
</script>

<style>
main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style type="text/css">
.button-main {
  font-weight: bold;
  border: 2;
  line-height: 2.5;
  width: 200px;
  height: 100px;
  font-size: 1rem;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(174, 204, 243);
  position: absolute;
  right: 100px;
}
.button-main:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button2-main {
  font-weight: bold;
  border: 2;
  line-height: 2.5;
  width: 200px;
  height: 100px;
  font-size: 1rem;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(174, 204, 243);
  top: 370px;
  right: 100px;
  position: absolute;
}
.button2-main:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button3-main {
  font-weight: bold;
  border: 2;
  line-height: 2.5;
  width: 200px;
  height: 100px;
  font-size: 1rem;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(174, 204, 243);
  top: 545px;
  right: 100px;
  position: absolute;
}
.button3-main:hover {
  background-color: rgb(136, 171, 218);
}
</style>
