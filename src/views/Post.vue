<template>
    <div class="container">
      <form @submit.prevent="addPost" class="post-container">
        <input class="input-field" type="text" v-model="newPost.title" placeholder="Title" required />
        <input class="input-field" type="text" v-model="newPost.content" placeholder="Content" required>
        <button class="button" type="submit">Add Post</button>
      </form>
  
      <div class="edit-post" v-if="editingPost">
        <h2>Edit Post</h2>
        <input class="input-field" v-model="editingPost.title" />
        <textarea class="input-field" v-model="editingPost.content"></textarea>
        <button class="button-edit" @click="updatePost">Save</button>
      </div>

      <div v-for="post in posts" :key="post.id">
        <Post :post="post" @edit-post="startEditing" @delete-post="removePost" />
      </div>
  
    </div>
  </template>
  
  <script>
  import Post from '../components/Post.vue';
  
  export default {
    components: { Post },
    data() {
      return {
        posts: [],
        newPost: { title: '', content: '' },
        editingPost: null,
      };
    },
    methods: {
      addPost() {
        const newPost = { ...this.newPost, id: Date.now() };
        this.posts.push(newPost);
        this.newPost.title = '';
        this.newPost.content = '';
      },
      startEditing(post) {
        this.editingPost = { ...post };
      },
      updatePost() {
        const index = this.posts.findIndex(post => post.id === this.editingPost.id);
        this.$set(this.posts, index, this.editingPost);
        this.editingPost = null;
      },
      removePost(id) {
        this.posts = this.posts.filter(post => post.id !== id);
      }
    }
  }
  </script>

<style scoped>
.container{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap:10px;
    background: radial-gradient(circle, #3c235a, #20093e);
}
.post-container{
    min-width: 600px;
    min-height: 200px;
    background: radial-gradient(circle, #4f3372, #32125c);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:20px;
    border-radius: 10px;
    margin:20px;
}
.input-field{
    width: 400px;
    height: 30px;
    padding:0 10px;
    border: none;
    outline:none;
    background-color: white;
    border-radius: 5px;
    color: black;
}
.button{
    width: 420px;
    height: 30px;
    border: none;
    border-radius: 50px;
    color:#ccc;
    background: radial-gradient(circle, #3c235a, #20093e);
    cursor: pointer;
}
.post-list{
  width: 600px;
  min-height: 200px;
  background-color: rgb(39, 3, 39);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap:20px;
  border-radius: 10px;
  padding:10px;
  color:#ccc;
}
.edit-post{
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

</style>