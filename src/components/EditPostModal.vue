<template>
    <div v-if="isVisible" class="modal-overlay" @click.stop>
      <div class="modal-content" @click.stop>
        <button class="button-cancel" type="button" @click="closeModal">x</button>
        <div class="x"> 
        <form @submit.prevent="saveChanges" class="wrapper-content">
        <div class="info-data">
            <div>
                <img :src="post.user.photoURL" alt="Foto de perfil" />         
            </div>
            <div class="wrapper-info">
                <div class="info-user">
                    <p class="full-name">{{ post.user.firstName }} {{ post.user.lastName }}</p> 
                    <p class="email">{{ post.user.email }}</p>             
                </div>
                <textarea class="input" v-model="post.content" id="content" required placeholder="Modifica tu post..."></textarea>
            </div>
        </div>
        <div class="wrapper-save">
          <ButtonComponent type="submit" :text="'Guardar'"/>
        </div>

        </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ButtonComponent from './Button.vue';

  export default {
    props: {
      post: Object,
      isVisible: Boolean,
    },
    components:{
      ButtonComponent,
    },
    methods: {
      saveChanges() {
        this.$emit('save', this.post);
        this.closeModal();
      },
      closeModal() {
        this.$emit('close');
        document.removeEventListener('click', this.handleClickOutside); 
      },
      handleClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.closeModal(); 
        } 
      },
    },
    watch: { 
      isVisible(val) { 
        if (val) { 
          this.$nextTick(() => { d
            document.addEventListener('click', this.handleClickOutside); 
          });
        } else { 
          document.removeEventListener('click', this.handleClickOutside); 
        } 
      } 
    }, 
    beforeDestroy() { 
      document.removeEventListener('click', this.handleClickOutside); 
    },
  }
  </script>
  
  <style scoped>

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(95, 123, 144, 0.041);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapper-content{
    display: flex;
    flex-direction: column;
  }
  .wrapper-save{
    display: flex;
    justify-content: end;
    align-items: center;
  }
  .info-user{
    display: flex;
    flex-direction: row;
    gap:5px;
  }
  .full-name{
    color:#ccc;
  }
  .email{
    color:#98989890;
  }
  .modal-content {
    width: 600px;
    height: auto;
    background: black;
    border-radius: 20px;
  }
  .wrapper-content{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap:20px;
  }
  .wrapper-info{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .x{
    padding:0px 20px 20px 20px;
  }
  img{
    width: 40px;
    height: 40px;
    border-radius:50%;
  }
  .info-data{
    display: flex;
    flex-direction: row;
    gap:10px;
  }
  .input{
    color:#ccc;
    background-color: black;
    display: flex;
    flex-wrap: wrap;
    border:none;
    width: 100%;
    padding:10px 0px;
    resize: none;
    outline:none;
    font-size: 20px;
  }
  .button-cancel{
    padding:15px;
    margin:15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border:none;
    background-color: transparent;
    color:#ccc;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;    
  }
  .button-cancel:hover{
    background-color:rgba(252, 252, 252, 0.1);
  }
  .button-save{
    margin-right:20px;
  }
  </style>
  