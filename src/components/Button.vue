<template>
    <button class="buttonClass" @click="handleClick"> {{ text }} </button>
</template>

<script>
export default {
    props:{
        text:{
            type: String,
            required:true,
        },
        onClick:{
            type:Function,
            default:null,
        }
    }, 
    methods:{
        handleClick(){
            if(this.onClick){
                this.onClick();
            }
        }
    }
}
</script>

<style>
.buttonClass{
    padding: 10px 20px;
    background-color: #1d9bf0;
    border:none;
    border-radius:50px;
    font-weight: 700;
    color:#ccc;
    font-size:1rem;
    cursor:pointer;
  }
</style>