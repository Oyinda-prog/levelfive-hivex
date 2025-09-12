import { defineStore } from "pinia";

export const useCounterStore=defineStore('counter',{
    state:()=>({
        count:20,
        name:'oyin',
        user:'',
        arrobj:JSON.parse(localStorage.getItem('allsignupusers')),
        picture:''
    }),
    actions:{
        increment(){
            this.count++
        },
        getuser(user){
            this.user=user
        },
        returngetuser(){
   return this.user
        },
           getprofile(picture){
            this.picture=picture
        },
        returnprofile(){
   return this.picture
        }
    }
    }
    
)