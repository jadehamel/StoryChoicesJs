# StoryChoicesJs
Client-side customizable game where players create their own story through interactive choices.

# Demo
[https://jadehamel.fr/game](https://jadehamel.fr/game)

# Your Choices Story

 Your Choices Story (StoryChoicesJs) is a project where you can create interactive stories with choices for the player.

## Setup

### Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/jadehamel/your-choices-story.git
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
   const playerName = "Pineapple";  // Default player's name
   ```

## Creating a New Story

To create a new story, follow these steps:

1. **Define Story Structure (`story.json`) of edit and rename `template.json`:**

   ```json
   {
     "title": "Your Story Title",
     "intro_stepname": "start",
     "people": [
       {"role": "{playerName}", "name": "playerName"}  // Placeholder for player's name
     ],
     "steps": {
       "start": {
         "text": "Once upon a time, {playerName} woke up in a mysterious place...",
         "choices": [
           {"text": "Explore further", "next": "explore"},
           {"text": "Stay put", "next": "stay"}
         ]
       },
       "explore": {
         "text": "As {playerName} ventured deeper, a strange figure appeared...",
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

   - Replace placeholders like `{playerName}` with appropriate text.

2. **Add Images:**

   - For each step in your story, place an image file in `stories/{storyPath}/` named according to the step name (e.g., `start.png`, `explore.jpg`).

3. **Modify CSS (Optional):**

   Customize styles in `stories/{storyPath}/style.css` to match your story's theme.

## Running the Game

- Open `index.html` in a web browser or serve it locally using a web server.
- The game will prompt the player for their name and begin the story accordingly.

## Contributing

If you'd like to contribute to this project, fork the repository and submit a pull request. Your contributions are welcome!

### Notes:
- **File Paths**: Adjust file paths (`stories/{storyPath}/`) according to your project's structure.
- **JSON Structure**: Ensure your `story.json` follows a structured format with steps, choices, and image file types specified.
- **Customization**: Encourage users to customize CSS styles and extend story features as needed.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
