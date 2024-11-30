<template>
    <div class="container-post">
      
      <div class="container-back">
        <button class="button-back" @click="$emit('back')">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
      </div>
      <div class="post-user">
        <img :src="post.user.photoURL" alt="">
        <div class="container-separation">
          <div class="data-user"> 
            <p>{{ post.user.firstName }} {{ post.user.lastName }}</p>
            <p>{{ post.user.email }}</p>
          </div>
          <p>{{ post.content }}</p>
        </div>
      </div>
      <hr />
      <div v-for="comment in comments" :key="comment.id">
        <p>{{ comment.content }}</p>
        <p>Por {{ comment.author }}</p>
      </div>
      <textarea v-model="newComment" placeholder="Escribe un comentario..."></textarea>
      <button @click="addComment">Agregar Comentario</button>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  
  export default {
    props: {
      post: Object
    },
    data() {
      return {
        comments: [],
        newComment: ''
      };
    },
    created() {
      this.fetchComments();
    },
    methods: {
      async fetchComments() {
        const commentsSnapshot = await db.collection('comments').where('postId', '==', this.post.id).get();
        this.comments = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      },
      async addComment() {
        if (!this.newComment.trim()) return;
  
        const comment = {
          postId: this.post.id,
          content: this.newComment,
        };
  
        await db.collection('comments').add(comment);
        this.comments.push(comment);
        this.newComment = '';
      }
    }
  };
  </script>
  
  <style scoped>

  .container-post{
    display: flex;
    flex-direction: column; 
  }
  .container-back{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
  } 
  .post-user{
    display:flex;
    flex-direction: row;
  }
  .data-user{
    display:flex;
    flex-direction: row;
  }
  .container-separation{
    display:flex;
    flex-direction: column;
  }
  img{
    width:40px;
    height:40px;
  }
  p{
    color:#fff;
  }
  .button-back{
    height: 40px;
    width: 40px;
    border: none;
    background-color: black;
    color:white;
    cursor:pointer;
    margin:5px;
  }
  .fa-solid.fa-arrow-left{
    font-size: 20px;
  }
  </style>