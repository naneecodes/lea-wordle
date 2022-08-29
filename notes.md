# Functional Requirements

## Gameplay

(Coded in JS)
6 tries to guess a 5-letter word
(make more than this for the kids)

### Making a guess

Detect any key presses

- if key press is a letter
    - update "letters" attribute
        - update tile html markup based on "letters" value
- if keypress is backspace
    - delete last letter in "letters"
        - update tile markeup based on "letters"

Typing in the letter will display the letter in the tile
Backspace will delete letters
Enter will submit guess

Guesses must be a real word in "word list" (API?)

Guess colors (data-state): 
    - gray: "absent" letter not in word
    - yellow: "present", letter in word, but in wrong position
    - green: "correct", letter in word and in right position

Hard mode: present or correct letters must be used in subsequent guesses

Guesses are saved in local storage

## Design

Tiles in rows of 5x6
Virtual keyboard

## Interactions

When typing a letter:
    - border of the tile changes to light gray
    - blinking in animation with letter
    - backspace will remove letter, border changes back to dark gray

When submitting a guess:
    - tiles will flip up and background color will change based on guess

## Customization ideas

- make words generated from the children's word list (create row length from longest word, then gray out the extra spaces for each shorter word)
- ADVANCED: when children guess word correctly they must type in the proper Korean word before the next word is revealed
- ADVANCED: create a story-line with blanks where the children have to guess the word inside the sentence? 