<template>
  <div class="dashboard-container">
    <div v-if="isAdmin" class="profile-list">
      <h1>Perfiles de usuarios</h1>
      <div class="user-cards-container">
        <div v-for="user in allUsers" :key="user.id" class="user-card">
          <img :src="user.photoURL" class="profile-image" />
          <p><strong>Correo:</strong> {{ user.email }}</p>
          <p>
            <strong>Nombre:</strong> {{ user.firstName }} {{ user.lastName }}
          </p>
          <p><strong>Direccion:</strong> {{ user.address }}</p>
        </div>
      </div>
    </div>

    
    <div v-else-if="userData" class="profile-card">
      <h1>¡Bienvenido, {{userData.firstName}}!</h1>
      <div class="profile-container">
        
        <!-- <h1>Perfil de usuario</h1>
        <img :src="userData.photoURL" class="profile-image" />
        <p><strong>Correo:</strong> {{ userData.email }}</p>
        <p><strong>Nombre:</strong> {{ userData.firstName }} {{ userData.lastName }}</p>
        <p><strong>Direccion:</strong> {{ userData.address }}</p> -->
        <section class="threads-container">

          <div class="box-threads">
            <img :src="userData.photoURL" class="profile-image" />
            <input class="box-input" type="text" placeholder="Comienza un debate...">
          </div>

        </section>

        
        <!-- <button @click="manejarLogout" class="logout-button">Cerrar sesion</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {db} from '../firebase'

export default {
  name: "Dashboard",
  data() {
    return{
        userData: null,
        allUsers: [],
        isAdmin: false,
    }
  },

  computed: {
    ...mapGetters(["user"]),
  },

  methods: {
    ...mapActions(["logout"]),

    async manejarLogout() {
      try {
        await this.logout();

        this.$router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
  },

  watch: {
    user: {
        immediate: true,
        async handler(newUser) {
            if(newUser) {
                try {
                    const doc = await db.collection('users').doc(newUser.uid).get();

                    if(doc.exists) {
                        this.userData = doc.data()

                        this.isAdmin = this.userData.role === 'admin'

                        if(this.isAdmin) {
                            const snapshot = await db.collection('users').get()

                            this.allUsers = snapshot.docs.map(doc => ({
                                id: doc.id,
                                ...doc.data()
                            }))
                        }
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        }
    }
  }
};
</script>

<style scoped>
 .dashboard-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: radial-gradient(circle, #26133e, #0d031a);
  }
  .threads-container{
    width: 600px;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.25);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.75);
    padding: 20px;
    border-radius: 20px;
  }
  .box-threads{
    width: 100%;
    height: 60px;
    display: flex;
    gap:30px;
  }
  .box-input{
    width: 100%;
    background-color: transparent;
    border: none;
    color:#ccc;
    outline: none;
  }
  .profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin:5px;
  }
  .profile-list {
    background: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 100%;
  }
  
  h1 {
    font-size: 2rem;
    color: #ccc;
    margin-bottom: 20px;
  }
  
  .user-cards-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap; 
  }
  
  .user-card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 20px;
    margin: 10px;
    width: 200px; 
  }
  
  
  .logout-button {
    width: 100%;
    padding: 15px;
    background-color: #f44336;
    color: white;
    font-size: 1.1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }
  
  .logout-button:hover {
    background-color: #e53935;
  }
</style>