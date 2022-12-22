import '../css/contentComponent.css';
import LazyLoad from 'vanilla-lazyload';
import preloading from '../img/preloading.gif';

export default class contentComponent {
  displayError(message) {
    this.clearErrors();
    const popupMessage = document.createElement('h2');
    popupMessage.classList.add('error-message');
    popupMessage.textContent = message;
    document.querySelector('.errors').appendChild(popupMessage);
  }

  clearErrors() {
    const errors = document.querySelector('.errors');
    errors.innerHTML = '';
  }

  clearContent() {
    const errors = document.querySelector('#content');
    errors.innerHTML = '';
  }
  async getImages(dogBreed) {
    dogBreed = dogBreed.split(' ');
    let urlString;
    if (dogBreed.length === 1) {
      urlString = `https://dog.ceo/api/breed/${dogBreed[0]}/images`;
    } else if (dogBreed.length === 2) {
      urlString = `https://dog.ceo/api/breed/${dogBreed[1]}/${dogBreed[0]}/images`;
    }
    const response = await fetch(urlString);
    if (response.status === 404) {
      return;
    }
    if (!response.ok) {
      throw new Error('API response error');
    }
    const data = await response.json();
    return data.message;
  }

  displayImage(imageList) {
    const image = document.createElement('img');
    image.src = preloading;
    image.dataset.src = imageList[Math.floor(Math.random() * imageList.length)];
    var lazyLoadInstance = new LazyLoad();
    document.querySelector('#content').appendChild(image);
    image.classList.add('lazy');
    lazyLoadInstance.update();
  }

  handleSearch() {
    const searchTerm = document.querySelector('#dogSearchInput').value.toLowerCase();
    if (!searchTerm) {
      this.displayError('Please enter a search term');
      return;
    }
    this.getImages(searchTerm)
      .then((imageList) => {
        if (imageList) {
          this.clearContent();
          this.clearErrors();
          const count = Math.floor(Number(document.querySelector('#imageNumberInput').value));
          if (isNaN(count) || count == '') {
            document.querySelector('#imageNumberInput').value = 1;
            count == 1;
            this.displayImage(imageList);
          } else {
            for (let i = 1; i < count + 1; i++) {
              document.querySelector('#imageNumberInput').value = count;
              this.displayImage(imageList);
            }
          }
        } else {
          this.displayError('Breed not found. Please try to list the breeds first.');
        }
      })
      .catch((error) => {
        this.displayError('Something went wrong. Please try again later.');
        console.error(error);
      });
  }
  setSearchTerm(breedName) {
    document.querySelector('#dogSearchInput').value = breedName;
    this.handleSearch();
  }
}
