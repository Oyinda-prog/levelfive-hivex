<template>
  <div class="text-center text-success">
   <span>Child Component: </span> {{ count }}
    <button class="btn btn-outline-success" @click="increaseCount">Increment</button>
    <input type="text">
    <button></button>
  </div>
  
</template>

<script>
export default {
data(){
    return{
        count:0
    }
},
methods:{
    increaseCount(){
this.count++

   this.$emit('Count',this.count)
    }
}
}
</script>

<style>

</style>