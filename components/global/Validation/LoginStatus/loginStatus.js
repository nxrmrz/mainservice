// Check if User is Logged In and if user is Real
const loginStatus = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/users/login-status",
      success: data => {
        if (data) {
          resolve();
        } else {
          reject();
        }
      }
    });
  });
};
