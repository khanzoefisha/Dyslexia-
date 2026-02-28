import { useState } from 'react'
import styled from '@emotion/styled'
import { useAuth } from '../contexts/AuthContext'
import { PhonologicalTraining } from './PhonologicalTraining'
import { SpeedTraining } from './SpeedTraining'
import { ProgressDashboard } from './ProgressDashboard'
import { ThemeCustomizer } from './ThemeCustomizer'
import { SpellingGame } from './SpellingGame'
import { VisualDyslexia } from './VisualDyslexia'

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #FFFDD0; /* Cream background */
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Sidebar = styled.aside<{ collapsed: boolean }>`
  width: 280px;
  background: #2C3E50; /* Dark blue-grey for better contrast */
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 100;

  @media (max-width: 768px) {
    left: ${props => props.collapsed ? '-280px' : '0'};
    transition: left 0.3s ease;
    box-shadow: ${props => props.collapsed ? 'none' : '4px 0 10px rgba(0, 0, 0, 0.3)'};
  }
`

const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
`

const Logo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 10px;
  background: white;
  padding: 5px;
`

const AppName = styled.div<{ collapsed: boolean }>`
  font-size: 1.3rem;
  font-weight: 700;
  white-space: nowrap;
`

const CollapseButton = styled.button`
  display: none; /* Hide on desktop since sidebar is always visible */

  @media (max-width: 768px) {
    display: none; /* Not needed, using mobile menu button instead */
  }
`

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: white;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 1.5rem;
  z-index: 999;

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    background: #f8f9fa;
  }
`

const Overlay = styled.div<{ visible: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${props => props.visible ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`

const Nav = styled.nav`
  flex: 1;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const NavItem = styled.button<{ active: boolean; collapsed: boolean }>`
  width: 100%;
  padding: 1.125rem 1.5rem;
  background: ${props => props.active ? 'rgba(52, 152, 219, 0.15)' : 'transparent'};
  border: none;
  border-left: 4px solid ${props => props.active ? '#3498DB' : 'transparent'};
  color: ${props => props.active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)'};
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? '700' : '500'};
  letter-spacing: 0.02em;

  &:hover {
    background: rgba(52, 152, 219, 0.1);
    border-left-color: #3498DB;
    color: #FFFFFF;
  }

  span:first-of-type {
    font-size: 1.4rem;
    min-width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span:last-of-type {
    white-space: nowrap;
    flex: 1;
  }
`

const UserSection = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
`

const UserInfo = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
`

const UserAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498DB 0%, #2980B9 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`

const UserDetails = styled.div<{ collapsed: boolean }>`
  overflow: hidden;
`

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  color: #FFFFFF;
`

const UserRole = styled.div`
  font-size: 0.75rem;
  opacity: 0.75;
  text-transform: capitalize;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.8);
`

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(231, 76, 60, 0.15);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 8px;
  color: #FFFFFF;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(231, 76, 60, 0.25);
    border-color: rgba(231, 76, 60, 0.5);
  }

  &::before {
    content: "🚪";
    font-size: 1.1rem;
  }
`

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px; /* Account for fixed sidebar */
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`

const TopBar = styled.div`
  background: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem 1rem 1rem 4.5rem;
  }
`

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: #333333; /* Dark charcoal */
  margin: 0;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`

const ContentArea = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const WelcomeCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const WelcomeTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`

const WelcomeText = styled.p`
  font-size: 1.1rem;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

