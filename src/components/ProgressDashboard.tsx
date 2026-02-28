import styled from '@emotion/styled'

const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1rem;
  }
`

const Title = styled.h2`
  color: #333333;
  margin-bottom: 2rem;
  font-weight: 700;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
`

const StatIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--button-primary);
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 1rem;
  color: #555555;
  font-weight: 600;
`

const Section = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`

const SectionTitle = styled.h3`
  color: #333333;
  margin-bottom: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`

const Achievement = styled.div<{ unlocked: boolean }>`
  padding: 1.5rem 1rem;
  background: ${props => props.unlocked ? '#F0F8FF' : '#F5F5F5'};
  border: 2px solid ${props => props.unlocked ? 'var(--button-primary)' : '#E0E0E0'};
  border-radius: 12px;
  text-align: center;
  opacity: ${props => props.unlocked ? 1 : 0.5};
`

const AchievementIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`

const AchievementName = styled.div`
  font-size: 0.85rem;
  color: #333333;
  font-weight: 600;
`

const ProgressBarContainer = styled.div`
  margin: 1.5rem 0;
`

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555555;
  font-weight: 600;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 24px;
  background: #E0E0E0;
  border-radius: 12px;
  overflow: hidden;
`

const ProgressFill = styled.div<{ progress: number; color: string }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  transition: width 0.3s ease;
`

export const ProgressDashboard: React.FC = () => {
  // Mock data - in production, this would come from the backend
  const stats = {
    totalExercises: 47,
    totalTime: 3.2, // hours
    currentStreak: 5, // days
    phonologicalAccuracy: 85,
    rapidNamingSpeed: 72,
  }

  const achievements = [
    { id: 1, icon: '🌟', name: 'First Steps', unlocked: true },
    { id: 2, icon: '🔥', name: '5 Day Streak', unlocked: true },
    { id: 3, icon: '📚', name: '25 Exercises', unlocked: true },
    { id: 4, icon: '⚡', name: 'Speed Master', unlocked: false },
    { id: 5, icon: '🎯', name: '90% Accuracy', unlocked: false },
    { id: 6, icon: '🏆', name: '100 Exercises', unlocked: false },
  ]

  return (
    <Container>
      <Title>My Progress</Title>

      <StatsGrid>
        <StatCard>
          <StatIcon role="img" aria-label="Exercise icon">📚</StatIcon>
          <StatValue>{stats.totalExercises}</StatValue>
          <StatLabel>Exercises Completed</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon role="img" aria-label="Time icon">⏱️</StatIcon>
          <StatValue>{stats.totalTime}h</StatValue>
          <StatLabel>Total Practice Time</StatLabel>
        </StatCard>

        <StatCard>
          <StatIcon role="img" aria-label="Streak icon">🔥</StatIcon>
          <StatValue>{stats.currentStreak}</StatValue>
          <StatLabel>Day Streak</StatLabel>
        </StatCard>
      </StatsGrid>

      <Section>
        <SectionTitle>
          <span role="img" aria-label="Chart icon">📊</span>
          Skill Progress
        </SectionTitle>

        <ProgressBarContainer>
          <ProgressLabel>
            <span>Phonological Awareness</span>
            <span>{stats.phonologicalAccuracy}%</span>
          </ProgressLabel>
          <ProgressBar>
            <ProgressFill 
              progress={stats.phonologicalAccuracy} 
              color="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
            >
              {stats.phonologicalAccuracy}%
            </ProgressFill>
          </ProgressBar>
        </ProgressBarContainer>

        <ProgressBarContainer>
          <ProgressLabel>
            <span>Rapid Naming Speed</span>
            <span>{stats.rapidNamingSpeed}%</span>
          </ProgressLabel>
          <ProgressBar>
            <ProgressFill 
              progress={stats.rapidNamingSpeed} 
              color="linear-gradient(90deg, #f093fb 0%, #f5576c 100%)"
            >
              {stats.rapidNamingSpeed}%
            </ProgressFill>
          </ProgressBar>
        </ProgressBarContainer>
      </Section>

      <Section>
        <SectionTitle>
          <span role="img" aria-label="Trophy icon">🏆</span>
          Achievements
        </SectionTitle>

        <AchievementGrid>
          {achievements.map(achievement => (
            <Achievement key={achievement.id} unlocked={achievement.unlocked}>
              <AchievementIcon>{achievement.icon}</AchievementIcon>
              <AchievementName>{achievement.name}</AchievementName>
            </Achievement>
          ))}
        </AchievementGrid>
      </Section>
    </Container>
  )
}
