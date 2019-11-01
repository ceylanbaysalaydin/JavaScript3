const randomUser = (function() {
  function randomUserAjax(apiUrl) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl);
    xhr.send();
    xhr.onload = function() {
      if (xhr.status >= 400) {
        console.log('Error from randomUserAjax function:', xhr.status);
      } else {
        const data = JSON.parse(xhr.responseText);
        console.log('Status from randomUserAjax function', xhr.status);
        console.log('Data from randomUserAjax function:', data);
        console.log('Random User from randomUserAjax : ', data.results[0].name);
      }
    };
    xhr.onerror = () => {
      console.log('Network request failed -Ajax');
    };
  }

  function randomUserAxios(apiUrl) {
    axios
      .get(apiUrl)
      .then(function(response) {
        console.log('Status from randomUserAxios function :', response.status);
        console.log('Data from randomUserAxios function:', response.data);
        console.log(
          'Random User from randomUserAxios :',
          response.data.results[0].name,
        );
      })
      .catch(function(error) {
        console.log('Error from randomUserAxios function :', error);
      });
  }
  return {
    ajax: randomUserAjax,
    axios: randomUserAxios,
  };
})();
apiUrl = 'https://www.randomuser.me/api';
randomUser.ajax(apiUrl);
randomUser.axios(apiUrl);
