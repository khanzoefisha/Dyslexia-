import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import type { WordExercise, PhoneticBreakdown } from '../types'
import { phoneticEngine } from '../services/PhoneticEngine'
import { getRandomWord } from '../data/words'

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    margin: 0.5rem;
    padding: 1rem;
  }
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
`

const ProgressIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #F5F5DC;
  border-radius: 8px;
`

const ProgressText = styled.div`
  font-size: 0.95rem;
  color: #555555;
  font-weight: 600;
`

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: #E0E0E0;
  border-radius: 4px;
  margin: 0 1rem;
  overflow: hidden;
`

const ProgressFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
`

const StepIndicator = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  font-weight: 700;
`

const WordDisplay = styled.div`
  text-align: center;
  margin: 3rem 0;

  @media (max-width: 768px) {
    margin: 2rem 0;
  }
`

const MainWord = styled.div`
  font-size: 3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const BreakdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 2rem 0;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`

const SyllableBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #F8F9FA;
  border-radius: 8px;
  border: 2px solid var(--border-color);
`

const SyllableText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`

const SyllableLabel = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const PhonemeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`

const PhonemeBox = styled.div<{ highlighted: boolean }>`
  padding: 0.75rem 1rem;
  background: ${props => props.highlighted ? 'var(--button-primary)' : 'white'};
  color: ${props => props.highlighted ? 'white' : 'var(--text-primary)'};
  border: 2px solid ${props => props.highlighted ? 'var(--button-primary)' : 'var(--border-color)'};
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 50px;
  text-align: center;
`

const PhonemeSound = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
`

const PhonemeLabel = styled.div`
  font-size: 0.7rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-top: 1rem;
  letter-spacing: 0.05em;
`

const RecordingSection = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background: #F0F8FF;
  border-radius: 12px;
  border: 2px dashed var(--button-primary);
  text-align: center;
`

const RecordingTitle = styled.h3`
  color: #333333;
  margin-bottom: 1rem;
  font-weight: 700;
`

const RecordingStatus = styled.div<{ isRecording: boolean }>`
  font-size: 1.1rem;
  color: ${props => props.isRecording ? '#E74C3C' : '#555555'};
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &::before {
    content: ${props => props.isRecording ? '"🔴"' : '"🎤"'};
    font-size: 1.5rem;
    animation: ${props => props.isRecording ? 'pulse 1s infinite' : 'none'};
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`

const FeedbackBox = styled.div<{ type: 'success' | 'error' | 'info' }>`
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 8px;
  background: ${props => 
    props.type === 'success' ? '#E8F5E9' :
    props.type === 'error' ? '#FFEBEE' :
    '#E3F2FD'
  };
  border: 2px solid ${props =>
    props.type === 'success' ? '#4CAF50' :
    props.type === 'error' ? '#F44336' :
    '#2196F3'
  };
  color: #333333;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: ${props =>
      props.type === 'success' ? '"✅"' :
      props.type === 'error' ? '"⚠️"' :
      '"ℹ️"'
    };
    font-size: 1.5rem;
  }
`

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
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
  color: ${props => props.variant === 'secondary' ? 'var(--text-primary)' : 'white'};
  border: ${props => props.variant === 'secondary' ? '2px solid var(--border-color)' : 'none'};
  cursor: pointer;

  &:hover {
    background: ${props => 
      props.variant === 'secondary' ? '#f8f9fa' : 
      props.variant === 'success' ? '#45A049' :
      'var(--button-hover)'
    };
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    flex: 1;
    min-width: 120px;
  }
`

const DifficultySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

const DifficultyLabel = styled.label`
  color: var(--text-secondary);
  font-weight: 500;
`

const DifficultySlider = styled.input`
  width: 200px;
