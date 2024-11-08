<template>
    <div class="container">
      
      <ul class="wrapper-list">
        <li v-for="post in posts" :key="post.id"> 
            <div class="post">

              <div class="wrapper-info">

                <div class="wrapper-img">
                  <img :src="post.user.photoURL" alt="Foto de perfil" /> 
                </div>
  
                <div class="wrapper-user-data">
                  
                      <div class="user-data">
                          <p class="full-name">{{ post.user.firstName }} {{ post.user.lastName }}</p> 
                          <p class="email">{{ post.user.email }}</p> 
                          <p>{{ post.date }}</p> 
                      </div>
                      <p class="content">{{ post.content }}</p> 
                      <!-- <Coment/> -->
                  
                </div>

              </div>


              <div class="wrapper-overflow">
                <OverflowMenu @delete="deletePost(post.id)" @edit="editPost(post)"/>
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
  import Coment from './Coment.vue';
  import OverflowMenu from './OverflowMenu.vue';
  
  export default {
    components:{
      Coment,
      OverflowMenu,
    },
    computed:{
        ...mapState(['posts'])
    },
    created() {
      this.fetchPosts();
    },
    methods: {
        ...mapActions(['fetchPosts']),
        async deletePost(postId) {
          try{
            await this.$store.dispatch('deletePost', postId);
            console.log('el post ha sido eliminado');
          }catch(error){
            console.error('error eliminando el post: ',error);
          }
        },
        editPost(){
          console.log('modificamos la publicacion')
        }
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
 
  .post{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap:10px;
    margin:15px 20px;
  }
  .wrapper-info{
    display: flex;
    flex-direction: row;
    gap:10px;
  }
  .wrapper-user-data{
    display: flex;
    flex-direction: column;
    gap:5px;
  }
  .wrapper-overflow{
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
  p{
    font-size: 15px;
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