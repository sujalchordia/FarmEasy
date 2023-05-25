const express=require("express");
const food_items = require("../models/FoodItems");
const router=express.Router();

router.post("/listitems",async(req,res)=>{
    try {
        let fooditem= await food_items.findById(req.body._id)
        let reviews=fooditem.reviews
        res.json({
           reviews
        })
    } catch (error) {
        console.log(error.message)
    }
})

router.post("/addreviews",async(req,res)=>{
    try {
        let fooditem= await food_items.findById(req.body._id)
        let reviews=fooditem.reviews
        reviews.push({
            img:req.body.img,
            by:req.body.by,
            description:req.body.description,
            stars:req.body.stars
        })
        console.log(reviews)
        await food_items.findByIdAndUpdate(req.body._id,{reviews:reviews}).then(()=>{
            res.json({
                success:true,
            })
        })
    } catch (error) {
        console.log(error.message)
    }
})
router.post("/deletereviews",async(req,res)=>{
    try {
        let fooditem= await food_items.findById(req.body._id)
        const newreview=fooditem.reviews.filter((r)=>{
            if(req.body.by!=r.by){
                return true;
            } 
            return false
        })
        await food_items.findByIdAndUpdate(req.body._id,{reviews:newreview}).then(()=>{
            res.json({
                success:true,
            })
        })
    } catch (error) {
        console.log(error.message)
    }
})
router.post("/updatereviews",async(req,res)=>{
    try {
        let fooditem= await food_items.findById(req.body._id)
        const newreview=fooditem.reviews.map((r)=>{
            if(req.body.by===r.by){
                return({
                img:req.body.img,
                by:req.body.by,
                description:req.body.description,
                stars:req.body.stars
                })
            }else{
                return r
            }
        })
        await food_items.findByIdAndUpdate(req.body._id,{reviews:newreview}).then(()=>{
            res.json({
                success:true,
            })
        })
    } catch (error) {
        console.log(error.message)
    }
})

module.exports=router