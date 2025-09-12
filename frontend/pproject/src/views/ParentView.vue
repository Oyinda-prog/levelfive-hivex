<template>
  <!-- <div>parent</div> -->
  
  <div class="col-10 mx-auto shadow">
<div class="row">
    <div class="col-6">
     <input type="text" class="form-control" v-model="firstname">  
    </div>
    <div class="col-5">
<ChildView msg="My name is Oyindamola" :Firstname="firstname" />
    </div>

</div>
  </div>
</template>

<script>
import ChildView from './ChildView.vue';

export default {
    data(){
    return{
   firstname:''
    }
    },
components:{
    ChildView,
    
}
}
</script>

<style>

</style>