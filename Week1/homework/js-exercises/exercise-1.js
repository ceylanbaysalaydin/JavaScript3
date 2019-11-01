const placeKitten = (function() {
  function placeKittenAjax() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://wwww.placekitten.com/api');
    xhr.send();
    xhr.addEventListener('load', function() {
      if (xhr.status >= 400) {
        console.log('Error :' + xhr.status);
      } else {
        console.log(xhr.responseText);
      }
    });
    xhr.onerror = e => console.log('Network request failed -Ajax');
  }

  function placeKittenAxios() {
    axios
      .get('https://wwww.placekitten.com/api')
      .then(function(response) {
        console.log('Data from Axios function:', response);
      })
      .catch(function(error) {
        console.log('Error from Axios function :', error);
      });
  }
  return {
    ajax: placeKittenAjax,
    axios: placeKittenAxios,
  };
})();
placeKitten.ajax();
placeKitten.axios();
