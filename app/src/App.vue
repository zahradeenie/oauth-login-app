<template>
  <div class="container">
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      clientId:
        "880555996596-sa59cbnaepk7qknt8cddg8uf52u5is5v.apps.googleusercontent.com",
      redirectUri: "http://localhost:8080"
    };
  },
  methods: {
    oauthSignIn() {
      const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

      const form = document.createElement("form");
      form.setAttribute("method", "GET");
      form.setAttribute("action", oauth2Endpoint);

      const params = {
        client_id:
          "880555996596-sa59cbnaepk7qknt8cddg8uf52u5is5v.apps.googleusercontent.com",
        redirect_uri: "http://localhost:8080",
        response_type: "token",
        scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
        include_granted_scopes: "true",
        state: "pass-through value"
      };

      for (let param in params) {
        const input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", param);
        input.setAttribute("value", params[param]);
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
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
