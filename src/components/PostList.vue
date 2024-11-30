<template>
    <div class="container" @click="handleClickOutside">

      <ul class="wrapper-list">
        <li v-for="post in posts" :key="post.id" @click="emitPostSelected(post)"> 
            <div class="post">

              <div class="wrapper-info">

                <div class="wrapper-img">
                  <img :src="post.user.photoURL" alt="Foto de perfil" /> 
                </div>
                
                <div class="wrapper-separation"> 

                  <div class="wrapper-user-data">
                  
                    <div class="user-data">                                       
                      <p class="full-name">{{ post.user.firstName }} {{ post.user.lastName }}</p> 
                      <p class="email">{{ post.user.email }}</p> 
                      <p>{{ post.date }}</p> 
                    </div>
                    
                    <p class="content">{{ post.content }}</p> 

                  </div>

                  <div class="wrapper-interaction">

                      
                    <button @click="openPostModal(post)" class="comment-button">
                      <i id="comment-icon" class="fa-regular fa-comment"></i> 
                    </button>

                  
                      
                    
                    <!-- <i id="retweet-icon" class="fa-solid fa-retweet"></i>
                    <i id="heart-icon" class="fa-regular fa-heart"></i> -->
                  </div>
                </div>
              </div>

              <div class="wrapper-overflow">
                <OverflowMenu 
                  v-if="post.user.idUser === loggedInUserId"
                  @delete="showDeleteConfirmation(post.id)" 
                  @edit="openEditModal(post)" 
                />
              </div>

              <EditPostModal 
                :key="post.id"
                v-if="isEditModalVisible" 
                :post="postToEdit" 
                :isVisible="isEditModalVisible" 
                @close="closeEditModal" 
                @save="savePost" 
                ref="editModal"
              />

              <ConfirmDeleteModal
                :key="post.id"
                v-if="isDeleteModalVisible" 
                :isVisible="isDeleteModalVisible" 
                @confirm="deletePost" 
                @cancel="closeDeleteModal" 
                ref="confirmModal"
              />

              <Comment
                :userData="userData"
                :isVisible="isPostModalVisible" 
                :post="selectedPost"                 
                @close="closePostModal" 
              />

            </div>
            <hr class="separator">
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  
  import { mapState, mapActions } from 'vuex';
  
  import OverflowMenu from './OverflowMenu.vue';
  import EditPostModal from './EditPostModal.vue';
  import ConfirmDeleteModal from './ConfirmDeleteModal.vue';
  import Comment from './Comment.vue';

  export default {
    data() { 
      return { 
        isEditModalVisible: false, 
        postToEdit: null, 
        isDeleteModalVisible:false, 
        postToDelete: null,
        isPostModalVisible: false, 
        selectedPost: null,
      }; 
    },
    props: {
      userData: {
        type:Object,
        required: true,
      }
    },
    components:{
      OverflowMenu,
      EditPostModal,
      ConfirmDeleteModal,
      Comment,
    },
    computed:{
        ...mapState(['posts', 'loggedInUserId'])
    },
    created() {
      this.fetchPosts();
    },
    methods: {
        ...mapActions(['fetchPosts', 'selectPost']),

        handleClickOutside(event) {           
          if (this.isEditModalVisible && !this.$refs.editModal.$el.contains(event.target)) { 
            this.closeEditModal(); 
          } if (this.isDeleteModalVisible && this.$refs.confirmModal && !this.$refs.confirmModal.$el.contains(event.target)) { 
            this.closeDeleteModal(); 
          } 
        },
        
        async deletePost() {
          try{
            await this.$store.dispatch('deletePost', this.postToDelete);
            console.log('el post ha sido eliminado');
            this.closeDeleteModal();
          }catch(error){
            console.error('error eliminando el post: ',error);
          }
        },

        openEditModal(post) {
          this.postToEdit = { ...post }; 
          this.isEditModalVisible = true; 
          this.$nextTick(()=>{
            document.addEventListener('click', this.handleClickOutside);
          })
        }, 

        closeEditModal() { 
          this.isEditModalVisible = false; 
          this.postToEdit = null; 
          document.removeEventListener('click',this.handleClickOutside)
        },

        async savePost(updatedPost) {
           try { 
            await this.$store.dispatch('updatePost', updatedPost); 
            console.log('El post ha sido actualizado'); 
            this.closeEditModal(); 
          } catch (error) {
            console.error('Error actualizando el post:', error); 
          }
        },

        showDeleteConfirmation(postId) { 
          this.postToDelete = postId; 
          this.isDeleteModalVisible = true; 
          document.addEventListener('click', this.handleClickOutside);
        }, 

        closeDeleteModal() { 
          this.isDeleteModalVisible = false; 
          this.postToDelete = null; 
          document.removeEventListener('click', this.handleClickOutside);
        },

        openPostModal(post) { 
          this.selectedPost = post; 
          this.isPostModalVisible = true; 
        }, 
        closePostModal() { 
          this.isPostModalVisible = false; 
          this.selectedPost = null; 
        },

        emitPostSelected(post) { 
          this.selectPost(post); 
          this.$emit('postSelected', post); 
        },

      },
  };
  </script>
  
<style scoped>
   .container{
    flex: 1; 
    overflow-y: auto; 
    border:1px solid #8887878f;
    border-top: none;
    border-bottom: none;    
    scrollbar-width: none;  
    -ms-overflow-style: none; 
  }
  .wrapper-list{
    display: flex;
    flex-direction: column;
  }
  .wrapper-separation{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap:15px;
    flex-wrap: wrap;
  }
  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .icon-button{
    padding: 10px;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    position: relative;
    right: 10px;
    cursor: pointer;
    transition: background-color 0.2s linear, color 5s ease;
  }
  
 
  .post{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap:10px;
    margin:15px 15px 5px 15px;
    cursor: pointer;
  }
  .wrapper-info{
    width: 100%;
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
  .wrapper-interaction{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: sart;
    
  }
  .comment-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
  }
  .fa-regular.fa-comment{
    position:relative;
    bottom:1px;
    font-size:17px;
    color:#ccc;
  }
  button.comment-button{
    width: 35px;
    height: 35px;
    color:#ccc;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    position: relative;
    right: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease, color 1s linear;
  }
  button.comment-button:hover{
    background-color: #15364b6f;
    .fa-regular.fa-comment{
      color:#1d99ed;
    }
  }
  /*
  button.coment-button{
    color:#ccc;
    padding: 10px;
    border: none;
    border-radius: 50%;
    background-color: black;
    position: relative;
    right: 10px;
    cursor: pointer;
    transition: background-color 0.2s linear, color 5s ease;
  }
  button.coment-button:hover{
    background-color: #15364b6f;
  }
    */
  p{
    font-size: 16px;
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