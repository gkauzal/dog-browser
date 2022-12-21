import '../css/contentComponent.css';

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
}
