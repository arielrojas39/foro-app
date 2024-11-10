<template>
    <div class="container" @click="handleClickOutside">

      <ul class="wrapper-list">
        <li v-for="post in posts" :key="post.id"> 
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

                      <button class="icon-button">
                        <i id="coment-icon" class="fa-regular fa-comment"></i>
                      </button>
                    
                    <!-- <i id="retweet-icon" class="fa-solid fa-retweet"></i>
                    <i id="heart-icon" class="fa-regular fa-heart"></i> -->
                  </div>
                </div>
              </div>

              <div class="wrapper-overflow">
                <OverflowMenu @delete="showDeleteConfirmation(post.id)" @edit="openEditModal(post)" />
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

            </div>
            <hr class="separator">
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  
  import { mapState, mapActions } from 'vuex';
  import Coment from './Coment.vue';
  import OverflowMenu from './OverflowMenu.vue';
  import EditPostModal from './EditPostModal.vue';
  import ConfirmDeleteModal from './ConfirmDeleteModal.vue';


  export default {
    data() { 
      return { 
        isEditModalVisible: false, 
        postToEdit: null, 
        isDeleteModalVisible:false, 
        postToDelete: null,
      }; 
    },
    components:{
      Coment,
      OverflowMenu,
      EditPostModal,
      ConfirmDeleteModal,
    },
    computed:{
        ...mapState(['posts'])
    },
    created() {
      this.fetchPosts();
    },
    methods: {
        ...mapActions(['fetchPosts']),

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
    /* Oculta la barra de desplazamiento */ 
    scrollbar-width: none; /* Firefox */ 
    -ms-overflow-style: none; /* Internet Explorer 10+ */
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
  }
  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  #coment-icon, #heart-icon, #retweet-icon{
    font-size: 15px;
    color:#70757a;
    position: relative;
    top:1px;
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
  .icon-button:hover{
    background-color: #15364b6f;
    #coment-icon{
      color:#1d99ed;
    }
  }
  .post{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap:10px;
    margin:15px 15px 5px 15px;
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