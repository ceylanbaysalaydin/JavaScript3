const randomPicture = (function() {
  function randomPictureAjax(apiUrl) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl);
    xhr.responseType = 'blob';
    xhr.send();
    xhr.onload = function() {
      if (this.status >= 400) {
        console.log('Error', xhr.status);
      } else {
        const image = document.getElementById('image1');
        image.src = URL.createObjectURL(this.response);
      }
    };
    xhr.onerror = () => {
      console.log('Network request failed -Ajax');
    };
  }

  function randomPictureAxios(apiUrl) {
    axios
      .get(apiUrl, { responseType: 'blob' })
      .then(function(response) {
        const image = document.getElementById('image2');
        image.src = URL.createObjectURL(response.data);
      })
      .catch(function(error) {
        console.log('Error from Axios function :', error);
      });
  }
  return {
    ajax: randomPictureAjax,
    axios: randomPictureAxios,
  };
})();
const apiUrl = 'https://picsum.photos/400';
randomPicture.ajax(apiUrl);
randomPicture.axios(apiUrl);
