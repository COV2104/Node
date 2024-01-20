const crypto = require('crypto');

const securePasswordGenerator = {
  generatePassword: (length, useLetters, useNumbers, useSpecialCharacters) => {
    let characters = '';
    let password = '';

    if (useLetters) {
      characters += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (useNumbers) {
      characters += '0123456789';
    }
    if (useSpecialCharacters) {
      characters += '!@#$%^&*';
    }

    characters = characters || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    password = password.split('').sort(() => 0.5 - Math.random()).join('');
  
    return password;
  }
};

module.exports = securePasswordGenerator;