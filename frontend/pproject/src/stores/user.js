import { defineStore } from "pinia";

export const useUserStore=defineStore('user',{
    state:()=>({
   name:'oyin',
   alluser:'',
   allusersarray:[]

    }),
    actions:{
       receiveuser(username,fullname,password){
        let allusers={
            username,
            fullname,
        password
        }
this.allusersarray.push(allusers)

} ,
getuser(){
           return this.allusersarray;

       }
    }
    }
    
)