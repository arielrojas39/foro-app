<template>
    <div>
      <button @click="$emit('back')">Volver</button>
      <h2>{{ post.user.firstName }} {{ post.user.lastName }}</h2>
      <p>{{ post.content }}</p>
      <hr />
      <h3>Comentarios</h3>
      <div v-for="comment in comments" :key="comment.id">
        <p>{{ comment.content }}</p>
        <small>Por {{ comment.author }} el {{ new Date(comment.timestamp).toLocaleString() }}</small>
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
  