<template>
    <div class="container">
      
      <ul class="wrapper-list">
        <li v-for="post in posts" :key="post.id"> 
            <div class="post">
                <img :src="post.user.photoURL" alt="Foto de perfil" /> 
                <div class="info-post">
                    <div class="user-data">
                        <p class="full-name">{{ post.user.firstName }} {{ post.user.lastName }}</p> 
                        <p class="email">{{ post.user.email }}</p> 
                        <p>{{ post.date }}</p> 
                    </div>
                    <p class="content">{{ post.content }}</p> 
                </div>
            </div>
            <hr class="separator">
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  // import { db } from '@/firebase';
  import { mapState, mapActions } from 'vuex';
  
  export default {
    // data() {
    //   return {
    //     posts: []
    //   };
    // },
    computed:{
        ...mapState(['posts'])
    },
    // async created() {
    //   await this.fetchPosts();
    // },
    created() {
      this.fetchPosts();
    },
    methods: {
        ...mapActions(['fetchPosts']),
        // async fetchPosts() {
        //     try { 
        //         const postsSnapshot = await db.collection('posts').get(); 
        //         const postsArray = []; 
        //         for (const doc of postsSnapshot.docs) {
        //             const postData = doc.data(); 
        //             const userId = postData.idUser; 
        //             const date = postData.createdAt
                    
        //             const userDoc = await db.collection('users').doc(userId).get(); 
        //             if (userDoc.exists) {
        //                 const userData = userDoc.data(); 
        //                 postsArray.push({
        //                     id: doc.id, 
        //                     content: postData.content, 
        //                     date: date, 
        //                     user: {
        //                         firstName: userData.firstName, 
        //                         lastName: userData.lastName, 
        //                         email: userData.email, 
        //                         photoURL: userData.photoURL 
        //                     } 
        //                 }); 
                    
        //             }else {
        //                 console.error(`No se encontró el usuario con ID: ${userId}`); 
        //             }
        //             this.posts = postsArray; 
        //             console.log()
        //         }
        //     }catch (error) {
        //     console.error("Error al obtener los posts:", error);
        //     }
        // }
    }
  };
  </script>
  
<style scoped>
   .container{
    flex: 1; 
    overflow-y: auto; 
    border:1px solid #8887878f;
    border-top: none;
    border-bottom: none;
    /* Oculta la barra de desplazamiento */ 
    scrollbar-width: none; /* Firefox */ 
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }
  .wrapper-list{
    display: flex;
    flex-direction: column;
  }
  img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
 
  .post{
    display: flex;
    flex-direction: row;
    gap:20px;
    margin:20px 20px;
  }
  .info-post{
    display: flex;
    flex-direction: column;
    gap:10px;
  }
  .user-data{
    display: flex;
    flex-direction: row;
    gap:10px;
  }
  .full-name{
    color: white;
    font-weight: 900;
  }
  .email{
    color:#98989890;
  }
  .content{
    text-align: start;
    color: white;
  }
  hr.separator{
    border: 1px solid#8887878f;
  }
  
</style>