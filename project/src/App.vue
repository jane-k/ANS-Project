<template>
  <div>
    <h1> ANS 경제성 분석 </h1>
  </div>
  <div>
    <br><br><br><br>
    <button class="button"
          onclick='alert("안녕하세요")'>
      Data Input &amp; View
    </button>
    <button class="button2"
          onclick='alert("안녕하세요")'>
      Analysis
    </button>
    <button class="button3"
          onclick='alert("안녕하세요")'>
      Review &amp; Report
    </button>
  </div>
  <div>

  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
    return {
      Data: '자료입력 및 확인',

    }
  },
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style type="text/css">
.button {
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
    height: 100px;
    font-size: 1rem;
    text-align: center;
    color: #2c3e50;
    background-color: rgb(174, 204, 243);
    top: 370px;
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
    height: 100px;
    font-size: 1rem;
    text-align: center;
    color: #2c3e50;
    background-color: rgb(174, 204, 243);
    top: 545px;
    right: 100px;
    position: absolute;
}
.button3:hover {
    background-color: rgb(136, 171, 218);
}
</style>