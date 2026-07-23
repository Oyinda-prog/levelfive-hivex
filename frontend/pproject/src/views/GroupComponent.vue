<template>
  <div class="col-11  shadow mx-auto p-4 rounded-4 mt-5 bg-light">
        <div class="">
      <div class="border shadow ">

<img src="../assets/groupbg.png" alt="" class="w-100  my-5 bg-primary border-5 border-danger" >
      </div>
<div class="text-center my-5">
    <button v-if="check" class="btn btn-outline-primary" @click="this.$router.push('/groups/create')">{{ create }}</button>
</div>
<h4>{{ name }}</h4>
<div v-if="privacy=='Private'" class="d-flex my-3">
  <img src="../assets/padlock.png" width="30" height="30" alt="private" class="me-5" style="filter: grayscale();opacity: 50%;">
<p >{{ privacy }}</p>
<h class="ms-4">{{ 1 }} member</h>
</div>
<div v-if="privacy=='Public'" class="d-flex my-3">
  <img src="../assets/public.png" width="30" height="30" alt="private" class="me-5" style="filter: grayscale();opacity: 50%;">
<p >{{ privacy }}</p>
<h class="ms-4">{{ 1 }} member</h>
</div>
<hr>
</div>
         </div>
</template>
<script>
export default {
props:['create','name','check','privacy'],
mounted(){
  if(!localStorage.getItem('honeyuserid')){
      this.$router.push('/login')
    }
}
}
</script>

<style scoped>
.disaled{
  pointer-events: none;
  user-select: none;
  opacity: 0.5;
}
</style>