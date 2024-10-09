/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  applyActionCode,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { firebaseAuth } from '../firebase'
import { toast } from 'react-toastify'
import Loader from '../components/Spinner'
import axios from 'axios'

export const UserContext = createContext<{
  user: User | null
  userDetails: UserDetails | null
  login: (email: string, password: string) => Promise<void>
  logout: (showToast: boolean) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isVerified: boolean
  sendVerificationEmail: () => Promise<void>
  verifyEmailCode: (code: string) => Promise<void>
  isFirstTimeUser: boolean
  createUser: (
    firstName: string,
    lastName: string,
    age: number
  ) => Promise<void>
}>({
  user: null,
  userDetails: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  setIsLoading: () => {},
  isVerified: false,
  sendVerificationEmail: async () => {},
  verifyEmailCode: async () => {},
  isFirstTimeUser: true,
  createUser: async () => {},
})

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider')
  }
  return context
}

export interface UserDetails {
  firstName: string
  lastName: string
  age: number
  points: number
  score: number
}

type Props = { children: React.ReactNode }
export const UserContextProviderWrapper = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true)
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
      toast.success('Logged in successfully')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const logout = async (showToast: boolean) => {
    try {
      await firebaseAuth.signOut()
      if (showToast) {
        toast.success('Logged out successfully')
      }
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const sendVerificationEmail = async () => {
    try {
      if (user) {
        await sendEmailVerification(user)
        toast.success('Verification email sent')
      } else {
        toast.error('User not logged in')
      }
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const verifyEmailCode = async (code: string) => {
    try {
      await applyActionCode(firebaseAuth, code)
      toast.success('Email verified! Login to continue')
      await logout(false)
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
      toast.success(
        'Registered successfully! Please check your email to verify your account'
      )
      const user = userCredential.user

      await sendEmailVerification(user)
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const getUserDetails = async (user: User) => {
    try {
      const userDetails = await axios.get(
        import.meta.env.VITE_API_URL + 'auth/user',
        {
          headers: {
            Authorization: `Bearer ${await user?.getIdToken()}`,
          },
        }
      )

      return userDetails
    } catch (err: any) {
      console.log(err)
      toast.error(err.message)
    }
  }

  const createUser = async (
    firstName: string,
    lastName: string,
    age: number
  ) => {
    try {
      const createdUser = await axios.post(
        import.meta.env.VITE_API_URL + 'auth/createUser',
        {
          firstName,
          lastName,
          age,
        },
        {
          headers: {
            Authorization: `Bearer ${await user?.getIdToken()}`,
          },
        }
      )

      setUserDetails({
        firstName: createdUser.data.firstName,
        lastName: createdUser.data.lastName,
        age: createdUser.data.age,
        points: createdUser.data.points,
        score: createdUser.data.score,
      })
      setIsFirstTimeUser(false)
      toast.success('Registration Success')
    } catch (err: any) {
      console.log(err)
      toast.error(err.message)
    }
  }
  useEffect(() => {
    const authStateListener = onAuthStateChanged(firebaseAuth, async (user) => {
      setIsLoading(true)
      if (user) {
        console.log('loggedin', user)
        setUser(user)
        setIsVerified(user.emailVerified)
        console.log(await user.getIdToken())
        const userDetails = await getUserDetails(user)
        console.log(userDetails)
        setIsFirstTimeUser(!userDetails?.data.exists)
        if (userDetails?.data.exists) {
          setUserDetails({
            firstName: userDetails.data.user.firstName,
            lastName: userDetails.data.user.lastName,
            age: userDetails.data.user.age,
            points: userDetails.data.user.points,
            score: userDetails.data.user.score,
          })
        }
      } else {
        console.log('notloggedin')
        setUser(null)
        setIsVerified(false)
      }
      setIsLoading(false)
    })

    return () => {
      authStateListener()
    }
  }, [firebaseAuth])

  console.log(isFirstTimeUser, 'FIRSTTIME')

  return (
    <UserContext.Provider
      value={{
        user,
        userDetails,
        login,
        logout,
        register,
        setIsLoading,
        isVerified,
        isFirstTimeUser,
        sendVerificationEmail,
        verifyEmailCode,
        createUser,
      }}
    >
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  )
}

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserContextProviderWrapper>{children}</UserContextProviderWrapper>
}

export default UserContextProvider
