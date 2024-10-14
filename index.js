const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more');
const breedFilter = document.getElementById('breed-filter');
let dogImages = [];


function fetchDogImages() {
    fetch('https://dog.ceo/api/breeds/image/random/5')
        .then(response => response.json())
        .then(data => {
            dogImages = data.message;
            displayDogs(dogImages);
        })
        .catch(error => console.error('Error fetching dog images:', error));
}


function displayDogs(images) {
    gallery.innerHTML = '';
    images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('dog-card');
        card.innerHTML = `<img src="${image}" alt="Dog image">`;
        gallery.appendChild(card);
    });
}

loadMoreButton.addEventListener('click', fetchDogImages);

breedFilter.addEventListener('keyup', () => {
    const filterText = breedFilter.value.toLowerCase();
    const filteredImages = dogImages.filter(img => img.toLowerCase().includes(filterText));
    displayDogs(filteredImages);
});

fetchDogImages();