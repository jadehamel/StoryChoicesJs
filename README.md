# StoryChoicesJs
Client-side customizable game where players create their own story through interactive choices.

- Demo: [https://story.pineapple.fans/](https://story.pineapple.fans/)
- Live Version Used by Real Players: [https://story.pineapple.fans?story=pomni&player=pomni](https://story.pineapple.fans?story=pomni&player=Pomni)

# Game Functionalities and User Interactions

## JavaScript Functionalities:

### Page Initialization (`init`):
- Loads the required stylesheets.
- Displays the start screen where the user can input their name.

### Start Screen:
- A form to input the user's name, with a default value.
- A "PLAY" button that hides the start screen and initializes the game with the user's name.

### Game Loading:
- Fetches story data from a JSON file.
- Adds the user's name to the story's list of characters.
- Loads images associated with the introductory step.
- Displays the introductory step's text and options.

### Story Navigation:
- Displays the current step's text, interpolated with character names.
- Displays choices available for the current step.
- Loads and displays images associated with the current step and choices.
- Updates the story view based on user choices.

### Image Handling:
- Loads images dynamically based on story steps.
- Starts a slideshow of images if there are multiple images for a step.

## CSS Functionalities:

### Global Styles:
- Sets a global font family, font size, background color, and text color.
- Defines hidden visibility for audio elements.
- Styles the container to occupy the full width and height of the screen.

### Game Container:
- Centers the game container with margins and padding.
- Applies background color, border radius, and box shadow to the game container.

### Title Styling:
- Sets a distinct font family, font size, and text shadow for the title.
- Centers the title text.

### Button Styling:
- Applies styles to buttons, including background color, font properties, padding, and margins.
- Adds a hover effect that changes the background color.
- Uses uppercase text transformation for buttons.

### Image Styling:
- Sets the image to take the full width of its container, with a defined max-width.
- Applies border radius and box shadow to images.

### Start Screen:
- Centers the start screen content vertically and horizontally.
- Applies a background color and sets the full height and width of the viewport.

### Form Styling:
- Styles the form to be centered with margin and padding.
- Styles form labels and inputs, including input dimensions, font properties, and border properties.
- Styles the continue button with similar properties to the game buttons.

## Detailed User Interactions:

### Loading the Game:
- When the page loads, the user is greeted with a start screen.
- The user can enter their name in the input field and press the "PLAY" button to start the game.

### Playing the Game:
- The game loads with an introductory step, showing the story text and options.
- The user can read the story text, which includes their name interpolated into the text.
- The user can make choices by clicking on buttons, which update the story to the next step.

### Interacting with Images:
- As the user navigates through the story, images related to each step are displayed.
- If a step has multiple images, a slideshow effect displays these images sequentially.

### Button Interactions:
- Buttons change color when hovered over, indicating interactivity.
- Clicking on buttons triggers actions in the game, such as moving to the next story step.

# Setup

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/jadehamel/StoryChoicesJs.git
   cd your-choices-story
   ```

2. **Folder Structure:**

   - Place your story's images in `stories/{storyPath}/images/`.
   - Create a JSON file named `story.json` in `stories/{storyPath}/` to define your story's structure (details below).
   - Optionally, customize styles in `stories/{storyPath}/style.css`.

3. **Modify `storychoices.js`:**

   Update the following variables in `storychoices.js` to match your story:

   ```javascript
   const storyPath = "yourlover";  // Replace with your story folder name
   const mainCharacter = "Pineapple";  // Default player's name
   ```
   **Solution for multiple stories in `story/`**
   Use the parameters `story` and/or `player` in url:
   - index.html`?story=storyPath&player=myName`
   - `story=(customStoryPath)`  Replace with your story folder name
   - `player=(customMainCharacter)` Default player's name  

## Creating a New Story

To create a new story, follow these steps:

1. **Define Story Structure (`story.json`) or edit and rename `template.json`:**

   ```json
   {
     "title": "Your Story Title",
     "intro_stepname": "start",
     "people": [
       {"role": "{mainCharacter}", "name": "mainCharacter"}  // Placeholder for player's name
     ],
     "steps": {
       "start": {
         "text": "Once upon a time, {mainCharacter} woke up in a mysterious place...",
         "choices": [
           {"text": "Explore further", "next": "explore"},
           {"text": "Stay put", "next": "stay"}
         ]
       },
       "explore": {
         "text": "As {mainCharacter} ventured deeper, a strange figure appeared...",
         "choices": [
           {"text": "Approach the figure", "next": "approach"},
           {"text": "Run away", "next": "run"}
         ]
       },
       // Add more steps as needed
     },
     "img_types": ".jpg"  // Image file type
   }
   ```

   - Replace placeholders like `{mainCharacter}` with appropriate text.

2. **Add Images:**

   - For each step in your story, place an image file in `stories/{storyPath}/` named according to the step name (e.g., `start.png`, `explore.jpg`).

3. **Modify CSS (Optional):**

   Customize styles in `stories/{storyPath}/style.css` to match your story's theme.

4. **Modify Soundrack (Optional):**

   Use your own `soundtrack.mp3` by replacing the file in the root path

# Running the Game

- Open `index.html` in a web browser or serve it locally using a web server.
- The game will prompt the player for their name and begin the story accordingly.

# Contributing

If you'd like to contribute to this project, fork the repository and submit a pull request. Your contributions are welcome!

### Notes:
- **File Paths**: Adjust file paths (`stories/{storyPath}/`) according to your project's structure.
- **JSON Structure**: Ensure your `story.json` follows a structured format with steps, choices, and image file types specified.
- **Customization**: Encourage users to customize CSS styles and extend story features as needed.
