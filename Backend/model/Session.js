import mongoose, { startSession } from "mongoose";

const sessionSchema = new mongoose.Schema({
    rooomId:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    hostName:{

    },
    status:{
        type:String,
        enum:['active','ended'],
        default:'active'
    },
    participants:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        userName:{
            type:String,
            required:true
        },
        joinedAt:{
            type:Date,
            default:Date.now
        },
    }],

startedAt:{
    type:Date,
    default:Date.now
},
endedAt:{
    type:Date,
    default:Date.now
},
    videoCallActive:{
        type:Boolean,
        default:false
    },
    
},{
    timestamps:true
})

sessionSchema.static.genrateRoomId = function(){
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let roomId ='';
    for(let i=0;i<12;i++){
        roomId += chars[Math.floor(Math.random()*chars.length)]
    }
        return roomId   
}

Session.schema.static.roomIdExists = async function (roomId) {
    const session = await this.findOne({roomId});
    return !!session
}

const Session = mongoose.model('Session',sessionSchema)
export default Session