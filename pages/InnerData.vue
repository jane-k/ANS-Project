<template>
  <div>
    <main>
      <h1>내부 추정 자료</h1>
    </main>
    <div>
      <br /><br />
      <button class="button">운항시간</button>
      <button class="button2">운항편수</button>
      <button class="button3">운항비용</button>
      <button class="button4">여객 매출</button>
      <button class="button5">화물 매출</button>
      <button class="button6">기타 추정 자료</button>
    </div>
  </div>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}
</style>
<style type="text/css">
.button {
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
.button:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button2 {
  font-weight: bold;
  border: 2;
  line-height: 2.5;
  width: 200px;
  height: 50px;
  font-size: 1rem;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(174, 204, 243);
  top: 250px;
  right: 100px;
  position: absolute;
}
.button2:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button3 {
  font-weight: bold;
  border: 2;
  line-height: 2.5;
  width: 200px;
  height: 50px;
  font-size: 1rem;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(174, 204, 243);
  top: 330px;
  right: 100px;
  position: absolute;
}
.button3:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button4 {
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
  top: 410px;
  right: 100px;
}
.button4:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button5 {
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
  top: 490px;
  right: 100px;
}
.button5:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button6 {
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
  top: 570px;
  right: 100px;
}
.button6:hover {
  background-color: rgb(136, 171, 218);
}
</style>
