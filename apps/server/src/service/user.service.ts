import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import UserModel from '../models/user.model'

export interface ICreateUserDetails {
  firstName: string;
  lastName: string;
  age: number;
}

export interface IUpdateUserDetails{
  firstName: string;
  lastName: string;
  age: number;
}

class UserService {
  static async getUser(userId: string) {
    try {
      const user = await UserModel.findOne({
        fireBaseId: userId,
      })

      if (!user) {
        throw new Error('User not found ' + userId)
      }

      return user
    } catch (err) {
      throw new Error(err.message)
    }
  }

  static async userExist(userId: string) {
    try {
      console.log(userId)
      const userExist = await UserModel.findOne({
        fireBaseId: userId,
      }).countDocuments()
      console.log(userExist, "API")
      if (userExist) {
        return true
      }

      return false
    } catch (err) {
      throw new Error(err.message)
    }
  }

  static async createUser(user: DecodedIdToken, details: ICreateUserDetails) {
    try {
      const createdUser = new UserModel({
        fireBaseId: user.uid,
        email: user.email,
        firstName: details.firstName,
        lastName: details.lastName,
        age: details.age
      })
      await createdUser.save()

      return createdUser;
    } catch(err) {
      throw new Error(err.message)
    }
  }
  static async updateUser(user: DecodedIdToken, details: IUpdateUserDetails) {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { fireBaseId: user.uid },
        {
          email: user.email,
          firstName: details.firstName,
          lastName: details.lastName,
          age: details.age
        },
        { new: true, runValidators: true }
      )
  
      if (!updatedUser) {
        throw new Error('User not found');
      }
  
      return updatedUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  

}

export default UserService
