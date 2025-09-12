import { createRouter,createWebHistory } from "vue-router";
// import SignUp from'../components/SignUp.vue'
import LogIns from "../components/LogIns.vue";
// import HomeCom from "@/components/HomeCom.vue";
import SignUps from "@/views/SignUps.vue";
import SignIn from "@/views/SignIn.vue"
import PageNotFound from "@/views/PageNotFound.vue";
import LogIn from "@/views/LogIn.vue";
import ViewPage from "@/views/ViewPage.vue";
import CoPut from "@/views/CoPut.vue";
import PaRam from "@/views/PaRam.vue";
import ViewBlog from "@/views/ViewBlog.vue";
import DynamicRoute from "@/views/DynamicRoute.vue";
import DisPlay from "@/views/DisPlay.vue";
import BlogView from "@/views/BlogView.vue";
import ParentView from "@/views/ParentView.vue";
import EventParent from "@/views/EventParent.vue";
import HoneyWealthsignup from "@/views/HoneyWealthsignup.vue";
import ProfilePicture from "@/views/ProfilePicture.vue";
import DashyBoard from "@/views/DashyBoard.vue";
import SignUp from "@/views/SignUp.vue";
import RegisTer from "@/views/RegisTer.vue";
import PanelView from "@/views/PanelView.vue";
import UserPost from "@/views/UserPost.vue";
import FriendView from "@/views/FriendView.vue";
import GroupView from "@/views/GroupView.vue";
import GroupCreate from "@/views/GroupCreate.vue";
import GroupParam from "@/views/GroupParam.vue";
import NotificationView from "@/views/NotificationView.vue";
import PostView from "@/views/PostView.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import PasswordPage from "@/views/PasswordPage.vue";
import ManageGroups from "@/views/ManageGroups.vue";
import MarketPlace from "@/views/MarketPlace.vue";
import LandingPage from "@/views/LandingPage.vue";
import DashBoard from "@/views/DashBoard.vue";
import CreatePost from "@/views/CreatePost.vue";
import SettingPage from "@/views/SettingPage.vue";
import HelloWorld from "@/components/HelloWorld.vue";


// import SignUp from "@/views/SignUp.vue";
// import CoPut from "@/views/CoPut.vue";
// import DashBoard from "@/views/DashBoard.vue";




const routes=[
    // {
    //     path:'/',
    //     component:HomeCom,
    //     name:"Home"
    // },
    {
        path:'/home',
        component:HelloWorld,
        name:"helloworld",
        
    },
    {
        path:'/parent',
        component:ParentView,
        name:"parent"  
    },
    {
        path:'/mypost',
        component:UserPost,
        name:"mypost"  
    },
     {
        path:'/',
        component:PanelView,
        name:"homepage"  
    },
    {
        path:'/view',
        component:ViewPage,
        name:"view"  
    },
    {
        path:'/co',
        component:CoPut,
        name:"CO"  
    },
    {
        path:'/blogs',
        component:PaRam,
        name:"blogs"  
    },
    {
        path:'/home',
        component:LandingPage,
        name:"home"  
    },
    {
        path:'/blogs/:id',
        component:ViewBlog,
        name:"viewblogs"  
    },
    {
        path:'/signins',
        component:SignIn,
        name:"signins"  
    },
    {
        path:'/signup',
        component:SignUp,
        name:"signup",
        children:[
         {
            path:'settings',
            component:CoPut,
            name:"settings"
         }
        ]
    },
    {
        path:'/log',
        component:LogIns,
        name:"log"
    },
    {
        path:'/settings',
        component:SettingPage,
        name:"settings"
    },
    {
        path:'/groups/feed',
        component:GroupView,
        name:"groupfeed"
    },
    {
        path:'/feeds',
        component:PostView,
        name:"feeds"
    },
    {
        path:'/groups/:id',
        component:GroupParam,
        name:"groupsparam"
    },
    {
        path:'/notification',
        component:NotificationView,
        name:"notification"
    },
    {
        path:'/groups/create',
        component:GroupCreate,
        name:"groupcreate"
    },
    
     {
        path:'/friend',
        component:FriendView,
        name:"friend"
    },
    {
        path:'/dash',
        component:DashyBoard,
        name:"dash"
    },
    {
        path:'/login',
        component:LogIn,
        name:"login"
    },
    

    {
path:'/signin',
component:SignIn,
name:'signin'
    },
    // {
    //     path:'/',
    //     component:HomeCom,
    //     name:"Home"
    // },
    {
        path:'/regis',
        component:RegisTer,
        name:"regis"
    },
    {
        path:'/marketplace',
        component:MarketPlace,
        name:"marketplace"
    },
    {
        path:'/signups',
        component:SignUps,
        name:"signups"
    },
    {
        path:'/manage_groups',
        component:ManageGroups,
        name:"managegroups"
    },
    {
        path:'/forgotpassword',
        component:ForgotPassword,
        name:"forgotpassword"
    },
    {
        path:'/password_update/:token',
        component:PasswordPage,
        name:"passwordupdate"
    },
    {
        path:'/jkl/:id/:title',
        component:DisPlay,
        name:"jk"
    },
    {
path:'/createpost',
component:CreatePost,
name:'createpost'
    },
    {
        path:'/dashboard',
        component:DashBoard,
        name:"dashboard"
    },
    {
        path:'/blog',
        component:DynamicRoute,
        name:"blog"
        
    },
    {
        path:'/blog/:id',
        component:BlogView,
        name:"blogview"
    },
    {
         path:'/event',
         component:EventParent,
        name:"event"
     },
    {
        path:'/register',
        component:HoneyWealthsignup,
        name:"register",
        
    },
    {
        path:'/profilepicture',
        component:ProfilePicture,
        name:"profilepicture"
    },
    {
        path: '/:pathMatch(.*)*',
       component:PageNotFound,
       name:"wildcard"
       }
    
  
    

]
const router=createRouter({
    history:createWebHistory(),
    routes
});
export default router
 