<template>
  <div class="error-page d-flex flex-column justify-content-center align-items-center">
    <h1 class="error-code">404</h1>
    <h2 class="error-message">Page Not Found</h2>
    <p class="error-desc">Sorry, the page you are looking for does not exist.</p>
    <button class="btn btn-primary mt-3" @click="$router.push('/')">Go Home</button>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.error-page {
  height: 100vh;
  width: 100%;
  text-align: center;
  color: white;
  background: linear-gradient(135deg, #ff80ab, #80d0ff, #a8ff78);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@keyframes gradientShift {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}

.error-code {
  font-size: 10rem;
  font-weight: bold;
  margin: 0;
}

.error-message {
  font-size: 2rem;
  margin: 10px 0;
}

.error-desc {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.btn-primary {
  background: linear-gradient(90deg, #ff80ab, #80d0ff);
  border: none;
  padding: 10px 25px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(90deg, #ff99c8, #99e0ff);
  transform: scale(1.05);
}
</style>
