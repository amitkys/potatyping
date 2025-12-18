'use client';

import { Textarea } from '@/components/ui/textarea';
import { useState, useRef, useEffect } from 'react';

type LayoutType = 'remington' | 'inscript';

interface KeyMap {
  [key: string]: string;
}

interface AltCodeMap {
  [code: string]: string;
}

export default function HindiTyping() {
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('remington');
  const [typedText, setTypedText] = useState<string>('');
  const [altMode, setAltMode] = useState<boolean>(false);
  const [altBuffer, setAltBuffer] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lastChar = typedText.slice(-1);
  const secondLastChar = typedText.slice(-2, -1);
  const thirdLastChar = typedText.slice(-3, -2);

  // Basic Remington Gail mapping (add more keys gradually)
  const remingtonMap: KeyMap = {
    // Vowel signs (matras)
    'q': 'ु',
    'w': 'ू',
    'e': 'म',
    'r': 'त',
    't': 'ज',
    'a': 'ं',
    's': 'े',
    'f': '​ि',
    'g': 'ह',
    'z': '्र',
    
    // Consonants
    'k': 'ा',
    'l': 'स',
    ';': 'य',
    "'": 'श्',
    '[': 'ख्',
    ']': ',',
    '{': 'क्ष्',
    'h': 'ी',
    'j': 'र',
    'y': 'ल',
    'u': 'न',
    'i': 'प',
    'o': 'व',
    'p': 'च',
    'c': 'ब',
    'v': 'अ',
    'b': 'इ',
    'n': 'द',
    'm': 'उ',
    '?': 'घ्',
    '.': 'ण्',
    ':': 'रू',
    '+': '्',
    
    // Special characters
    'd': 'क', // Halant
    'x': 'ग', // Anusvara
    
    // Shift + keys (uppercase versions)
    'Q': 'फ',
    'W': 'ॅ',
    'E': 'म्',
    'R': 'त्',
    'T': 'ज्',
    'A': 'ा',
    'S': 'ै',
    'F': 'थ्',
    'G': 'ळ',
    'K': 'ज्ञ',
    'L': 'स्',
    'H': 'भ्',
    'J': 'श्र',
    'Y': 'ल्',
    'U': 'न्',
    'I': 'प्',
    'O': 'व्',
    'P': 'च्',
    'C': 'ब्',
    'V': 'ट',
    'B': 'ठ',
    'N': 'छ',
    'M': 'ड',
    'D': 'क्',
    'X': 'ग्',
    ')': 'ऋ',
    '<': 'ढ',
    '>': 'झ',
    '/': 'ध्',
    'Z': 'र्',
    ',': 'ए',
    '"': 'ष्',
    '!': '।',
    '`': '़',
    '~': 'द्य',
    '(': 'त्र',
    '}': 'द्व',
    '=': 'ृ',
    '%': '-'
    
  };

  // Alt code mapping
  const altCodeMap: AltCodeMap = {
    // Hindi digits
    '48': '०',
    '49': '१',
    '50': '२',
    '51': '३',
    '52': '४',
    '53': '५',
    '54': '६',
    '55': '७',
    '56': '८',
    '57': '९',
    
    // Punctuation
    '63': '?',
    '33': '!',
    '46': '.',
    '44': ',',
    '58': ':',
    '59': ';',
    '40': '(',
    '41': ')',
    '32': ' ',
    
    // Hindi punctuation
    '161': '।',
    '162': '॥',
    
    // Currency
    '163': '₹',
    '0163': '₹',
  };

  // Basic Inscript mapping (smaller set for now)
  const inscriptMap: KeyMap = {
    // Consonants
    'k': 'क',
    'l': 'त',
    'h': 'प',
    'j': 'र',
    
    // Matras
    'a': 'ो',
    'f': 'ि',
    
    // Special
    'd': '्',
    
    // Add more as needed
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      // Handle Alt key press
      if (e.key === 'Alt') {
        setAltMode(true);
        setAltBuffer('');
        return;
      }

      // If Alt is pressed and user types a number
      if (altMode && /^[0-9]$/.test(e.key)) {
        e.preventDefault();
        setAltBuffer(prev => prev + e.key);
        return;
      }

      // Normal typing (no Alt)
      if (!altMode) {
        const currentMap: KeyMap = selectedLayout === 'remington' ? remingtonMap : inscriptMap;
        const hindiChar: string | undefined = currentMap[e.key];
        
        if (hindiChar) {
          e.preventDefault();

          // Special handling for Remington layout
          if (selectedLayout === 'remington') {
            // Handle 'ि' (Chhoti Ee) reordering: 'ि' + Consonant -> Consonant + 'ि'
            // This ensures visual typing order (Matra first) converts to correct Unicode order (Consonant first)
            const isConsonantChar = (char: string) => /^[\u0915-\u0939\u0958-\u095F]/.test(char);
            
            if (typedText.endsWith('ि') && isConsonantChar(hindiChar)) {
              // Only swap if 'ि' is NOT already attached to a consonant
              // (i.e., it's a "pending" matra typed before the consonant)
              const charBeforeMatra = typedText.charAt(typedText.length - 2);
              if (!isConsonantChar(charBeforeMatra)) {
                setTypedText(prev => prev.slice(0, -1) + hindiChar + 'ि');
                return;
              }
            }

            // Handle 'ा' (Aa Matra) merging
            // In Remington, typing 'ा' (k) after a half-consonant (ending in Halant) often completes it
            // e.g., 'ज्' + 'ा' -> 'ज'
            if (hindiChar === 'ा') {
              if (typedText.endsWith('्')) {
                // Remove Halant to make it full consonant
                setTypedText(prev => prev.slice(0, -1));
                return;
              }

              // Handle case where 'ि' (Chhoti Ee) is already applied to a half-consonant
              // e.g. 'ध्' + 'ि' -> 'ध्ि'. Typing 'ा' should make it 'धि' (remove Halant)
              if (typedText.endsWith('्ि')) {
                 setTypedText(prev => prev.slice(0, -2) + 'ि');
                 return;
              }

              // Handle 'अ' + 'ा' -> 'आ'
              if (typedText.endsWith('अ')) {
                setTypedText(prev => prev.slice(0, -1) + 'आ');
                return;
              }
            }

            // Handle Reph (Ra + Halant) reordering
            // In Remington, Reph is typed after the consonant it sits on top of
            // e.g. 'व' + 'Z' ('र्') -> 'र्व' (which is 'र्' + 'व' in Unicode)
            if (hindiChar === 'र्') {
              const lastChar = typedText.slice(-1);
              const secondLastChar = typedText.slice(-2, -1);
              
              // Helper to check for Matras (vowel signs, halant, anusvara, etc.)
              const isMatra = (char: string) => /^[\u093E-\u094C\u0962\u0963\u0901-\u0903\u094D]/.test(char);

              // Special Case: 'इ' + 'र्' -> 'ई' (User specific request)
              if (lastChar === 'इ') {
                setTypedText(prev => prev.slice(0, -1) + 'ई');
                return;
              }

              // Case 3: Consonant + Halant + Consonant + Reph -> Reph + Consonant + Halant + Consonant
              // e.g. 'थ' + '्' + 'य' + 'र्' -> 'र्थ्य' ('र्' + 'थ' + '्' + 'य')
              if (isConsonantChar(lastChar) && secondLastChar === '्' && isConsonantChar(thirdLastChar)) {
                 setTypedText(prev => prev.slice(0, -3) + hindiChar + thirdLastChar + secondLastChar + lastChar);
                 return;
              }

              // Case 1: Consonant + Reph -> Reph + Consonant
              if (isConsonantChar(lastChar)) {
                setTypedText(prev => prev.slice(0, -1) + hindiChar + lastChar);
                return;
              }

              // Case 2: Consonant + Matra + Reph -> Reph + Consonant + Matra
              // e.g. 'पूति' + 'र्' -> 'पूर्ति' ('त' + 'ि' + 'र्' -> 'र्' + 'त' + 'ि')
              if (isMatra(lastChar) && isConsonantChar(secondLastChar)) {
                setTypedText(prev => prev.slice(0, -2) + hindiChar + secondLastChar + lastChar);
                return;
              }
            }

            // Handle 'े' (Matra E) merging to form 'ो' (Matra O) or 'ओ' (Vowel O) or 'ऐ' (Vowel Ai)
            if (hindiChar === 'े') {
              // 'आ' + 'े' -> 'ओ'
              if (typedText.endsWith('आ')) {
                setTypedText(prev => prev.slice(0, -1) + 'ओ');
                return;
              }
              // 'ा' + 'े' -> 'ो'
              if (typedText.endsWith('ा')) {
                setTypedText(prev => prev.slice(0, -1) + 'ो');
                return;
              }
              // 'ए' + 'े' -> 'ऐ'
              if (typedText.endsWith('ए')) {
                setTypedText(prev => prev.slice(0, -1) + 'ऐ');
                return;
              }
            }

            // Handle 'ै' (Matra Ai) merging to form 'ौ' (Matra Au) or 'औ' (Vowel Au)
            if (hindiChar === 'ै') {
              // 'आ' + 'ै' -> 'औ'
              if (typedText.endsWith('आ')) {
                setTypedText(prev => prev.slice(0, -1) + 'औ');
                return;
              }
              // 'ा' + 'ै' -> 'ौ'
              if (typedText.endsWith('ा')) {
                setTypedText(prev => prev.slice(0, -1) + 'ौ');
                return;
              }
            }

            // Handle '्र' (Ra-Vattu) with 'ि'
            // e.g. 'ि' + 'प' -> 'पि'. Then type '्र' -> 'प्रि'
            // We need to insert '्र' before 'ि' so it attaches to the consonant
            if (hindiChar === '्र' && typedText.endsWith('ि')) {
               setTypedText(prev => prev.slice(0, -1) + hindiChar + 'ि');
               return;
            }
          }

          insertCharacter(hindiChar);
        }
        // If not in map, let default behavior (space, enter, etc.)
      }
    };

    const handleKeyUp = (e: KeyboardEvent): void => {
      // When Alt is released, process the alt code
      if (e.key === 'Alt' && altMode) {
        setAltMode(false);
        
        if (altBuffer) {
          const char: string | undefined = altCodeMap[altBuffer];
          if (char) {
            insertCharacter(char);
          }
        }
        
        setAltBuffer('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [altMode, altBuffer, selectedLayout, typedText]);

  const insertCharacter = (char: string): void => {
    setTypedText(prev => prev + char);
  };

  const clearText = (): void => {
    setTypedText('');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-card rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-card-foreground mb-4">
            Hindi Typing Practice
          </h1>
          
          {/* Layout Selection */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSelectedLayout('remington')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                selectedLayout === 'remington'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Remington Gail
            </button>
            <button
              onClick={() => setSelectedLayout('inscript')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                selectedLayout === 'inscript'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Inscript
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-primary/10 border-l-4 border-primary p-4 mb-4">
            <p className="text-sm text-primary">
              <strong>Current Layout:</strong> {selectedLayout === 'remington' ? 'Remington Gail' : 'Inscript'}
            </p>
            <p className="text-sm text-primary/80 mt-2">
              💡 Use <strong>Alt + Number</strong> for punctuation (e.g., Alt+63 = ?)
            </p>
            {altMode && (
              <p className="text-sm text-primary mt-2 font-semibold">
                ⌨️ Alt Mode Active - Type numbers: {altBuffer || '...'}
              </p>
            )}
          </div>
        </div>

        {/* Typing Area */}
        <div className="bg-card rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-card-foreground">
              Type Here (Mangal Font)
            </h2>
            <button
              onClick={clearText}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition"
            >
              Clear Text
            </button>
          </div>

          <Textarea
            ref={textareaRef}
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            className="w-full h-64 p-4 border-2 border-input rounded-lg text-2xl resize-none focus:outline-none focus:border-primary bg-background text-foreground"
            style={{ fontFamily: 'Mangal, "Nirmala UI", sans-serif' }}
            placeholder="Start typing in Hindi..."
          />

          {/* Character Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Characters typed: <strong>{typedText.length}</strong></p>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="bg-card rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">
            Quick Reference - Common Keys
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-muted p-3 rounded">
              <span className="font-mono text-primary">k</span> → 
              <span className="text-xl ml-2" style={{ fontFamily: 'Mangal' }}>क</span>
            </div>
            <div className="bg-muted p-3 rounded">
              <span className="font-mono text-primary">d</span> → 
              <span className="text-xl ml-2" style={{ fontFamily: 'Mangal' }}>्</span>
              <span className="text-xs text-muted-foreground ml-1">(halant)</span>
            </div>
            <div className="bg-muted p-3 rounded">
              <span className="font-mono text-primary">e</span> → 
              <span className="text-xl ml-2" style={{ fontFamily: 'Mangal' }}>ा</span>
            </div>
            <div className="bg-muted p-3 rounded">
              <span className="font-mono text-primary">Alt+63</span> → 
              <span className="text-xl ml-2">?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}