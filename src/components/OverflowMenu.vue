<template>
    <div class="overflow-menu" @click.stop>
      <button @click="toggleMenu" class="menu-icon">⋮</button>
      <div v-if="isOpen" class="menu-options">

        <button class="button delete" @click="deleteItem">
          <i class="fa-solid fa-trash"></i>
          <p>Eliminar</p>
        </button>

        <button class="button"   @click="editItem">
          <i class="fa-regular fa-pen-to-square"></i>
          <p>Modificar</p>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false,
      };
    },
    props:{

  },
    methods: {
      toggleMenu() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) { 
          document.addEventListener('click', this.handleClickOutside); 
        } else { 
          document.removeEventListener('click', this.handleClickOutside); 
        }
      },
      handleClickOutside(event) { 
        if (!this.$el.contains(event.target)) {
          this.isOpen = false; 
          document.removeEventListener('click', this.handleClickOutside); 
        } 
      },
      deleteItem() {
        this.$emit('delete');
        this.toggleMenu();
      },
      editItem() {
        this.$emit('edit');
        this.toggleMenu();
      },
    },
    beforeDestroy() { 
      document.removeEventListener('click', this.handleClickOutside); 
    },
  };
  </script>
  
  <style scoped>
  .overflow-menu {
    position: relative;
    display: inline-block;
  }
  
  .menu-icon {
    background-color: transparent;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .menu-options {
    position: absolute;
    right: 0;
    background: black;
    color:#ccc;
    box-shadow: 0px 0px 5px  2.5px rgba(173, 173, 173, 0.564);
    z-index: 1000;
    border-radius: 10px;
  }
  
  .menu-options button {
    display: flex;
    width: 100%;
    background: none;
    border: none;
    padding: 20px 20px;
    text-align: left;
    cursor: pointer;
    gap:10px;
  }
  .button{
    color:#ccc;
  }
  .delete{
    color:red;
  }
  .menu-options button[data-v-7cb3d831]:hover{
    border-radius: 10px;
    background-color: #080808;
  }
  p{
    position: relative;
    bottom:px;
  }
  </style>
  