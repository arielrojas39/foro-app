<template>
  <div class="container">

    <form @submit.prevent="addOrUpdateDebate" class="new-post">
      <div class="image"></div>
      <div class="input-group">
        <input class="input" type="text" v-model="debateForm.title" placeholder="Título" required>
        <input class="input" v-model="debateForm.content" placeholder="Contenido" required>
      </div>
      <button class="button" type="submit">{{ debateForm.id ? 'Actualizar' : 'Crear' }} Debate</button>
    </form>

    <div v-for="debate in debates" :key="debate.id" class="list-container">
      <hr class="full-width">
      <div class="post-group">
      <div class="profile-text-content">
        <div class="image"></div>

        <div class="text-content">
          <h3>{{ debate.title }}</h3>
          <p>{{ debate.content }}</p>
        </div>

        
      </div>
      
      <div class="button-group">
        <button class="button" @click="editDebate(debate)">Modificar</button>
        <button class="button" @click="deleteDebate(debate.id)">Eliminar</button>
      </div>
      
      <!-- <Coment></Coment> -->
      <!-- <hr class="full-width"> -->
    </div>
    </div>



    <hr class="full-width">
  </div>
</template>

<script>
import Coment from './Coment.vue';

export default {
  data() {
    return {
      userData:null,
      debates: [],
      debateForm: {
        id: null,
        title: '',
        content: ''
      }
    };
  },
  components:{
    Coment,
  },
  methods: {
    addOrUpdateDebate() {
      if (this.debateForm.id) {
        const index = this.debates.findIndex(d => d.id === this.debateForm.id);
        this.$set(this.debates, index, { ...this.debateForm });
      } else {
        this.debateForm.id = Date.now();
        this.debates.push({ ...this.debateForm });
      }
      this.resetForm();
    },
    editDebate(debate) {
      this.debateForm = { ...debate };
    },
    deleteDebate(id) {
      this.debates = this.debates.filter(d => d.id !== id);
    },
    resetForm() {
      this.debateForm = { id: null, title: '', content: '' };
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
  gap:20px;
}

form.new-post{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 550px;
}

hr.full-width{
  width: 100%;
  border: 1px solid #ccc; /* Podés ajustar el estilo de la línea aquí */
  box-sizing: border-box;
}


.image{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: aqua;
}

.input-group{
  display: flex;
  flex-direction: column;
  width: 300px;
  gap:5px;
}

.input{
  padding: 5px;
  border:none;
  border-radius: 20px;
  padding: 10px 20px;
  border: none;
  outline: none;
}

.post-group{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.list-container{
  display: flex;
  flex-direction: column;
  gap:20px;
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
