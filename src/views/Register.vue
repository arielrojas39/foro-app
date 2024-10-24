<template>
    <div class="register-container">
      <div class="form-content">
        <h1>Registro</h1>
        <form @submit.prevent="registrarUsuario">
          <input v-model="email" type="email" placeholder="Correo" required class="input-field" />
          <input v-model="pass" type="password" placeholder="Contraseña" required class="input-field" />
  
          <input v-model="profile.firstName" type="text" placeholder="Nombre" required class="input-field" />
          <input v-model="profile.lastName" type="text" placeholder="Apellido" required class="input-field" />
          <input v-model="profile.address" type="text" placeholder="Dirección" required class="input-field" />
  
          <label for="file" class="file-label">Seleccionar imagen</label>
          <input id="file" type="file" @change="onFileChange" required class="input-file" />
          <img v-if="previewImage" :src="previewImage" alt="Vista previa de imagen" class="preview-image" />
  
          <select v-model="role" class="input-field">
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
  
          <button type="submit" class="register-button">Registrar</button>
        </form>
  
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Register',
    data() {
        return {
            email: '',
            pass: '',
            file: null,
            previewImage: null,
            profile: {
                firstName: '',
                lastName: '',
                address: ''
            },
            role: 'user'
        }
    },

    computed: {
        ...mapGetters(['error'])
    },

    methods: {
        ...mapActions(['register']),

        onFileChange(event) {
            this.file = event.target.files[0]

            if(this.file) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.previewImage = e.target.result;
                }
                reader.readAsDataURL(this.file)
            }
        },

        async registrarUsuario() {
            try {
                await this.register({
                    email: this.email,
                    pass: this.pass,
                    profile: this.profile,
                    file: this.file,
                    role: this.role,
                })
                this.$router.push('/dashboard')
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>

<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
  }
  
  .form-content {
    background: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 400px;
  }
  
  h1 {
    font-size: 2.2rem;
    color: #333;
    margin-bottom: 20px;
  }
  
  .input-field {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    box-sizing: border-box;
  }
  
  .input-field:focus {
    outline: none;
    border-color: #4CAF50;
  }
  
  .file-label {
    display: block;
    margin: 10px 0;
    background-color: #4CAF50;
    color: white;
    padding: 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .file-label:hover {
    background-color: #45a049;
  }
  
  .input-file {
    display: none; 
  }
  
  .preview-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin: 20px 0;
  }
  
  .register-button {
    width: 100%;
    padding: 15px;
    background-color: #2196F3;
    color: white;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .register-button:hover {
    background-color: #1e88e5;
  }
  
  .error-message {
    color: red;
    margin-top: 15px;
  }
</style>