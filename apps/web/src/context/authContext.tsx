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

export const UserContext = createContext<{
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: (showToast: boolean) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isVerified: boolean
  sendVerificationEmail: () => Promise<void>
  verifyEmailCode: (code: string) => Promise<void>
}>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  setIsLoading: () => {},
  isVerified: false,
  sendVerificationEmail: async () => {},
  verifyEmailCode: async () => {},
})

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider')
  }
  return context
}

type Props = { children: React.ReactNode }
export const UserContextProviderWrapper = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
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
  console.log(isLoading, isVerified)

  useEffect(() => {
    const authStateListener = onAuthStateChanged(firebaseAuth, async (user) => {
      setIsLoading(true)
      if (user) {
        console.log('loggedin', user)
        setUser(user)
        setIsVerified(user.emailVerified)
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

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        setIsLoading,
        isVerified,
        sendVerificationEmail,
        verifyEmailCode,
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
