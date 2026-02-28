import type { DrillType, DrillItem } from '../types'

// Mock drill data for rapid naming exercises
export const DRILL_DATA: Record<DrillType, DrillItem[]> = {
  letters: [
    { id: 'l1', stimulus: 'A' },
    { id: 'l2', stimulus: 'B' },
    { id: 'l3', stimulus: 'C' },
    { id: 'l4', stimulus: 'D' },
    { id: 'l5', stimulus: 'E' },
    { id: 'l6', stimulus: 'F' },
    { id: 'l7', stimulus: 'G' },
    { id: 'l8', stimulus: 'H' },
    { id: 'l9', stimulus: 'I' },
    { id: 'l10', stimulus: 'J' },
    { id: 'l11', stimulus: 'K' },
    { id: 'l12', stimulus: 'L' },
    { id: 'l13', stimulus: 'M' },
    { id: 'l14', stimulus: 'N' },
    { id: 'l15', stimulus: 'O' },
    { id: 'l16', stimulus: 'P' },
    { id: 'l17', stimulus: 'Q' },
    { id: 'l18', stimulus: 'R' },
    { id: 'l19', stimulus: 'S' },
    { id: 'l20', stimulus: 'T' },
  ],
  
  numbers: [
    { id: 'n1', stimulus: '1' },
    { id: 'n2', stimulus: '2' },
    { id: 'n3', stimulus: '3' },
    { id: 'n4', stimulus: '4' },
    { id: 'n5', stimulus: '5' },
    { id: 'n6', stimulus: '6' },
    { id: 'n7', stimulus: '7' },
    { id: 'n8', stimulus: '8' },
    { id: 'n9', stimulus: '9' },
    { id: 'n10', stimulus: '10' },
    { id: 'n11', stimulus: '11' },
    { id: 'n12', stimulus: '12' },
    { id: 'n13', stimulus: '13' },
    { id: 'n14', stimulus: '14' },
    { id: 'n15', stimulus: '15' },
    { id: 'n16', stimulus: '16' },
    { id: 'n17', stimulus: '17' },
    { id: 'n18', stimulus: '18' },
    { id: 'n19', stimulus: '19' },
    { id: 'n20', stimulus: '20' },
  ],
  
  words: [
    { id: 'w1', stimulus: 'cat', hint: 'Rhymes with "hat" and "mat"', soundHint: 'Meow!' },
    { id: 'w2', stimulus: 'dog', hint: 'Rhymes with "log" and "fog"', soundHint: 'Woof!' },
    { id: 'w3', stimulus: 'sun', hint: 'Rhymes with "fun" and "run"', soundHint: 'Bright and warm!' },
    { id: 'w4', stimulus: 'hat', hint: 'Rhymes with "cat" and "bat"', soundHint: 'Wear on head' },
    { id: 'w5', stimulus: 'pen', hint: 'Rhymes with "ten" and "hen"', soundHint: 'Write with it' },
    { id: 'w6', stimulus: 'book', hint: 'Rhymes with "look" and "cook"', soundHint: 'Read it!' },
    { id: 'w7', stimulus: 'tree', hint: 'Rhymes with "see" and "bee"', soundHint: 'Has leaves' },
    { id: 'w8', stimulus: 'fish', hint: 'Rhymes with "wish" and "dish"', soundHint: 'Swims in water' },
    { id: 'w9', stimulus: 'bird', hint: 'Rhymes with "word" and "heard"', soundHint: 'Flies in sky' },
    { id: 'w10', stimulus: 'moon', hint: 'Rhymes with "soon" and "noon"', soundHint: 'Night light' },
    { id: 'w11', stimulus: 'star', hint: 'Rhymes with "car" and "far"', soundHint: 'Twinkle twinkle' },
    { id: 'w12', stimulus: 'rain', hint: 'Rhymes with "train" and "pain"', soundHint: 'Water drops' },
    { id: 'w13', stimulus: 'wind', hint: 'Rhymes with "pinned" and "grinned"', soundHint: 'Blows air' },
    { id: 'w14', stimulus: 'snow', hint: 'Rhymes with "go" and "flow"', soundHint: 'Cold and white' },
    { id: 'w15', stimulus: 'fire', hint: 'Rhymes with "tire" and "wire"', soundHint: 'Hot and bright' },
    { id: 'w16', stimulus: 'water', hint: 'Rhymes with "daughter" and "otter"', soundHint: 'Drink it!' },
    { id: 'w17', stimulus: 'earth', hint: 'Rhymes with "birth" and "worth"', soundHint: 'Our planet' },
    { id: 'w18', stimulus: 'cloud', hint: 'Rhymes with "loud" and "proud"', soundHint: 'Fluffy in sky' },
    { id: 'w19', stimulus: 'light', hint: 'Rhymes with "night" and "bright"', soundHint: 'Opposite of dark' },
    { id: 'w20', stimulus: 'dark', hint: 'Rhymes with "park" and "bark"', soundHint: 'Opposite of light' },
  ],
  
  objects: [
    { id: 'o1', stimulus: '🍎', imageUrl: 'apple', hint: 'Red fruit, keeps doctor away' },
    { id: 'o2', stimulus: '🍌', imageUrl: 'banana', hint: 'Yellow fruit, monkeys love it' },
    { id: 'o3', stimulus: '🍊', imageUrl: 'orange', hint: 'Orange fruit, full of vitamin C' },
    { id: 'o4', stimulus: '🍇', imageUrl: 'grapes', hint: 'Purple fruit, grows in bunches' },
    { id: 'o5', stimulus: '🍓', imageUrl: 'strawberry', hint: 'Red berry with seeds outside' },
    { id: 'o6', stimulus: '🚗', imageUrl: 'car', hint: 'Vehicle with 4 wheels, beep beep!' },
    { id: 'o7', stimulus: '🚲', imageUrl: 'bicycle', hint: 'Two wheels, pedal to move' },
    { id: 'o8', stimulus: '✈️', imageUrl: 'airplane', hint: 'Flies in the sky, zoom!' },
    { id: 'o9', stimulus: '🚂', imageUrl: 'train', hint: 'Runs on tracks, choo choo!' },
    { id: 'o10', stimulus: '🚢', imageUrl: 'ship', hint: 'Sails on water, big boat' },
    { id: 'o11', stimulus: '⚽', imageUrl: 'ball', hint: 'Round, kick it or throw it' },
    { id: 'o12', stimulus: '🎨', imageUrl: 'art', hint: 'Paint and draw with colors' },
    { id: 'o13', stimulus: '📚', imageUrl: 'books', hint: 'Read stories and learn' },
    { id: 'o14', stimulus: '🎵', imageUrl: 'music', hint: 'Listen and sing along' },
    { id: 'o15', stimulus: '🌸', imageUrl: 'flower', hint: 'Pretty plant, smells nice' },
    { id: 'o16', stimulus: '🌳', imageUrl: 'tree', hint: 'Tall plant with leaves' },
    { id: 'o17', stimulus: '🏠', imageUrl: 'house', hint: 'Where you live, home sweet home' },
    { id: 'o18', stimulus: '⭐', imageUrl: 'star', hint: 'Shines in the night sky' },
    { id: 'o19', stimulus: '🌙', imageUrl: 'moon', hint: 'Glows at night, changes shape' },
    { id: 'o20', stimulus: '☀️', imageUrl: 'sun', hint: 'Bright light in the day' },
  ],
}

/**
 * Generate a random drill of specified type and difficulty
 */
export function generateDrill(type: DrillType, difficulty: number, itemCount: number = 10) {
  const allItems = DRILL_DATA[type]
  const shuffled = [...allItems].sort(() => Math.random() - 0.5)
  const selectedItems = shuffled.slice(0, Math.min(itemCount, allItems.length))
  
  // Target speed decreases with difficulty (easier = more time)
  const baseSpeed = 2000 // 2 seconds
  const targetSpeed = baseSpeed - (difficulty * 100) // Faster at higher difficulty
  
  return {
    id: `drill-${Date.now()}`,
    type,
    items: selectedItems,
    targetSpeed: Math.max(targetSpeed, 500), // Minimum 500ms
  }
}

/**
 * Get drill type display name
 */
export function getDrillTypeName(type: DrillType): string {
  const names: Record<DrillType, string> = {
    letters: 'Letters',
    numbers: 'Numbers',
    words: 'Words',
    objects: 'Objects',
  }
  return names[type]
}
