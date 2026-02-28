import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'teacher' | 'parent'
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored session on mount
    const storedUser = localStorage.getItem('pixel_phonics_user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser({
          ...parsedUser,
          createdAt: new Date(parsedUser.createdAt),
        })
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('pixel_phonics_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true)
    try {
      // Mock authentication - in production, this would call a backend API
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Demo users for testing
      const demoUsers: Record<string, User> = {
        'student@demo.com': {
          id: 'student-1',
          name: 'Alex Student',
          email: 'student@demo.com',
          role: 'student',
          createdAt: new Date(),
        },
        'teacher@demo.com': {
          id: 'teacher-1',
          name: 'Ms. Johnson',
          email: 'teacher@demo.com',
          role: 'teacher',
          createdAt: new Date(),
        },
        'parent@demo.com': {
          id: 'parent-1',
          name: 'Parent Smith',
          email: 'parent@demo.com',
          role: 'parent',
          createdAt: new Date(),
        },
      }

      const authenticatedUser = demoUsers[email]
      
      if (!authenticatedUser || password !== 'demo123') {
        throw new Error('Invalid email or password')
      }

      setUser(authenticatedUser)
      localStorage.setItem('pixel_phonics_user', JSON.stringify(authenticatedUser))
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('pixel_phonics_user')
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
