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

    <div v-for="debate in debates" :key="debate.id" class="post-group">
      <div class="text-group">
        <h3>{{ debate.title }}</h3>
        <p>{{ debate.content }}</p>
      </div>

    <div class="button-group">
      <button @click="editDebate(debate)">Modificar</button>
      <button @click="deleteDebate(debate.id)">Eliminar</button>
    </div>

    </div>

  </div>
</template>

<script>
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
}

form.new-post{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
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

.button{
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 20px;
}

.post-group{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  width: 600px;;
  background: red;
}

.text-group{
  display: flex;
  flex-direction: column;
}

.button-group{
  display: flex;
  flex-direction: row;
}
</style>
