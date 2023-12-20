//c'est le modèle qui permet aux users de réagir aux commentaires de tous les users
const mongoose=require('mongoose')

const CommentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    postId:{ //permet de faire fetch sur comment. Récuper le commentaire de l'user et l'afficher en frontend
        type:String,
        required:true,
    },
    userId:{ // permet de récupérer le détail du commentaire
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("Comment",CommentSchema)