type View = 'home' | 'training' | 'speed' | 'progress' | 'games' | 'visual-dyslexia' | 'settings'

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const [currentView, setCurrentView] = useState<View>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (!user) return null

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  const getPageTitle = () => {
    switch (currentView) {
      case 'home': return 'Dashboard'
      case 'training': return 'Phonological Training'
      case 'speed': return 'Speed Training'
      case 'progress': return 'My Progress'
      case 'games': return 'Spelling Game'
      case 'visual-dyslexia': return 'Visual Dyslexia'
      case 'settings': return 'Settings'
      default: return 'Dashboard'
    }
  }

  const handleNavClick = (view: View) => {
    setCurrentView(view)
    setMobileMenuOpen(false)
  }

  return (
    <DashboardContainer>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
        ☰
      </MobileMenuButton>

      <Overlay visible={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />

      <Sidebar collapsed={!mobileMenuOpen}>
        <SidebarHeader>
          <Logo src="/logo.jpeg" alt="Logo" />
          <AppName collapsed={false}>Pixel Phonics</AppName>
        </SidebarHeader>

        <Nav>
          <NavItem
            active={currentView === 'home'}
            collapsed={false}
            onClick={() => handleNavClick('home')}
            aria-label="Home"
          >
            <span role="img" aria-label="Home icon">🏠</span>
            <span>Home</span>
          </NavItem>

          <NavItem
            active={currentView === 'training'}
            collapsed={false}
            onClick={() => handleNavClick('training')}
            aria-label="Phonological Training"
          >
            <span role="img" aria-label="Book icon">📚</span>
            <span>Phonological Training</span>
          </NavItem>

          <NavItem
            active={currentView === 'speed'}
            collapsed={false}
            onClick={() => handleNavClick('speed')}
            aria-label="Speed Training"
          >
            <span role="img" aria-label="Lightning icon">⚡</span>
            <span>Speed Training</span>
          </NavItem>

          <NavItem
            active={currentView === 'progress'}
            collapsed={false}
            onClick={() => handleNavClick('progress')}
            aria-label="My Progress"
          >
            <span role="img" aria-label="Chart icon">📊</span>
            <span>My Progress</span>
          </NavItem>

          <NavItem
            active={currentView === 'games'}
            collapsed={false}
            onClick={() => handleNavClick('games')}
            aria-label="Games"
          >
            <span role="img" aria-label="Game icon">🎮</span>
            <span>Games</span>
          </NavItem>

          <NavItem
            active={currentView === 'visual-dyslexia'}
            collapsed={false}
            onClick={() => handleNavClick('visual-dyslexia')}
            aria-label="Visual Dyslexia"
          >
            <span role="img" aria-label="Eye icon">👁️</span>
            <span>Visual Dyslexia</span>
          </NavItem>

          <NavItem
            active={currentView === 'settings'}
            collapsed={false}
            onClick={() => handleNavClick('settings')}
            aria-label="Settings"
          >
            <span role="img" aria-label="Settings icon">⚙️</span>
            <span>Settings</span>
          </NavItem>
        </Nav>

        <UserSection>
          <UserInfo collapsed={false}>
            <UserAvatar>{getInitials(user.name)}</UserAvatar>
            <UserDetails collapsed={false}>
              <UserName>{user.name}</UserName>
              <UserRole>{user.role}</UserRole>
            </UserDetails>
          </UserInfo>
          <LogoutButton onClick={logout}>
            Logout
          </LogoutButton>
        </UserSection>
      </Sidebar>

      <MainContent>
        <TopBar>
          <PageTitle>{getPageTitle()}</PageTitle>
        </TopBar>

        <ContentArea>
          {currentView === 'home' && (
            <>
              <WelcomeCard>
                <WelcomeTitle>Welcome back, {user.name.split(' ')[0]}! 👋</WelcomeTitle>
                <WelcomeText>
                  Ready to continue your learning journey? Let's make today count!
                </WelcomeText>
              </WelcomeCard>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <QuickActionCard onClick={() => setCurrentView('training')}>
                  <CardIcon>📚</CardIcon>
                  <CardTitle>Start Training</CardTitle>
                  <CardDescription>Practice phonological awareness</CardDescription>
                </QuickActionCard>

                <QuickActionCard onClick={() => setCurrentView('speed')}>
                  <CardIcon>⚡</CardIcon>
                  <CardTitle>Speed Drills</CardTitle>
                  <CardDescription>Improve reading fluency</CardDescription>
                </QuickActionCard>

                <QuickActionCard onClick={() => setCurrentView('progress')}>
                  <CardIcon>📊</CardIcon>
                  <CardTitle>View Progress</CardTitle>
                  <CardDescription>Track your achievements</CardDescription>
                </QuickActionCard>
              </div>
            </>
          )}

          {currentView === 'training' && <PhonologicalTraining />}
          
          {currentView === 'speed' && <SpeedTraining />}

          {currentView === 'progress' && <ProgressDashboard />}

          {currentView === 'games' && <SpellingGame />}

          {currentView === 'visual-dyslexia' && <VisualDyslexia userId={user.id} />}

          {currentView === 'settings' && <ThemeCustomizer userId={user.id} />}
        </ContentArea>
      </MainContent>
    </DashboardContainer>
  )
}

const QuickActionCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
`
