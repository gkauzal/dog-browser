import '../css/searchImageComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';
import LazyLoad from 'vanilla-lazyload';
import preloading from '../img/preloading.gif';

class SearchImage extends ContentComponent {
  constructor() {
    super();
    this.render();
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

  render() {
    const markup = `
    <form class="dog-search">
      <span class="search-icon"></span>
      <input type="text" id="dogSearchInput">
      <input type="text" id="imageNumberInput" placeholder="1">
      <button type="submit">Search</button>
    </form>
    `;
    document.querySelector('#header').insertAdjacentHTML('beforeend', markup);
    document.querySelector('.dog-search button').addEventListener('click', (event) => {
      // megakadályozzuk a form küldését
      event.preventDefault();
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
    });
  }
}

export default SearchImage;
