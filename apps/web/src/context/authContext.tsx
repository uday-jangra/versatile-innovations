import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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
  logout: () => Promise<void>
  register: (email: string, password: string) => Promise<void>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  setIsLoading: () => {},
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

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
      toast.success('Logged in successfully')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const logout = async () => {
    try {
      await firebaseAuth.signOut()
      toast.success('Logged out successfully')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const register = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
      toast.success(
        'Registered successfully! Please check your email to verify your account'
      )
      // const user = userCredential.user

      // Send email verification
      // await sendEmailVerification(user);
      await logout()
    } catch (err: any) {
      toast.error(err.message)
    }
  }
  console.log(isLoading)

  useEffect(() => {
    const authStateListener = onAuthStateChanged(firebaseAuth, async (user) => {
      setIsLoading(true)
      if (user) {
        console.log('loggedin', user)
        setUser(user)
      } else {
        console.log('notloggedin')
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => {
      authStateListener()
    }
  }, [firebaseAuth])

  return (
    <UserContext.Provider
      value={{ user, login, logout, register, setIsLoading }}
    >
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  )
}

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserContextProviderWrapper>{children}</UserContextProviderWrapper>
}

export default UserContextProvider
