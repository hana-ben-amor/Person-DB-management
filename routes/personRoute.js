const express = require('express')
const router = express.Router();
const Person = require("../models/personSchema")
//Create and Save a or more Record of a Model
router.post("/newPerson",(req,res)=>{
    let newPerson = new Person(req.body)
    newPerson.save((err,data)=>{
        if(err) throw err
        else res.send(data)
    })
})
//add multiple records using Model.create
router.post("/newPeople",(req,res)=>{    
    Person.create({name:"Baha",age:30,favoriteFoods:["JunkFood","Burritos"]},{name:"Ahmed",age:12,favoriteFoods:["Burritos"]},{name:"Samar",age:49,favoriteFoods:["Burritos"]},
    (err, people) => {
        if (err) return console.log(err);
        res.json({Response:"People are added Successfully..."})
      })
})
//Find all people records by their names using model.find
router.get("/findByName",(req,res)=>{
    Person.find({name:"Hana"},
        (err,data)=>{
        if (err) throw err
        else res.json(data)
    })
})
//Find just one person who loves a certain food using model.findOne
router.get("/findOneFood/:food",(req,res)=>{
    Person.findOne({favoriteFoods:req.params.food},
        (err,data)=>{
        if (err) throw err
        else res.json(data)
    })
})

//Find the only person by its ID
router.get("/findOneById/:personId",(req,res)=>{
    Person.find({_id:req.params.personId},
        (err,data)=>{
        if (err) throw err
        else res.json(data)
    })
})


//FIND BY ID ,EDIT THEN SAVE


//i have 2 solution one with the food to be added as params and one with food as hamburger
//1st solution
//add to a person's list of favorite food the food in the params
router.put("/findEditThenSave/:personId/:food",(req,res)=>{
    Person.findByIdAndUpdate({_id:req.params.personId},{$push:{favoriteFoods:req.params.food}},(err,data)=>{
        if (err) throw err
        else {
            Person.save(data);
            res.json(data);
        }
    })})
//2nd solution
router.put("/findEditThenSave/:personId",(req,res)=>{
    Person.findByIdAndUpdate({_id:req.params.personId},{$push:{favoriteFoods:"hamburger"}},({new:true}),(err,data)=>{
        if (err) throw err
        else {
            res.json(data)
            Person.save(data);
            
        }
    })})


    //find one person by name and set its age to 20 then return the new updated record
    router.put("/findNameEditAge/:personName",(req,res)=>{
        Person.findOneAndUpdate({name:req.params.personName},{$set:{age:20}},({new:true}),(err,data)=>{
            if (err) throw err
            else {
                res.json(data)
                Person.save(data);
                
            }
        })})

//delete on person by its id and returns the doccument deleted in DB
        router.delete("/findAndDeleteOne/:personId",(req,res)=>{
            Person.findByIdAndRemove({_id:req.params.personId},(err,data)=>{
                if (err) throw err
                else {
                    res.json({msg:"deleted document",data})
                }
            })})

   //delete all perople with name of Mary
            router.delete("/findAndDeleteMany",(req,res)=>{
                Person.remove({name:"Mary"},(err,data)=>{
                    if (err) throw err
                    else {
                        res.json({msg:"deleted document",data})
                    }
                })})
//Find people who like burritos. Sort them by name, limit the results to two documents, and hide their age
        router.get("/helpers",(req,res)=>{
            var foodToSearch = "Burritos";
            Person
            .find({favoriteFoods:foodToSearch})
            .sort({name:1})
            .limit(2)
            .select({age:false})
            .exec((err,data) => {
            if (err) return console.log(err);
            res.json(data)
            });
        })
module.exports=router;