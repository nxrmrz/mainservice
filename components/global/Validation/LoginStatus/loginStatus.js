// Check if User is Logged In and if user is Real
const loginStatus = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/users/login-status",
      success: data => {
        if (data.status == "success") {
          resolve(data.content);
        } else {
          reject(data.content);
        }
      }
    });
  });
};
