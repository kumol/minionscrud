const { default: mongoose } = require("mongoose");
const Minion = require("../db/model/Minion");

module.exports = {
    createMinion: async(req,res)=>{
        try{
            let {color, age, name} = req.body;
            let minion = new Minion({
                name: name,
                age: age,
                color: color
            });
            minion = await minion.save();
            return res.json({
                statusCode: "201",
                success: true,
                message: "Minion Created",
                body: minion
            });
        }catch(err){
            return res.json({
                statusCode: "500",
                success: false,
                message: err.message,
                body: err.stack
            });
        }
    },
    getMinion: async(req,res)=>{
        try{
            let {page, limit} = req.query;
            let total = await Minion.countDocuments({});
            page = page ? +page: 1;
            limit = limit ? +limit: total;
            minion = await Minion.find({}).sort({_id: -1}).skip((page-1)*limit).limit(limit).lean();

            return minion && minion.length > 0 ? res.json({
                statusCode: "200",
                success: true,
                message: "Minion Created",
                page: page,
                limit: limit,
                total: total,
                body: minion
            }) : res.json({
                statusCode: "204",
                success: false,
                message: "No minion found",
                page: page,
                limit: limit,
                total: total,
                body: minion
            });
        }catch(err){
            return res.json({
                statusCode: "500",
                success: false,
                message: err.message,
                body: err.stack
            });
        }
    },
    updateMinion: async(req,res)=>{
        try{
            let {id} = req.params;
            let {color, age, name} = req.body;

            let updateObj = {};
            color ? updateObj.color = color : null;
            age ? updateObj.age = age : null;
            name ? updateObj.name = name : null;

            let updateedMinion = await Minion.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {$set: updateObj}, {new: true, runValidators: true});

            return res.json({
                success: true,
                statusCode: 200,
                message: "Updated",
                body: updateedMinion
            })
        }catch(err){
            return res.json({
                statusCode: "500",
                success: false,
                message: err.message,
                body: err.stack
            });
        }
    },
    deleteMinion:async(req,res)=>{
        try{
            let {id} = req.params;
            await Minion.deleteOne({_id: mongoose.Types.ObjectId(id)});
            return res.json({
                success: true,
                statusCode: 200,
                message: "Deleted",
                body: {}
            })
        }catch(err){
            return res.json({
                statusCode: "500",
                success: false,
                message: err.message,
                body: err.stack
            });
        }
    }
}