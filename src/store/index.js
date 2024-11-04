import Vue from 'vue'
import Vuex from 'vuex'
import {auth, db, storage} from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    user: null,
    error: null,
    // posts: null,
    posts: [],
    // error: null,
  },

  getters: {
    isAuth: state => !!state.user,
    user: state => state.user,
    error: state => state.error,
  },

  mutations: {
    setUser(state, user) {
      state.user = user
    },
    addPost(state, post) {
      state.posts.push(post);
    },
    setError(state, error) {
      state.error = error
    },
    // setError(state, error) {
    //   state.error = error;
    // },
  },

  actions: {
    async login({commit}, {email, pass}) {
      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, pass);
        commit('setUser', userCredential.user)
      } catch (error) {
        commit('setError', error.message)
        throw error;
      }
    },

    async logout({commit}) {
      await auth.signOut();
      commit('setUser', null)
    },

    async register({commit}, {email, pass, profile, file, role = 'user'}) {
        try {
          const userCredential = await auth.createUserWithEmailAndPassword(email, pass)
          const user = userCredential.user;

          const storageRef = storage.ref()
          const fileRef = storageRef.child(`profileImages/${user.uid}`)
          await fileRef.put(file)
          const photoURL = await fileRef.getDownloadURL()

          await db.collection('users').doc(user.uid).set({
            email: user.email,
            photoURL,
            role,
            ...profile
          })

          commit('setUser', user)
        } catch (error) {
          commit('setError', error.message)
        }
    },

    async createPost({ commit }, { postContent }) {
      try {
        //intentamos ver que valor contiene el docref
        console.log('entramos a la funcion createPost');
        
        const user = auth.currentUser;
  
        if (!user) {
          throw new Error("Usuario no autenticado");
        }
  
        const newPost = {
          content: postContent,
          idUser: user.uid,
          createdAt: new Date().toISOString() // Guarda la fecha de creación
        };
  
        const docRef = await db.collection('posts').add(newPost);
  
        
        commit('addPost', { id: docRef.id, ...newPost });
      } catch (error) {
        commit('setError', error.message);
        console.log("ha ocurrido un error inesperado!")
      }
    }
  }

})