`

interface PhonologicalTrainingProps {
  initialDifficulty?: number
}

type TrainingStep = 'listen' | 'practice' | 'complete'

export const PhonologicalTraining: React.FC<PhonologicalTrainingProps> = ({
  initialDifficulty = 1,
}) => {
  const [difficulty, setDifficulty] = useState(initialDifficulty)
  const [currentWord, setCurrentWord] = useState<WordExercise | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [highlightedPhoneme, setHighlightedPhoneme] = useState<{
    syllableIndex: number
    phonemeIndex: number
  } | null>(null)
  
  // New state for speech recognition
  const [currentStep, setCurrentStep] = useState<TrainingStep>('listen')
  const [isRecording, setIsRecording] = useState(false)
  const [recognizedText, setRecognizedText] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)
  const [wordsCompleted, setWordsCompleted] = useState(0)
  const [totalWords] = useState(5) // Complete 5 words per session

  // Load initial word
  useEffect(() => {
    loadNewWord()
  }, [difficulty])

  const loadNewWord = () => {
    const word = getRandomWord(difficulty)
    if (word) {
      setCurrentWord(word)
      setHighlightedPhoneme(null)
      setCurrentStep('listen')
      setFeedback(null)
      setRecognizedText('')
      phoneticEngine.stop()
    }
  }

  const handlePlay = async () => {
    if (!currentWord || isPlaying) return

    setIsPlaying(true)
    setHighlightedPhoneme(null)

    try {
      await phoneticEngine.playSequence(
        currentWord.breakdown,
        (syllableIndex, phonemeIndex) => {
          setHighlightedPhoneme({ syllableIndex, phonemeIndex })
        }
      )
      setFeedback({ type: 'info', message: 'Great! Now it\'s your turn to read the word.' })
      setCurrentStep('practice')
    } catch (error) {
      console.error('Error playing sequence:', error)
    } finally {
      setIsPlaying(false)
      setHighlightedPhoneme(null)
    }
  }

  const handleStartRecording = () => {
    if (!currentWord || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setFeedback({ 
        type: 'error', 
        message: 'Speech recognition is not supported in your browser. Please use Chrome or Edge.' 
      })
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsRecording(true)
      setFeedback({ type: 'info', message: 'Listening... Please read the word clearly.' })
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim()
      setRecognizedText(transcript)
      checkPronunciation(transcript)
    }

    recognition.onerror = (event: any) => {
      setIsRecording(false)
      setFeedback({ type: 'error', message: 'Could not hear you clearly. Please try again.' })
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }

  const checkPronunciation = (spokenWord: string) => {
    if (!currentWord) return

    const targetWord = currentWord.word.toLowerCase()
    const isCorrect = spokenWord === targetWord || spokenWord.includes(targetWord)

    if (isCorrect) {
      setFeedback({ 
        type: 'success', 
        message: `Excellent! You said "${spokenWord}" correctly! 🎉` 
      })
      setCurrentStep('complete')
    } else {
      setFeedback({ 
        type: 'error', 
        message: `You said "${spokenWord}". The correct word is "${targetWord}". Let's try again!` 
      })
    }
  }

  const handleContinue = () => {
    const newCompleted = wordsCompleted + 1
    setWordsCompleted(newCompleted)

    if (newCompleted >= totalWords) {
      setFeedback({ 
        type: 'success', 
        message: `🎊 Amazing work! You completed ${totalWords} words! Keep practicing!` 
      })
      setWordsCompleted(0)
    }
    
    loadNewWord()
  }

  const handleReplay = () => {
    phoneticEngine.stop()
    setHighlightedPhoneme(null)
    handlePlay()
  }

  const progress = (wordsCompleted / totalWords) * 100

  if (!currentWord) {
    return (
      <Container>
        <Title>Phonological Training</Title>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          No words available at this difficulty level.
        </p>
      </Container>
    )
  }

  return (
    <Container>
      <Title>Phonological Training</Title>

      <ProgressIndicator>
        <ProgressText>Progress: {wordsCompleted}/{totalWords}</ProgressText>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <ProgressText>{Math.round(progress)}%</ProgressText>
      </ProgressIndicator>

      <StepIndicator>
        {currentStep === 'listen' && '👂 Step 1: Listen to the word'}
        {currentStep === 'practice' && '🎤 Step 2: Now you read it!'}
        {currentStep === 'complete' && '✅ Step 3: Great job! Continue to next word'}
      </StepIndicator>

      <DifficultySelector>
        <DifficultyLabel htmlFor="difficulty">
          Difficulty: {difficulty}
        </DifficultyLabel>
        <DifficultySlider
          id="difficulty"
          type="range"
          min="1"
          max="10"
          value={difficulty}
          onChange={(e) => setDifficulty(parseInt(e.target.value))}
        />
      </DifficultySelector>

      <WordDisplay>
        <MainWord>{currentWord.word}</MainWord>
      </WordDisplay>

      <BreakdownContainer>
        {currentWord.breakdown.syllables.map((syllable, sIdx) => (
          <SyllableBox key={sIdx}>
            <SyllableText>{syllable.text}</SyllableText>
            <SyllableLabel>Syllable {sIdx + 1}</SyllableLabel>

            <PhonemeContainer>
              {syllable.phonemes.map((phoneme, pIdx) => (
                <div key={pIdx}>
                  <PhonemeBox
                    highlighted={
                      highlightedPhoneme?.syllableIndex === sIdx &&
                      highlightedPhoneme?.phonemeIndex === pIdx
                    }
                  >
                    {phoneme.symbol}
                    <PhonemeSound>{phoneme.sound}</PhonemeSound>
                  </PhonemeBox>
                </div>
              ))}
            </PhonemeContainer>
            <PhonemeLabel>Phonemes</PhonemeLabel>
          </SyllableBox>
        ))}
      </BreakdownContainer>

      {currentStep === 'practice' && (
        <RecordingSection>
          <RecordingTitle>Your Turn to Read!</RecordingTitle>
          <RecordingStatus isRecording={isRecording}>
            {isRecording ? 'Recording...' : 'Click to start recording'}
          </RecordingStatus>
          <Button 
            onClick={handleStartRecording} 
            disabled={isRecording}
            aria-label="Start recording"
          >
            <span role="img" aria-label="Microphone icon">🎤</span>
            {isRecording ? 'Listening...' : 'Start Recording'}
          </Button>
        </RecordingSection>
      )}

      {feedback && (
        <FeedbackBox type={feedback.type}>
          {feedback.message}
        </FeedbackBox>
      )}

      <Controls>
        {currentStep === 'listen' && (
          <>
            <Button onClick={handlePlay} disabled={isPlaying} aria-label="Play word breakdown">
              <span role="img" aria-label="Play icon">▶️</span>
              {isPlaying ? 'Playing...' : 'Play'}
            </Button>
            <Button variant="secondary" onClick={handleReplay} disabled={isPlaying} aria-label="Replay word breakdown">
              <span role="img" aria-label="Replay icon">🔄</span>
              Replay
            </Button>
          </>
        )}

        {currentStep === 'practice' && (
          <Button variant="secondary" onClick={handleReplay} aria-label="Listen again">
            <span role="img" aria-label="Listen icon">👂</span>
            Listen Again
          </Button>
        )}

        {currentStep === 'complete' && (
          <Button variant="success" onClick={handleContinue} aria-label="Continue to next word">
            <span role="img" aria-label="Next icon">➡️</span>
            Continue to Next Word
          </Button>
        )}
      </Controls>
    </Container>
  )
}
