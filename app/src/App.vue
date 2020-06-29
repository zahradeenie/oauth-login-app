<template>
  <div class="container">
    <button @click="githubSignIn()">sign in</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    async githubSignIn() {
      try {
        const response = await axios("/login/github");
        // const res = response.json();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
