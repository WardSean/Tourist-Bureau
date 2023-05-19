const hikingDropdown = document.querySelector('#hikingDropdown');
const selectedHikePhoto = document.querySelector('.selected-hike-photo');
const selectedHikeMap = document.querySelector('.selected-hike-map');
const selectedHikeName = document.querySelector('.selected-hike-name');
const selectedHikeDescription = document.querySelector('.selected-hike-info:nth-of-type(1)');
const selectedHikeDifficulty = document.querySelector('.selected-hike-info:nth-of-type(2)');

// Function to populate the dropdown list with hike options
function populateHikingDropdown(data) {
  data.forEach(hike => {
    const option = document.createElement('option');
    option.value = hike.id;
    option.textContent = hike.name;
    hikingDropdown.appendChild(option);
  });
}

// Function to update the hike details and images based on the selected option
function updateHikeDetails() {
    const selectedHikeId = hikingDropdown.value;
    
    if (selectedHikeId === '') {
      // Clear the displayed images and details
      selectedHikePhoto.style.display = 'none';
      selectedHikeMap.style.display = 'none';
      selectedHikeName.textContent = '';
      selectedHikeDescription.textContent = '';
      selectedHikeDifficulty.textContent = '';
      return;
    }
    
    const selectedHike = hikingData.find(hike => hike.id === parseInt(selectedHikeId));
    
    console.log('Selected Hike:', selectedHike);
    
    if (selectedHike) {
      console.log('Selected Hike Photo:', selectedHike.scenicImage);
      console.log('Selected Hike Map:', selectedHike.trailMapImage);
      
      selectedHikePhoto.style.display = 'block';
      selectedHikeMap.style.display = 'block';
      selectedHikePhoto.src = selectedHike.scenicImage;
      selectedHikeMap.src = selectedHike.trailMapImage;
      selectedHikeName.textContent = selectedHike.name;
      selectedHikeDescription.textContent = selectedHike.description;
      selectedHikeDifficulty.textContent = `Difficulty: ${selectedHike.difficulty}`;
    }
  }
  

// Event listener to handle changes in the dropdown selection
hikingDropdown.addEventListener('change', updateHikeDetails);

// Sample hiking trail data
const hikingData = [
  {
    id: 1,
    name: 'Trail 1',
    scenicImage: 'trail1.png',
    trailMapImage: 'trail1-map.png',
    description: 'Trail 1 description',
    difficulty: 'Easy'
  },
  {
    id: 2,
    name: 'Trail 2',
    scenicImage: 'trail2.png',
    trailMapImage: 'trail2-map.png',
    description: 'Trail 2 description',
    difficulty: 'Moderate'
  },
  {
    id: 3,
    name: 'Trail 3',
    scenicImage: 'trail3.png',
    trailMapImage: 'trail3-map.png',
    description: 'Trail 3 description',
    difficulty: 'Difficult'
  }
];

// Call the populateHikingDropdown function with the hiking trail data
populateHikingDropdown(hikingData);

// Trigger the initial update to clear the displayed images and details
updateHikeDetails();
