<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="container-user-post">

          <div class="post-user">
            <div class="image">
              <img :src="post.user.photoURL" alt="Foto de perfil">          
              <hr class="vertical-hr">
            </div>
      
            <div class="container-user">
              <div class="post-user">
                <p class="full-name">{{ post.user.firstName }} {{ post.user.lastName }}</p>
                <p class="email">{{ post.user.email }}</p>
              </div>
              <p class="content">{{ post.content }}</p>
            </div>

          </div>
          

          <div class="y">
            <div class="image">
              <img :src="userData.photoURL">          
            </div>
          
            <textarea placeholder="Escribe tu comentario"></textarea>
            <!-- <button @click="submitComment">Enviar Comentario</button> -->
          </div>

        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        default: false
      },
      post: {
        type: Object,       
      },
      userData: {
        type: Object,
        required: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(95, 123, 144, 0.041);
  }
  
  .modal-content {
    display: flex;
    gap:20px;
    background-color: black;
    padding: 20px;
    border-radius: 5px;
    max-width: 500px;
    width: 100%;
  }
  
  .close {
    display: flex;
    font-size: 1.5em;
    cursor: pointer;
  }

  .container-user-post{
    display: flex;
    flex-direction: column;
    gap:50px;
  }
  .container-user{    
    display: flex;
    flex-direction: column;
    text-align: start;
    gap:5px;
  }

  .post-user{
    padding: 10px;
    display: flex;
    flex-direction: row;
    gap:5px;
  }

  .y{    
    display: flex;
    flex-direction: row;
    gap:5px;
  }

  .image{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  img{
    width: 40px;
    height: 40px;
    border-radius:50%;
  }
  .vertical-hr{
    width: 1px;
    height: 100%;
    background-color: #ccc;
    border:none;
  }
  .full-name{
    color:#e4e6e7;
  }
  .content{
    font-size: 16px;
    color:#e4e6e7;
  }
  .email{
    color:#98989890;
  }
  </style>
  