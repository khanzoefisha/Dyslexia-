import { useState } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
  }
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333333;
  font-weight: 700;
`

const ScoreBoard = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #F5F5DC;
  border-radius: 8px;
`

const ScoreItem = styled.div`
  text-align: center;
`

const ScoreLabel = styled.div`
  font-size: 0.9rem;
  color: #555555;
  margin-bottom: 0.25rem;
`

const ScoreValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--button-primary);
`

const WordDisplay = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  margin-bottom: 2rem;
`

const TargetWord = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`

const WordHint = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`

const InputSection = styled.div`
  margin-bottom: 2rem;
`

const InputLabel = styled.label`
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 1rem;
  text-align: center;
`

const InputBox = styled.input`
  width: 100%;
  padding: 1.5rem;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  border: 3px solid #CCCCCC;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  background: #FFFDD0;

  &:focus {
    outline: none;
    border-color: var(--button-primary);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 1.25rem;
  }
`

const Keyboard = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #F8F9FA;
  border-radius: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.3rem;
  }
`

const KeyButton = styled.button`
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  background: white;
  color: #333333;
  border: 2px solid #CCCCCC;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--button-primary);
    color: white;
    border-color: var(--button-primary);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 1rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'success' }>`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  background: ${props => 
    props.variant === 'secondary' ? 'white' : 
    props.variant === 'success' ? '#4CAF50' :
    'var(--button-primary)'
  };
  color: ${props => props.variant === 'secondary' ? '#333333' : 'white'};
  border: ${props => props.variant === 'secondary' ? '2px solid #CCCCCC' : 'none'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => 
      props.variant === 'secondary' ? '#f8f9fa' : 
      props.variant === 'success' ? '#45A049' :
      'var(--button-hover)'
    };
  }

  @media (max-width: 480px) {
    flex: 1;
    min-width: 140px;
  }
`

const FeedbackBox = styled.div<{ type: 'success' | 'error' }>`
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 12px;
  background: ${props => props.type === 'success' ? '#E8F5E9' : '#FFEBEE'};
  border: 3px solid ${props => props.type === 'success' ? '#4CAF50' : '#F44336'};
  text-align: center;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const FeedbackText = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #333333;
  margin-bottom: 0.5rem;
`

const FeedbackEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 0.5rem;
`

const EncouragementText = styled.div`
  font-size: 1rem;
  color: #555555;
  font-weight: 600;
`

// Word list for the game
const GAME_WORDS = [
  { word: 'cat', hint: 'A furry pet that says meow' },
  { word: 'dog', hint: 'A loyal pet that barks' },
  { word: 'sun', hint: 'Bright light in the sky' },
  { word: 'moon', hint: 'Glows at night' },
  { word: 'tree', hint: 'Tall plant with leaves' },
  { word: 'fish', hint: 'Swims in water' },
  { word: 'bird', hint: 'Flies in the sky' },
  { word: 'book', hint: 'Read stories from it' },
  { word: 'star', hint: 'Twinkles in the night' },
  { word: 'rain', hint: 'Water drops from clouds' },
  { word: 'snow', hint: 'Cold and white' },
  { word: 'fire', hint: 'Hot and bright' },
  { word: 'wind', hint: 'Blows air around' },
  { word: 'ball', hint: 'Round toy to play with' },
  { word: 'home', hint: 'Where you live' },
]

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export const SpellingGame: React.FC = () => {
  const [currentWord, setCurrentWord] = useState(GAME_WORDS[0])
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [usedWords, setUsedWords] = useState<string[]>([])

  const handleLetterClick = (letter: string) => {
    setUserInput(prev => prev + letter)
    setFeedback(null)
  }

  const handleBackspace = () => {
    setUserInput(prev => prev.slice(0, -1))
    setFeedback(null)
  }

  const handleClear = () => {
    setUserInput('')
    setFeedback(null)
  }

  const handleSubmit = () => {
    const userAnswer = userInput.trim().toUpperCase()
    const correctAnswer = currentWord.word.toUpperCase()

    if (userAnswer === correctAnswer) {
      // Correct answer
      setScore(score + 10)
      setAttempts(attempts + 1)
      setFeedback({
        type: 'success',
        message: 'Excellent! You spelled it correctly! 🎉'
      })

      // Move to next word after a delay
      setTimeout(() => {
        loadNextWord()
      }, 2000)
    } else {
      // Wrong answer
      setFeedback({
        type: 'error',
        message: 'Retry! You can do it! 💪'
      })
    }
  }

  const loadNextWord = () => {
    // Filter out used words
    const availableWords = GAME_WORDS.filter(w => !usedWords.includes(w.word))
    
    if (availableWords.length === 0) {
      // All words completed, reset
      setUsedWords([])
      setCurrentWord(GAME_WORDS[0])
    } else {
      // Pick random word from available
      const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)]
      setCurrentWord(randomWord)
      setUsedWords([...usedWords, randomWord.word])
    }

    setUserInput('')
    setFeedback(null)
  }

  const handleSkip = () => {
    loadNextWord()
  }

  return (
    <Container>
      <Title>🎮 Spelling Game</Title>

      <ScoreBoard>
        <ScoreItem>
          <ScoreLabel>Score</ScoreLabel>
          <ScoreValue>{score}</ScoreValue>
        </ScoreItem>
        <ScoreItem>
          <ScoreLabel>Words Completed</ScoreLabel>
          <ScoreValue>{attempts}</ScoreValue>
        </ScoreItem>
      </ScoreBoard>

      <WordDisplay>
        <TargetWord>{currentWord.word}</TargetWord>
        <WordHint>{currentWord.hint}</WordHint>
      </WordDisplay>

      <InputSection>
        <InputLabel>Type the word you see above:</InputLabel>
        <InputBox
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          placeholder="TYPE HERE..."
          maxLength={20}
          aria-label="Spelling input"
        />
      </InputSection>

      <Keyboard>
        {ALPHABET.map(letter => (
          <KeyButton
            key={letter}
            onClick={() => handleLetterClick(letter)}
            aria-label={`Letter ${letter}`}
          >
            {letter}
          </KeyButton>
        ))}
      </Keyboard>

      {feedback && (
        <FeedbackBox type={feedback.type}>
          <FeedbackEmoji>
            {feedback.type === 'success' ? '🎉' : '💪'}
          </FeedbackEmoji>
          <FeedbackText>{feedback.message}</FeedbackText>
          {feedback.type === 'error' && (
            <EncouragementText>
              Try again! You're doing great!
            </EncouragementText>
          )}
        </FeedbackBox>
      )}

      <ButtonGroup>
        <Button onClick={handleSubmit} aria-label="Check answer">
          <span role="img" aria-label="Check icon">✓</span>
          Check Answer
        </Button>
        <Button variant="secondary" onClick={handleBackspace} aria-label="Backspace">
          <span role="img" aria-label="Backspace icon">⌫</span>
          Backspace
        </Button>
        <Button variant="secondary" onClick={handleClear} aria-label="Clear">
          <span role="img" aria-label="Clear icon">🗑️</span>
          Clear
        </Button>
        <Button variant="secondary" onClick={handleSkip} aria-label="Skip word">
          <span role="img" aria-label="Skip icon">⏭️</span>
          Skip
        </Button>
      </ButtonGroup>
    </Container>
  )
}
