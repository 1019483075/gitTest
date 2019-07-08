<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <img :src="item.thumbnail_pic_s" class="img" />
        <div>{{ item.author_name }}</div>
        <div>{{ item.title }}</div>
        <div>{{ item.date }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    axios.get("/news/index").then(res => {
      console.log(res.data.data.articles);
      this.list = res.data.data.articles;
    });

    // axios.get("/news/detail").then(res => {
    //   console.log(res.data);
    // });
    // axios.get("/getUserInfo").then(res => {
    //   console.log(res);
    // });
    axios.get("/test").then(res => {
      console.log(res);
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.img {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
