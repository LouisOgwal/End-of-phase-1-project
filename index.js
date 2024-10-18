const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more');
const breedFilter = document.getElementById('breed-filter'); // Text filter input
const breedSelect = document.getElementById('breed-select'); // Breed dropdown filter
let dogImages = [];
let allBreeds = [];


function fetchDogImages() {
    fetch('https://dog.ceo/api/breeds/image/random/5')
        .then(response => response.json())
        .then(data => {
            dogImages = data.message;
            displayDogs(dogImages);
        })
        .catch(error => console.error('Error fetching dog images:', error));
}


function fetchBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message);
            populateBreedSelect(allBreeds);
        })
        .catch(error => console.error('Error fetching breeds:', error));
}


function populateBreedSelect(breeds) {
    breedSelect.innerHTML = '<option value="">Select a breed</option>';
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed;
        breedSelect.appendChild(option);
    });
}


function fetchBreedImages(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/5`)
        .then(response => response.json())
        .then(data => {
            dogImages = data.message;
            displayDogs(dogImages);
        })
        .catch(error => console.error('Error fetching breed images:', error));
}


function displayDogs(images) {
    gallery.innerHTML = '';
    images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('dog-card');
    
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = 'Dog image';
        
        const likeButton = document.createElement('button');
        likeButton.textContent = 'Like';
        likeButton.classList.add('like-button');
        
        likeButton.addEventListener('click', () => {
            if (likeButton.textContent === 'Like') {
                likeButton.textContent = 'Liked';
                likeButton.classList.add('liked');
            } else {
                likeButton.textContent = 'Like';
                likeButton.classList.remove('liked');
            }
        });
        
        card.appendChild(imgElement);
        card.appendChild(likeButton);
        gallery.appendChild(card);
    });
}


loadMoreButton.addEventListener('click', fetchDogImages);


breedFilter.addEventListener('keyup', () => {
    const filterText = breedFilter.value.toLowerCase();
    const filteredImages = dogImages.filter(img => img.toLowerCase().includes(filterText));
    displayDogs(filteredImages);
});


breedSelect.addEventListener('change', (event) => {
    const selectedBreed = event.target.value;
    if (selectedBreed) {
        fetchBreedImages(selectedBreed);
    } else {
        fetchDogImages();
    }
});


fetchDogImages();
fetchBreeds();