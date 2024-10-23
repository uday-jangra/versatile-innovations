import SubjectModel from '../models/subject.model'
import UserSubjectModel from '../models/userSubject.model';
import UserService from './user.service';


class SubjectService {
  static async getSubjects(userId: string) {
    try {

      const user = await UserService.getUser(userId);
      const subjects = await SubjectModel.find({});

      subjects.map(async (subject) => {
        let userSubject = await UserSubjectModel.findOne({ subjectId: subject._id, userId: user._id })

        if (!userSubject) {
          const newSubject = await UserSubjectModel.create([{ subjectId: subject._id, userId: user._id, userLevel: 0, levelsPurchased: [] }])
          userSubject = newSubject[0]
        }
        subject._userLevel = userSubject.userLevel
      })

      return subjects
    } catch (err) {
      throw new Error(err.message)
    }
  }

  static async getSubject(id: number) {
    try {
      const subject = await SubjectModel.findOne({ id });
      if (!subject) {
        throw new Error("Subject not found")
      }
      return subject
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default SubjectService
