const express = require("express")
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Post = require('../models/Post')
const Comment = require('../models/comment')
const verifyToken = require("../verifyToken")



//CREATE  route ecrire un article
router.post("/create", verifyToken,async (req,res)=>{
    try{
        const newPost=new Post(req.body)
        // console.log(req.body)
        const savedPost=await newPost.save()        
        res.status(200).json(savedPost)
    }
    catch(err){        
        res.status(500).json(err)
    }
     
})






//UPDATE POST USER  l'user met à jour l'article qu'il a écrit
router.put("/:id", verifyToken, async (req,res)=>{
    try{    
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})









//DELETE POST USER l'user supprime l'article qu'il a écrit
router.delete("/:id", verifyToken, async (req,res)=>{
    try{
       await Post.findByIdAndDelete(req.params.id)
       await Comment.deleteMany({postId:req.params.id})
       res.status(200).json("post has been deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
})








//GET POST DETAILS voir le détail de l'article d'un user
router.get("/:id",async (req,res)=>{
    try{
       const post = await Post.findById(req.params.id)      
       res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//formulaire de recherche d'un article sur la page accueil
//GET POSTS REcuperer les posts  de tous les users  
router.get("/", async (req,res)=>{
    const query = req.query
   // console.log(query);
    try{
        const searchFilter = {
            title:{$regex:query.search, $options:"i"}
        }
       const posts = await Post.find(query.search?searchFilter:null)      
       res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})



//GET USER POSTS récuperer tous les posts d'un user en particulier
router.get("/user/:userId", async (req,res)=>{
    try{
       const posts = await Post.find({userId:req.params.userId})      
       res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})




module.exports = router