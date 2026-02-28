import { useState } from 'react'
import styled from '@emotion/styled'
import { useAuth } from '../contexts/AuthContext'

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 3rem;
  max-width: 450px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const Logo = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 20px;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  font-size: 2rem;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
`

const Input = styled.input`
  padding: 0.875rem;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #aaa;
  }
`

const Button = styled.button`
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const ErrorMessage = styled.div`
  padding: 0.875rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c33;
  font-size: 0.9rem;
  text-align: center;
`

const DemoInfo = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
  font-size: 0.85rem;
  color: var(--text-secondary);
`

const DemoTitle = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
`

const DemoAccount = styled.div`
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  font-family: monospace;
`

export const Login: React.FC = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword('demo123')
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <Logo src="/logo.jpeg" alt="Pixel Phonics Logo" />
          <Title>Pixel Phonics</Title>
          <Subtitle>Empowering learners with dyslexia</Subtitle>
        </LogoContainer>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Form>

        <DemoInfo>
          <DemoTitle>Demo Accounts (Click to fill):</DemoTitle>
          <DemoAccount onClick={() => fillDemo('student@demo.com')} style={{ cursor: 'pointer' }}>
            👨‍🎓 Student: student@demo.com
          </DemoAccount>
          <DemoAccount onClick={() => fillDemo('teacher@demo.com')} style={{ cursor: 'pointer' }}>
            👩‍🏫 Teacher: teacher@demo.com
          </DemoAccount>
          <DemoAccount onClick={() => fillDemo('parent@demo.com')} style={{ cursor: 'pointer' }}>
            👨‍👩‍👧 Parent: parent@demo.com
          </DemoAccount>
          <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
            Password for all: <strong>demo123</strong>
          </div>
        </DemoInfo>
      </LoginCard>
    </LoginContainer>
  )
}
