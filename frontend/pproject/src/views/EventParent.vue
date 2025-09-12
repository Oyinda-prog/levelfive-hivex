<template>
  <div class="container-fluid">
    <div class="col-6 mx-auto shadow">
   <span>Parent Component: </span>{{ counts }}
   <input type="text" class="form-control my-2">
   <button class="btn btn-outline-primary" @click="sendchat">Send Chat</button>
    </div>
    
    <div class="col-6 mx-auto shadow">
<ChildEvent @Count="Increase" />
    </div>

  </div>
</template>

<script>

import ChildEvent from './ChildEvent.vue';

export default {
components:{
    ChildEvent
},
data(){
    return{
counts:0
    }
},
methods:{
    Increase(data){
  this.counts=data
    }
    
}

}
</script>

<style>

</style>