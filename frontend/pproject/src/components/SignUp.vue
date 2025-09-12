<script setup>
import { onMounted,ref } from 'vue';




 const firstname=ref('')
const email=ref('')
onMounted(()=>{
    console.log(firstname.value);
    
    console.log('hello');
    
})
const submitform=()=>{
    const obj={
        name:firstname.value,email:email.value
    }
    console.log(obj);
    
}
</script>
 <template>
  <div>Sign Up Page</div>
  <router-link :to="{name:'settings'}">Settings</router-link>
  <form @submit.prevent="submitform">
    <input type="text" v-model="firstname">
    <input type="text" v-model="email">
    <button >submit</button>
  </form>  
<router-view></router-view>
</template>

<style scoped>

</style>