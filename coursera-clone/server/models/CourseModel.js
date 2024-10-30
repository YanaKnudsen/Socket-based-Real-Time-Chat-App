const mongoose=require('mongoose');
const {Schema}=mongoose;
// to-do: add duration of the course,institution when register maybe, add instructors from other users
const CourseSchema=new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId,ref:'UserModel'},
    title:String,
    description:String,
    languages:[String],
    level:String,
    skills:[String],
    cover:String,
    photos:[String],// choose one
    additionalInfo:String,
    startDate:String, //implement like a picker from the calender,
    certificate:Boolean,
});

const CourseModel=mongoose.model('Course',placeSchema);

module.exports = CourseModel;