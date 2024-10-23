import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjectId: {
    type: mongoose.Types.ObjectId,
    ref: 'subjects',
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  isPayable: {
    type: Boolean,
    required: true,
    default: false,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },

}, { timestamps: true })

const CourseModel = mongoose.model('course', courseSchema)
export default CourseModel
