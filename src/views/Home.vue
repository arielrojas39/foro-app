<template>
  <div class="home-container">

    <div class="content">

      <div class="text-group">
        <h1>Bienvenido a la App</h1>
        <p>¿Tienes una opinión? ¿Una pregunta? ¿O simplemente curiosidad sobre lo que otros piensan? Iniciá un debate o sumate a uno existente para intercambiar ideas y recibir retroalimentación valiosa. En ForoDebate, cada comentario es una oportunidad para aprender y crecer.
          ¡Unite hoy y sé parte de conversaciones que importan!</p>
      </div>

      <div class="button-group">
        <router-link to="/login" class="button">Iniciar Sesión</router-link>
        <router-link to="/register" class="button">Registrarse</router-link>
      </div>

    </div>

    <div class="img-container"></div>

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
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url('../img/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.img-container{
  display: flex;
  min-width: 500px;
  height: 100vh;
  background-image: url('../img/debate-web.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 400px;
  backdrop-filter: blur(10px);
  box-shadow: 40px 40px 40px rgba(0, 0, 0, 0.85);
  border-radius: 50px;
  margin: 20px;
}
.text-group{
  display: flex;
  flex-direction: column;
  gap:20px;
  padding: 0px 100px;
}

h1 {
  font-size: 3rem;
  color:#ccc;
  margin-bottom: 10px;
  text-align: left;
}

p {
  font-size: 1rem;
  margin-bottom: 30px;
  text-align: left;
  color:#ccc;
}

.button-group {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px; 
  width: 100%;
  padding: 0px 100px;
}

.button{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 50px;
  color:#ccc;
  background: radial-gradient(circle, #2575a0, #0d2c3d);
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  padding: 10px 20px;
  font-weight: 600;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.button:hover {
  background: radial-gradient(circle, #0d81c5, #091e2a);
  transform: scale(1.05);
}
</style>