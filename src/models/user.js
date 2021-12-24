const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email!');
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        validate(value){
            if(value.length < 7){
                throw new Error('Password must contain at least 7 characters.');
            }
            if(value.toLowerCase().includes("password")){
                throw new Error('Cannot use the word "password" as password.');
            }
        }

    },
    age : {
        type : Number,
        default : 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number!');
            }
        }
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }],
    avatar : {
        type : Buffer
    }
},{
    timestamps : true
});

userSchema.virtual('tasks',{
    ref : 'Task',
    localField : '_id',
    foreignField : 'owner' 
});

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    
    return userObject;
};
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET);
    user.tokens.push({token});
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({ email });
    if(!user){
        throw new Error("Unable to login!");
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Unable to login!');
    }
    return user;

};


// Hash the plain text password before saving

userSchema.pre('save',async function(next){    
    if(this.isModified('password')){
        try{
            const password = this.password;
            const hashedPassword = await bcrypt.hash(password,8);
            this.password = hashedPassword;
        }catch(e){
            console.log(e);
        }
    }
    
    next();
});



// Delete user tasks when a user is removed

userSchema.pre('remove',async function(next){
    const user = this;
    await Task.deleteMany({owner : user._id});
    next();
});


const User = mongoose.model('User',userSchema);

module.exports = User;