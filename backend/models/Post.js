// c'est le modèle qui permet à l'user d'écrire un article
const mongoose=require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        required:false,
        
    },
    username:{ // c'est l'auteur de l'article
        type:String,
        required:true,  
    },
    userId:{//grace à userId cela permet de récupérer l'article de l'user qu'on cible pour voir les détails
        type:String,
        required:true,  
    },
    categories:{
        type:Array,
        
    },
},{timestamps:true})

module.exports=mongoose.model("Post",PostSchema)