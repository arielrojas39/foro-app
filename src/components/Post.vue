<template>
  <div class="container">

    <form @submit.prevent="submitPost" class="new-post">
      <div class="post-group">  
        <img :src="userData.photoURL" class="profile-image" />
        <textarea class="input" v-model="postContent" placeholder="¡Comienza un nuevo debate!" required></textarea>
      </div>

      <div class="button-container"> 
        <ButtonComponent type="submit" :text="'Postear'"/>
        <!-- <button type="submit" class="button">Postear</button> -->
      </div>
      
    </form>

    <!-- <div v-for="debate in debates" :key="debate.id" class="list-container">
      <hr class="full-width">
      <div class="post-group">
      <div class="profile-text-content">
        <div class="image"></div>

        <div class="text-content">
          <p>{{ debate.content }}</p>
        </div>

        
      </div>
      
      <div class="button-group">
        <button class="button" @click="editDebate(debate)">Modificar</button>
        <button class="button" @click="deleteDebate(debate.id)">Eliminar</button>
      </div>
      
    </div>
    </div> -->



    <hr class="full-width">
  </div>
</template>

<script>
import Coment from './Coment.vue';
import ButtonComponent from './Button.vue';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      userData:null,
      postContent: '',
      // debates: [],
      // debateForm: {
      //   id: null,
      //   title: '',
      //   content: ''
      // }
    };
  },
  props:{
    userData: {
      type: Object,
      required: true
    }
  },
  components:{
    Coment,
    ButtonComponent,
  },
  // computed: {
  //       ...mapGetters(['error'])
  // },
  methods: {

    ...mapActions(['createPost']),
    
    // addOrUpdateDebate() {
    //   if (this.debateForm.id) {
    //     const index = this.debates.findIndex(d => d.id === this.debateForm.id);
    //     this.$set(this.debates, index, { ...this.debateForm });
    //   } else {
    //     this.debateForm.id = Date.now();
    //     this.debates.push({ ...this.debateForm });
    //   }
    //   this.resetForm();
    // },

    // editDebate(debate) {
    //   this.debateForm = { ...debate };
    // },

    // deleteDebate(id) {
    //   this.debates = this.debates.filter(d => d.id !== id);
    // },

    // resetForm() {
    //   this.debateForm = { id: null, content: '' };
    // },

    // autoResize() {
    //   const textarea = this.$refs.textarea;
    //   textarea.style.height = 'auto'; // Resetea la altura
    //   textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura al contenido
    // },

    // mounted() {
    //   this.autoResize(); // Ajusta la altura inicial si hay contenido preexistente
    // },
    

     async submitPost() {
      try {
        await this.createPost({ postContent: this.postContent });
        console.log('estamos dentro de submitPost en component/post.vue' + this.postContent)
        this.postContent = ''; // Limpiar el contenido después de publicar
      } catch (error) {
        console.error("Error al crear el post:", error);
      }
    }
  }

};

</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:10px;
}

.new-post{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
}

.input{
  border:none;
  outline: none;
  background-color: transparent;
  color:#ccc;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  resize: none; 
  overflow: hidden; 
}

hr.full-width{
  width: 100%;
  border: 1px solid #ccc; /* Podés ajustar el estilo de la línea aquí */
  box-sizing: border-box;
}

img.profile-image{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left:20px;  
}

.input-group{
  display: flex;
  flex-direction: column;
  width: 300px;
  gap:5px;
}

.post-group{
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 30px;
  width: 100%;
}
.input::placeholder{
  font-size: 15px;
  color:grey;
}
.list-container{
  display: flex;
  flex-direction: column;
  gap:20px;
  width: 100%;
}

.profile-text-content{
  display: flex;
  flex-direction: row;
  gap:15px;
}

.text-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  flex-wrap: wrap;
  gap:5px;
  color: #ccc;
  text-align: left;
  width: 250px;
}

.button-group{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap:5px;
}
.button-container{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding: 0px 20px;
}

.button{
  width: 100px;
  height: 30px;
  background: radial-gradient(circle, #2575a0, #0d2c3d);
  font-size: 0.75rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: #ccc;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.button:hover{
  background: radial-gradient(circle, #0d81c5, #091e2a);
  transform: scale(1.05);
}
</style>
