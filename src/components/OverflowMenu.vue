<template>
    <div class="overflow-menu">
      <button @click="toggleMenu" class="menu-icon">⋮</button>
      <div v-if="isOpen" class="menu-options">
        <button class="button" @click="deleteItem">Eliminar</button>
        <button class="button"   @click="editItem">Modificar</button>
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
    padding:10px;
    position: absolute;
    right: 0;
    background: black;
    color:#ccc;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 5px  2.5px rgba(255, 255, 255, 0.564);
    z-index: 1000;
    border-radius: 10px;
  }
  
  .menu-options button {
    display: block;
    width: 100%;
    background: none;
    border: none;
    padding: 10px;
    text-align: left;
    cursor: pointer;
  }
  .button{
    color:#ccc;
  }
  </style>
  