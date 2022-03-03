<template>
  <main>
    <div>
      <h1>데이터 입력 및 확인</h1>
    </div>
    <div>
      <br /><br /><br />
      <NuxtLink to="/AssumptionData">
        <button class="button-data">가정 자료</button>
      </NuxtLink>
      <NuxtLink to="/InnerData">
        <button class="button2-data">내부 추정 자료</button>
      </NuxtLink>
      <button class="button3-data">외생 자료</button>
      <button class="button4-data">기초 자료</button>
      <button class="button5-data">전체보기</button>
    </div>
  </main>
</template>

<script>
export default {
  name: "MainPage",
  props: {
    msg: String,
  },
};
</script>

<style>
main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}
</style>
<style type="text/css">
.button-data {
  font-weight: bold;
  border: 2;
  line-height: 2.5;
  width: 200px;
  height: 50px;
  font-size: 1rem;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(174, 204, 243);
  position: absolute;
  right: 100px;
}
.button-data:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button2-data {
  font-weight: bold;
  border: 2;
  line-height: 2.5;
  width: 200px;
  height: 50px;
  font-size: 1rem;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(174, 204, 243);
  top: 270px;
  right: 100px;
  position: absolute;
}
.button2-data:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button3-data {
  font-weight: bold;
  border: 2;
  line-height: 2.5;
  width: 200px;
  height: 50px;
  font-size: 1rem;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(174, 204, 243);
  top: 360px;
  right: 100px;
  position: absolute;
}
.button3-data:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button4-data {
  font-weight: bold;
  border: 2;
  line-height: 2.5;
  width: 200px;
  height: 50px;
  font-size: 1rem;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(174, 204, 243);
  position: absolute;
  top: 450px;
  right: 100px;
}
.button4-data:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button5-data {
  font-weight: bold;
  border: 2;
  line-height: 2.5;
  width: 200px;
  height: 50px;
  font-size: 1rem;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(174, 204, 243);
  position: absolute;
  top: 540px;
  right: 100px;
}
.button5-data:hover {
  background-color: rgb(136, 171, 218);
}
</style>
