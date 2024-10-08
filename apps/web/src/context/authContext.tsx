import { onAuthStateChanged, User } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { firebaseAuth } from '../firebase'

export const UserContext = createContext<{
  user: User | null
}>({
  user: null,
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

  const login = (user: User) => {
    setUser(user)
    setIsLoading(false)
  }

  console.log(isLoading)

  useEffect(() => {
    const authStateListener = onAuthStateChanged(firebaseAuth, async (user) => {
      setIsLoading(true)
      if (user) {
        console.log('loggedin', user)
        login(user)
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
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserContextProviderWrapper>{children}</UserContextProviderWrapper>
}

export default UserContextProvider
