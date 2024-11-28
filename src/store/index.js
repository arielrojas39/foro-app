import Vue from 'vue'
import Vuex from 'vuex'
import {auth, db, storage} from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    user: null,
    error: null,
    posts: [],
    loggedInUserId: null,
    selectedPost: null, 
  },

  getters: {
    isAuth: state => !!state.user,
    user: state => state.user,
    error: state => state.error,
    posts: state => state.posts,
    loggedInUserId: state => state.loggedInUserId,
    selectedPost: state => state.selectedPost,
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
      state.loggedInUserId = user ? user.uid : null;
    },

    addPost(state, post) {
      state.posts.push(post);
    },

    setPosts(state, post){
      state.posts = post;
    },

    removePost(state, postId){
      state.posts = state.posts.filter(post => post.id !== postId)
    },

    updatePost(state, updatedPost) {
      const index = state.posts.findIndex(post => post.id === updatedPost.id); 
      if (index !== -1) {
        Vue.set(state.posts, index, updatedPost); 
      }
    },

    setSelectedPost(state, post) { 
      state.selectedPost = post; 
    },
     
    clearSelectedPost(state) { 
      state.selectedPost = null; 
    },

    setError(state, error) {
      state.error = error
    },
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
      }
    },

    async fetchPosts({ commit }){
      db.collection('posts').onSnapshot( async snapshot =>{
        const postsArray = [];
        for(const doc of snapshot.docs){
          const postData = doc.data();
          const userId = postData.idUser;
          const userDoc = await db.collection('users').doc(userId).get();
          const userData = userDoc.data();
          
          postsArray.push({
            id: doc.id,
            ...postData,
            user:{
              idUser: userId,
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              photoURL: userData.photoURL
            }
          });
        }
        commit('setPosts', postsArray);
        console.log('Guardamos la informacion en la base de datos!!')
      },error =>{ 
        commit('setError',error.message);
      });
    },

    async deletePost({ commit }, postId){
      try{
        await db.collection('posts').doc(postId).delete();
        commit('removePost', postId)
      }catch(error){
        commit('setError',error.message)
      }
    },

    async updatePost({ commit }, updatedPost) { 
      try{
        await db.collection('posts').doc(updatedPost.id).update(updatedPost); 
        commit('updatePost', updatedPost);
      }catch(error){
        commit('setError', error.message);
      }
    },

    async addComment({ commit }, { postId, commentContent, author }) { 
      try { 
        const newComment = { 
          postId, 
          content: commentContent, 
          author
        }

        await db.collection('comments').add(newComment); 
      } catch (error) { 
        commit('setError', error.message); 
        throw error; 
      } 
    }, 

    selectPost({ commit }, post) { // Nueva acción para seleccionar un post 
      commit('setSelectedPost', post); 
    }, 

    clearSelectedPost({ commit }) { // Nueva acción para limpiar el post seleccionado 
      commit('clearSelectedPost');
    },

  }
})


