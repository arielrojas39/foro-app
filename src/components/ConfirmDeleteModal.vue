<template>
    <div v-if="isVisible" class="modal-overlay" @click.stop>
      <div class="modal-content" @click.stop>
        <h1>¿Deseas eliminar post?</h1>
        <p>Esta acción no se puede revertir, y se eliminará de tu perfil, de la cronología de las cuentas que te sigan y de los resultados de búsqueda. </p>

        <div class="wrapper-button">
          <button class="button delete" @click="confirmDelete">Eliminar</button>
          <button class="button cancel" @click="cancelDelete">Cancelar</button>
        </div>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
    },
    methods: { 
      confirmDelete() { 
        this.$emit('confirm'); 
        this.closeModal(); 
      }, 
      cancelDelete() { 
          this.$emit('cancel'); 
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
        this.$nextTick(() => { 
          document.addEventListener('click', this.handleClickOutside); 
        }); 
      } else {
          document.removeEventListener('click', this.handleClickOutside); 
        } 
      }, 
    }, 
    beforeDestroy() { 
      document.removeEventListener('click', this.handleClickOutside); 
    },
  };
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
  
  .modal-content {
    width: 280px;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: black;
    border-radius: 20px;
    padding: 20px;
    gap:15px;
  }
  .wrapper-button{
    display: flex;
    flex-direction: column;
    gap:10px;
  }
  h1{
    font-size: 22px;
    font-weight: 900;
    color:#e7e9ea;
  }
  p{
    text-align: left;
    color:#61666a;
  }
  .button{
    width: 100%;
    height: 45px;
    border:none;
    border-radius: 50px;
    cursor: pointer;
    font-size: 16px;
  }
  .delete{
    background-color: rgba(246, 45, 45, 0.731);
    color:#e7e9ea;
    transition: background-color 0.5 ease;
  }
  .cancel{
    background-color: black;
    color:#ccc;
    border: 1px solid #ccc;
    transition: background-color 0.5 ease;
  }
  .delete:hover{
    background-color: rgba(249, 4, 4, 0.845);
  }
  .cancel:hover{
    background-color: #1f1e1e;
  }
  </style>
  