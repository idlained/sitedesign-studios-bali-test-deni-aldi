const bcrypt = require('bcrypt');

const plainPassword = '123456';

bcrypt.hash(plainPassword, 10).then(hash => {
  console.log('Hash baru untuk password 123456:', hash);
});