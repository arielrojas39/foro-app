<template>
    <div class="login-container">
      <div class="form-content">
        <h1>Iniciar Sesión</h1>
  
        <form @submit.prevent="manejarLogin">
          <input v-model="email" type="email" placeholder="Correo" required class="input-field" />
          <input v-model="pass" type="password" placeholder="Contraseña" required class="input-field" />
  
          <button type="submit" class="login-button">Loguear</button>
        </form>
  
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    name: 'Login',
    data() {
      return {
          email: '',
          pass: ''
      }
    },
  
    computed: {
      ...mapGetters(['error'])
    },
  
    methods: {
      async manejarLogin() {
          if(this.email.trim() && this.pass.trim()) {
              try {
                  await this.login({email: this.email, pass: this.pass})
  
                  this.$router.push('/dashboard')
              } catch(error) {
                  console.error('Error al iniciar sesion', error)
              }
          } else {
              alert('Por favor, completa los inputs')
          }
      },
      ...mapActions(['login'])
  
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('../img/background.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  
  .form-content {
    backdrop-filter: blur(10px);
    padding: 40px;
    border-radius: 10px;
    text-align: center;
    width: 400px;
    box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.85);
  }
  
  h1 {
    font-size: 2.2rem;
    color: #ccc;
    margin-bottom: 20px;
  }
  
  .input-field {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    box-sizing: border-box;
  }
  
  .input-field:focus {
    outline: none;
    border-color: #2196F3;
  }
  
  .login-button {
    width: 100%;
    padding: 15px;
    background: radial-gradient(circle, #2575a0, #0d2c3d);
    font-size: 1.2rem;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    color: #ccc;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  
  .login-button:hover {
    background: radial-gradient(circle, #0d81c5, #091e2a);
    transform: scale(1.05);
  }
  
  .error-message {
    color: red;
    margin-top: 15px;
  }
  </style>