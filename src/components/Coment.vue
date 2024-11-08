<template>
    <div class="comment-section">

      <form @submit.prevent="addComment">
        <input class="input" v-model="commentText" placeholder="Escribir comentario" required>
        <button class="button" type="submit">Agregar Comentario</button>
      </form>
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <p>{{ comment.text }}</p>
        <button @click="deleteComment(comment.id)">Eliminar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      postId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        comments: [],
        commentText: ''
      };
    },
    methods: {
      addComment() {
        const newComment = {
          id: Date.now(),
          text: this.commentText,
          postId: this.postId
        };
        this.comments.push(newComment);
        this.commentText = '';
      },
      deleteComment(id) {
        this.comments = this.comments.filter(comment => comment.id !== id);
      }
    }
  };
  </script>
  
  <style scoped>
  .comment-section {
    margin-top: 20px;
  }
  
  .input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .comment {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  