<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="user">Hola, {{user.email}} </p>

    <button @click="manejarLogout">Cerrar Sesión</button>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    computed:{
        ...mapGetters(['user'])
    },
    methods:{
        ...mapActions(['logout']),

        async manejarLogout(){
            try{
                await this.logout()

                this.$router.push('/')
            }catch(error){
                console.error(error)
            }
        }
    }
}
</script>

<style>

</style>