<template>
  <div class="wrapper">
    <div class="container text-center">

  
      <img src="../assets/first.jpg" alt="Social" class="hero-image mb-4" />

      
      <h1 class="title">Welcome to HiveX</h1>
      <p class="subtitle">Your place to share, connect, and grow.</p>
      <p class="description mb-4">
        Step into a space where every conversation matters, 
        every connection counts, and your voice finds a community.
      </p>

      
  <div class="">
  <router-link to="/register" class="btn btn-primary  mt-5 me-3" >Join Now</router-link>
    <router-link to="/login" class="btn btn-primary  mt-5" >Login</router-link>
    </div>
      
    </div>
  </div>
</template>


<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa, #e3f2fd);
  padding: 20px;
  flex-direction: column;
}
.hero-image {
  width: 280px;
  height: 280px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}
.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #222;
}

.subtitle {
  font-size: 1.3rem;
  color: #555;
}

.description {
  font-size: 1rem;
  color: #666;
  max-width: 500px;
  margin: auto;
}
.btn-dark {
  border-radius: 30px;
  padding: 0.6rem 1.5rem;
}
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  .hero-image {
    width: 220px;
    height: 220px;
  }
}
</style>
