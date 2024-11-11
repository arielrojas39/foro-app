<template>
    <div class="overflow-menu" @click.stop>
      <button @click="toggleMenu" class="menu-icon">
        <i id="menu-icon" class="fa-solid fa-ellipsis-vertical"></i>
      </button>
      <div v-if="isOpen" id="menu" class="menu-options">

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
  
  
  
  .menu-options {
    position: absolute;
    right: 0;
    background: black;
    color:#ccc;
    box-shadow: 0px 0px 5px  2.5px rgba(173, 173, 173, 0.564);
    z-index: 1000;
    border-radius: 10px;
  }
  button{
    color:#ccc;
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

  .menu-icon{
    width: 30px;
    height: 30px;
    position: relative;
    bottom:1px;
    background-color: transparent;
    color: #ccc;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 50px;
    transition: background-color 0.2s linear, color 5s ease;
  }
  
  .menu-icon:hover{
    background-color: #15364b6f;
    #menu-icon{
      color:#1d99ed;
    }
  }

  .delete{
    color:red;
  }
  .menu-options button:hover{
    border-radius: 10px;
    background-color: #080808;
  }
  p{
    position: relative;
    bottom:px;
  }
  </style>
  