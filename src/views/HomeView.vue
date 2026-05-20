<template>
  <div class="home">
    <h1>Welcome to Distance Calculator</h1>
    <p>Use the navigation above to access the calculator or click button.</p>

    <router-link to="/calculator" class="button">Calculator</router-link>
  </div>
</template>

<style scoped>
.button {
  padding: 10px 20px;
  background: green;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.button:hover {
  background: greenyellow;
  color: black;
  transition: ease-in 0.3s;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
