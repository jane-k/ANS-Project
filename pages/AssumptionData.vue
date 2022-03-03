<template>
  <div>
    <main>
      <h1>기본 가정 자료</h1>
    </main>
    <div>
      <br /><br /><br />
      <button class="button-assumption">사업 기간</button>
      <button class="button2-assumption">성과 목표</button>
      <button class="button3-assumption">기타 가정</button>
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
.button-assumption {
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
.button-assumption:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button2-assumption {
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
.button2-assumption:hover {
  background-color: rgb(136, 171, 218);
}
</style>
<style type="text/css">
.button3-assumption {
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
.button3-assumption:hover {
  background-color: rgb(136, 171, 218);
}
</style>
