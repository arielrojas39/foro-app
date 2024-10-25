<template>
    <div class="wrapper-post">
      <div class="text-group">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </div>

      <div class="button-group">

        <button class="button" @click="editPost">
          Editar
        </button>
          
        <button class="button" @click="deletePost">
          Eliminar
        </button>

      </div>
    </div>
</template>
  
<script>
  export default {
    props: ['post'],
    methods: {
      editPost() {
        this.$emit('edit-post', this.post);
      },
      deletePost() {
        this.$emit('delete-post', this.post.id);
      }
    }
  }
</script>

<style scoped>
  .wrapper-post{
    display: flex;
    flex-direction: row;
    gap:20px;
    justify-content: space-between;
    align-items: center;
    background: radial-gradient(circle, #4f3372, #32125c);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8);
    width: 550px;
    min-height: auto;
    border-radius: 10px;
    padding:25px;
    color:#ccc;
  }
  .text-group{
    display: flex;
    flex-direction: column;
    color:#ccc;
    justify-content: start;
    align-items: start;
    gap:20px;
  }
  p{
    text-align: left;
  }
  .button-group{
    display: flex;
    flex-direction: row;
    gap:10px;
  }
  .button{
    width: 80px;
    height: 30px;
    border:none;
    border-radius: 50px;
    color: #ccc;
    background: radial-gradient(circle, #3c235a, #20093e);
    cursor: pointer;
  }

</style>
