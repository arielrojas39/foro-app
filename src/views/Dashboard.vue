<template>
  <div class="dashboard-container">


    <!-- INTERFAZ ADMINISTRADOR -->

    <!-- <div v-if="isAdmin" class="profile-list">
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
    </div> -->

    <!-- <div class="profile-wrapper">
      <h1>¡Bienvenido, {{userData.firstName}}!</h1>
      <button @click="manejarLogout" class="logout-button">Cerrar sesion</button>
    </div> -->

    <!-- <div v-if="userData"> -->
      <!-- <h1>Perfil de usuario</h1>
      <img :src="userData.photoURL" class="profile-image" />
      <p><strong>Correo:</strong> {{ userData.email }}</p>
      <p><strong>Nombre:</strong> {{ userData.firstName }} {{ userData.lastName }}</p>
      <p><strong>Direccion:</strong> {{ userData.address }}</p> -->
    <!-- </div> -->



    <!-- INTERFAZ USUARIO -->

    <!-- <h1>¡Bienvenido, {{userData.firstName}}!</h1>
    <img :src="userData.photoURL" class="profile-image" />
    <p><strong></strong> {{ userData.firstName }} {{ userData.lastName }}</p>
    <button @click="manejarLogout" class="logout-button">Cerrar sesion</button> -->
    
    
      <div class="navegation">

        <div class="home-icon">
          <img src="../img/icons/home.png" alt="">
        </div>

        <div class="profile-icon">
          <img src="../img/icons/profile.png" alt="">
        </div>

      </div>

      <div class="main">

        <section class="threads-container">
          <!-- <img :src="userData.photoURL" class="profile-image" /> -->    
          <NewPost :userData="userData"/>      
        </section>

        <div class="post-list">
          <PostList :userData="userData"/>
        </div>
      </div>

      <div class="void">
        <div class="wrapper-info"></div>
        <div class="wrapper-info"></div>
      </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {db} from '../firebase'
import NewPost from "../components/NewPost.vue";
import PostList from "@/components/PostList.vue";

export default {
  name: "Dashboard",
  data() {
    return{
        userData: null,
        // allUsers: [],
        // isAdmin: false,
    }
  },
  components:{
    NewPost,
    PostList
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
    display: grid;
    grid-template-columns: 0.5fr 1.85fr 1.5fr;
    grid-template-rows: 1fr;
    grid-auto-columns: 1fr;
    grid-template-areas:
    "navegation main void";
    gap: 10px;
    grid-auto-flow: row;
    position: static;
    height: 100vh;
    background-color: #000000;
  }
  
  .navegation { 
    grid-area: navegation; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    gap:30px 0px;
  }
  
  .void { 
    grid-area: void; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:50px;
  }
  .wrapper-info{
    width: 400px;
    height: 250px;
    background-color: black;
    border: 1px solid #ccc;
    border-radius: 30px;
  }
  
  .main { 
    grid-area: main; 
    flex: 1; 
    overflow-y: auto; 
    border:1px solid #8887878f;
    border-top: none;
    border-bottom: none;
    /* Oculta la barra de desplazamiento */ 
    scrollbar-width: none; /* Firefox */ 
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }

  img{
    width: 50px;
    height: 50px;
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
  
  .logout-button {
    width: 100%;
    padding: 15px;
    background-color: #f44336;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .logout-button:hover {
    background-color: #e53935;
  }
</style>