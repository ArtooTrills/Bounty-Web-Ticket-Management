'use strict';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function(user) {
  if (user) {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      fullname: capitalizeFirstLetter(user.firstname) + ' ' + capitalizeFirstLetter(user.lastname),
      role: user.role || 1
    };

  } else {
    return null;
  }
}
