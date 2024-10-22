<template>
    <div>
        <h1>Login</h1>

        <form @submit.prevent="manejarLogin">
            <input v-model="email" type="email" required>
            <input v-model="pass" type="password" typeof="email" required>

            <button type="submit">Loguear</button>
        </form>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import  {mapActions, mapGetters} from 'vuex';

export default{
    name: 'Login',
    data(){
        return{
            email: '',
            pass: ''
        }
    },
    computed:{
        ...mapGetters(['error'])
    },
    methods: {
        async manejarLogin() {
            if(this.email.trim() && this.pass.trim()){
                try{
                    await this.login({email: this.email, pass: this.pass})
                    this.$router.push('/dashboard');
                }
                catch(error){
                    console.error('Error al iniciar sesión', error);
                }
            }else{
                alert('Por favor, completa los inputs')
            }
        },
        ...mapActions(['login'])
    }
}
</script>

<style>

</style>