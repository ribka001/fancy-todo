function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  axios({
    method: 'POST',
    url: 'http://localhost:3000/login-google',
    data: {
      google_access_token: id_token
    }
  })
  .then(({ data }) => {
    console.log(data)
    localStorage.setItem('token', data)
    isLogin()
  })
  .catch((err) => {
    console.log(err)
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.clear();
    isLogin();
  }); 
}