const bcrypt = require('bcryptjs');

const password = 'topmobile'; // KËTU shkruaj fjalëkalimin që do të hash-osh

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hash:', hash);
});
