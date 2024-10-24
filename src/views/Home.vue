<template>
  <div class="home-container">
    <div class="content">
      <h1>Bienvenido a la App</h1>
      <div class="button-group">
        <router-link to="/login" class="login-button">Iniciar Sesión</router-link>
        <router-link to="/register" class="register-button">Registrarse</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Home'
};
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  background-color: #f0f2f5;
}

.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.content {
  text-align: center;
  background: #fff;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  color: #777;
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px; 
}

.login-button, .register-button {
  padding: 15px 30px;
  font-size: 1.1rem;
  text-transform: uppercase;
  border-radius: 30px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.login-button {
  background-color: #4CAF50;
  color: white;
}

.login-button:hover {
  background-color: #45a049;
}

.register-button {
  background-color: #2196F3;
  color: white;
}

.register-button:hover {
  background-color: #1e88e5;
}
</style>