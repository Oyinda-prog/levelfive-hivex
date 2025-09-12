<template>
  <div class="signup-wrapper">
    <div class="signup-container">

      <div class="signup-brand">
                <div class="m-3 mx-auto" title="Menu"  @click="menu" >
            <img src="../assets/hivex.png" alt="" width="70px" class="d-block" style="cursor: pointer;">
        </div>
        <h1>Join Our Social Network</h1>
        <p>Connect, share, and grow your network with friends around the world.</p>
      </div>

 
      <div class="signup-card">
        <div class="alert alert-primary" v-if="msg!==''">{{ msg }}</div>
        <h3 class="text-center mb-4">Create Your Account</h3>

        <form @submit.prevent="handleSubmit">
          <input type="text" placeholder="Full Name" v-model.trim="fullname" class="form-control mb-3">
          <input type="email" placeholder="Email Address" v-model.trim="email" class="form-control mb-3">
          <input type="text" placeholder="Phone Number" v-model.trim="phonenumber" class="form-control mb-3">
          <input type="password" placeholder="Password" v-model.trim="password" class="form-control mb-3">

          <button type="submit" class=" w-100 fw-bold">Sign Up</button>
        </form>

        <p class="text-center mt-3">
          Already have an account? 
          <router-link to="/login" class="fw-bold text-primary">Log In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      fullname: '',
      email: '',
      password: '',
      phonenumber: '',
      msg: ''
    };
  },
  methods: {
    handleSubmit() {
      const user = {
        fullname: this.fullname,
        email: this.email,
        password: this.password,
        phonenumber: this.phonenumber
      };
      axios.post('http://127.0.0.1:8000/api/createstudent', user)
        .then((res) => {
          if (res.data.status === '403') {
            this.msg = res.data.msg;
          } else if (res.data.status === '201') {
            this.msg = res.data.msg;
            setTimeout(() => {
              this.$router.push('/login');
              
            }, 3000);
          } else if (res.data.status === '200') {
            this.msg = res.data.msg;
          }
        })
        .catch((err) => {
          this.msg = err
        });
        setTimeout(() => {
          this.msg=''
        }, 3000);
    }
  }
};
</script>

<style scoped>
.signup-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #fffafb, #fff5f7);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}

.signup-container {
  display: flex;
  flex-wrap: wrap;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  max-width: 950px;
  width: 100%;
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.signup-brand {
  flex: 1 1 50%;
  background: #f5f9ff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.signup-brand .logo {
  width: 70px;
  margin-bottom: 20px;
}

.signup-brand h1 {
  font-size: 1.8rem;
  color: #004a99;
  margin-bottom: 10px;
}

.signup-brand p {
  font-size: 1rem;
  color: #555;
}
.signup-card {
  flex: 1 1 50%;
  padding: 40px;
}

input.form-control {
  padding: 12px;
  border-radius: 8px;
}

button {
  padding: 12px;
  border-radius: 8px;
}
@media (max-width: 768px) {
  .signup-container {
    flex-direction: column;
  }
  .signup-brand, .signup-card {
    flex: 1 1 100%;
    text-align: center;
    padding: 30px;
  }
  .signup-brand .logo {
    margin: 0 auto 20px;
  }
  button {
  padding: 12px;
  border-radius: 8px;
  background: linear-gradient(135deg, #ffe6f0, #ffb3d9);
  color: white;
  font-weight: bold;
  border: none;
  transition: all 0.3s ease;
}

button:hover {
  background: linear-gradient(135deg, #ffb3d9, #ff99c2);
  transform: scale(1.02);
}

}
</style>
