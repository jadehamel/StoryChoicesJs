//Code by Jade Hamel - https://jadehamel.fr

//Path (images, JSON & Stylesheet) of the story in "stories/{storyPath}/"
const storyPath = "yourlover";
const playerName = prompt("What's your name?");
const story = document.getElementById('story');
const options = document.getElementById('options');
const image = document.getElementById('image');
let currentIndex = 0;

function loadStyles() {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'stories/' + storyPath + '/style.css';
  document.head.appendChild(link);
}

async function loadStoryData() {
  try {
      const response = await fetch('stories/' + storyPath + '/story.json');
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      storyData = await response.json();
      storyData.people.push({ role: "{playerName}", name: playerName });
      document.getElementById('title').textContent = storyData.title;
      startGame(storyPath, storyData.intro_stepname);
  } catch (error) {
      console.error('Failed to load story data:', error);
  }
};

function loadGame() {
  loadStyles();
  loadStoryData();
}

function updateStory(storyPath, nodeId) {
    const node = storyData.steps[nodeId];
    updateRoles(node);
    updateOptions(node, storyPath);
    image.src = "stories/" + storyPath + "/" + nodeId + storyData.img_types
    startSlideShow(image, [image.src, "stories/yourlover/firstEncounter_distant.png"]);
}

function updateRoles(node) {
  let updatedText = node.text;
  storyData.people.forEach(person => {
    const regex = new RegExp(person.role, 'g');
    updatedText = updatedText.replace(regex, person.name);
  });

  story.innerHTML = updatedText;
};

function updateOptions(node, storyName) {
  options.innerHTML = '';
  node.choices.forEach(choice => {
    let button = document.createElement('button');
    button.textContent = choice.text;
    button.onclick = () => updateStory(storyName, choice.next);
    options.appendChild(button);
  });
};

function startSlideShow(image, images) {
  images.src = images[currentIndex];
  setTimeout(() => {
    image.style.opacity = 1; // Change opacity to 1 to trigger the fade-in
  }, 5000);
  if (images.length > 1) {
    setTimeout(() => {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        setTimeout(startSlideShow(image, images), 3000); // Wait for the fade-out transition to complete before changing the image
      }
    }, 8000); // Display image for 5 seconds + 3 seconds fade-in time
  } else {
    image.style.opacity = 1;
    currentIndex = 0;
  }
}

function startGame(storyName, step) {
  updateStory(storyName, step);
};

loadGame();
