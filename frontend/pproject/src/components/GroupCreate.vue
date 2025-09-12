<template>
  <div class="container-fluid">
<div>
    <NavBar/>
</div>
<div class="row mt-5">
   <div class="col-md-3 col-lg-3 col-12 border-3">

      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, neque?
      </div>
   </div>
   <div class="col-md-9 col-12 bg-light mt-5">
     <GroupComponent :create="btn"/> 
        
     
   </div>
</div>
  </div>
</template>

<script>
import GroupComponent from './GroupComponent.vue';
import NavBar from './NavBar.vue';



export default {
    data(){
        return{
        btn:'Create New Group'
        }
    },
components:{
    NavBar,
    
    GroupComponent
}
}
</script>

<style>

</style>