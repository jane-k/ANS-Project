<template>
  <div>
    <main>
      <h1>데이터 분석</h1>
    </main>
    <div>
      <br /><br /><br />
      <NuxtLink to="/Data">
        <button class="button-analysis">데이터 입력 및 확인</button>
      </NuxtLink>
      <button class="button2-analysis">데이터 분석</button>
      <NuxtLink to="/">
        <button class="button3-analysis">Return</button>
      </NuxtLink>
    </div>
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
.button-analysis {
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
.button-analysis:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button2-analysis {
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
.button2-analysis:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button3-analysis {
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
.button3-analysis:hover {
  background-color: rgb(136, 171, 218);
}
</style>
