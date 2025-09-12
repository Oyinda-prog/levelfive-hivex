<template>
  <div>
    <h1 class="text-center text-primary">Child component</h1>
    child Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus veritatis maxime ex quis quas, asperiores enim sit sint. Possimus laboriosam, sed laudantium non amet nihil dolores perspiciatis nulla accusantium, nemo excepturi fuga! Minima perferendis asperiores architecto tenetur consectetur fuga quasi?</div>
    <p>{{ msg }}</p>
    <p>{{ Firstname }}</p>
    <button @click="checkbtn">Check</button>
</template>

<script>
export default {
props:['msg','Firstname'],
methods:{
    checkbtn(){
       alert(this.Firstname) 
    }
},
data(){
    return{
        Msg:''
    }
}
}
</script>

<style>

</style>