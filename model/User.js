import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    emailVerified:{
        type:Boolean,
        required:true
    },
    displayName:{
        type:String,
        required:true
    },
    isAnonymous:{
        type:Boolean
    },
    photoURL:{
        type:String,
        required:true
    },
    providerData:{
        type:Array
    },
    stsTokenManager:{
        type:Object
    },
    createdAt:{
        type:String
    },
    lastLoginAt:{
        type:String
    },
    apiKey:{
        type:String
    },
    appName:{
        type:String
    }
})

const user = mongoose.model('user',userSchema);

export default user;