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
          
          <div>
          <div class="container-user">
            <div class="info-user">
              <p class="full-name">{{ post.user.firstName }} {{ post.user.lastName }}</p>
              <p class="email">{{ post.user.email }}</p>
            </div>
            <p class="content">{{ post.content }}</p>
          </div>
          <div class="container-answer"> 
            <p class="answer"> Respondiendo a </p>
            <p class="email-blue">{{ post.user.email }} </p>
          </div>
          </div>

        </div>
        

        <div class="container-user-comment">

          <div class="user-comment">
            <img :src="userData.photoURL">                      
            <div class="container-input">
              <textarea v-model="newCommentContent" class="input" placeholder="Escribe tu comentario"></textarea>
            </div>
          </div>  

          <div class="container-button">
            <button @click="addNewComment">Responder</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  data(){
    return{
      newCommentContent: ''
    }
  },
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
    ...mapActions(['addComment']),
    closeModal() {
      this.$emit('close');
    },
    async addNewComment() { 
      if (this.newCommentContent.trim() === '') { 
        return; 
      } 
      try { 
        await this.addComment({ 
          postId: this.post.id, 
          commentContent: this.newCommentContent, 
          author: this.userData.email 
        }); 
        this.newCommentContent = ''; 
        this.closeModal(); 
      } catch (error) { 
        console.error('Error agregando el comentario:', error); 
      } 
    },
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
  flex-direction: column;
  background-color: black;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
}

.close {
  display: flex;
  font-size: 1.5em;
  cursor: pointer;
  padding:10px 0px 0px 20px;
}

.container-user-post{
  display: flex;
  flex-direction: column;
  gap:0px;
  padding:0px 10px 10px 10px;
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
  gap:10px;
}
.info-user{
  display: flex;
  flex-direction: row;
  gap:5px;
}

.container-user-comment{    
  display: flex;
  flex-direction: column;
  gap:5px;
  padding:0px 10px 10px 10px;
}
.container-answer{
  display: flex;
  flex-direction: row;
  padding: 30px 0px 10px 0px;
  gap:5px;
}
.user-comment{
  display: flex;
  flex-direction: row;
}
.container-input{
  height: 100px;
  width: 100%;
}
.container-button{
  display: flex;
  flex-direction:row-reverse;
}
button{
  padding:10px 10px;
  border-radius: 50px;
  border:none;
  cursor: pointer;  
  background-color: #1d9bf0;
  font-weight: 700;
  color:#ccc;
  font-size:1rem;
}
.answer{
  color:#ccc;
}
.email-blue{
  color:#1d9bf0;
}
.image{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height:100%;
  
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
.input{
  border:none;
  outline: none;
  background-color: black;
  color:#ccc;
  padding:0px 10px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  resize: none;
  outline:none;
  font-size: 1.2rem;
  overflow: hidden;
}
</style>