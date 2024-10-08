import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { firebaseAuth } from '../firebase'
import { toast } from 'react-toastify'

export const UserContext = createContext<{
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}>({
  user: null,
  login: async () => {},
  logout: async () => {},
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
    } catch (err) {
      toast.error(err.message)
    }
  }

  const logout = async () => {
    try {
      await firebaseAuth.signOut()
      toast.success('Logged out successfully')
    } catch (err) {
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
    })

    return () => {
      authStateListener()
    }
  }, [firebaseAuth])

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserContextProviderWrapper>{children}</UserContextProviderWrapper>
}

export default UserContextProvider
