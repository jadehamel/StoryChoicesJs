// Code by Jade Hamel - https://jadehamel.fr

window.onload = function() {
  const STORY_PATH = "yourlover"; // Path (images, JSON & Stylesheet) of the story in "stories/{storyPath}/"
  const DEFAULT_CHARACTER = "PINEAPPLE"; // Default player
  let mainCharacter = DEFAULT_CHARACTER;
  let currentIndex = 0;
  let storyData;

  init();

  function init() {
    loadStyles();
    createStartScreen();
  }

  function loadStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `stories/${STORY_PATH}/style.css`;
    document.head.appendChild(link);
  }

  function createStartScreen() {
    const startScreen = document.createElement('div');
    startScreen.id = 'StartScreen';

    const form = document.createElement('form');
    form.id = 'startForm';

    const yourNameLabel = createLabel('yourName', 'Your Name');
    const yourNameInput = createInput('text', 'yourName', 'yourName', DEFAULT_CHARACTER);

    const continueButton = document.createElement('button');
    continueButton.type = 'button';
    continueButton.id = 'continueButton';
    continueButton.textContent = 'PLAY';
    continueButton.onclick = () => {
      const yourName = document.getElementById('yourName').value;
      if (yourName) mainCharacter = yourName;
      startScreen.style.display = 'none';
      loadGame();
    };

    form.append(yourNameLabel, yourNameInput, continueButton);
    startScreen.appendChild(form);
    document.getElementById('container').appendChild(startScreen);
  }

  function createLabel(forAttribute, textContent) {
    const label = document.createElement('label');
    label.for = forAttribute;
    label.textContent = textContent;
    return label;
  }

  function createInput(type, id, name, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = name;
    input.placeholder = placeholder;
    return input;
  }

  async function loadGame() {
    try {
      storyData = await loadStoryData();
      storyData.people.push({ role: "{mainCharacter}", name: mainCharacter });
      loadImages([storyData.intro_stepname]);
      updateStory(storyData.intro_stepname);
    } catch (error) {
      console.error('Failed to load game:', error);
    }
  }

  async function loadStoryData() {
    const response = await fetch(`stories/${STORY_PATH}/story.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return await response.json();
  }

  function loadImages(imageUrls) {
    const imageContainer = document.getElementById('image-container');
    imageUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = `stories/${STORY_PATH}/${url}${storyData.img_types}`;
      imageContainer.appendChild(img);
    });
  }

  function updateStory(nodeId) {
    const node = storyData.steps[nodeId];
    updateRoles(node);
    updateOptions(node);
    const image = document.getElementById('image');
    image.src = `stories/${STORY_PATH}/${nodeId}${storyData.img_types}`;
    startSlideShow(image, [image.src]);
  }

  function interpolatePersona(text) {
    storyData.people.forEach(person => {
      const regex = new RegExp(person.role, 'g');
      text = text.replace(regex, person.name.toUpperCase());
    });
    return text;
  }

  function updateRoles(node) {
    stepText = node.text;
    titleText = storyData.title;
    const storyElement = document.getElementById('story');
    const titleElement = document.getElementById('title');
    storyElement.innerHTML = interpolatePersona(stepText);
    titleElement.textContent = interpolatePersona(titleText);
  }

  function updateOptions(node) {
    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';
    const nextImages = [];
    node.choices.forEach(choice => {
      const button = document.createElement('button');
      button.textContent = interpolatePersona(choice.text);
      button.onclick = () => updateStory(choice.next);
      optionsElement.appendChild(button);
      nextImages.push(choice.next);
    });
    loadImages(nextImages);
  }

  function startSlideShow(image, images) {
    image.src = images[currentIndex];
    setTimeout(() => {
      image.style.opacity = 1;
    }, 5000);
    if (images.length > 1) {
      setTimeout(() => {
        if (currentIndex < images.length - 1) {
          currentIndex++;
          startSlideShow(image, images);
        }
      }, 8000);
    } else {
      image.style.opacity = 1;
      currentIndex = 0;
    }
  }
};
