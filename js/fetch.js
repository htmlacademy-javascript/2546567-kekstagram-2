const Urls = {
  GET: 'https://31.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://31.javascript.htmlacademy.pro/kekstagram',
};

const sendRequest = (url, method, body, onSuccess, onError) => {
  fetch(
    url,
    {
      method,
      body,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    },
  ).then((response) => response.json()).then((data) => {
    onSuccess(data);
  }).catch((err) => {
    onError(err);
  });
};

const loadData = (onSuccess, onError) => sendRequest(Urls.GET, 'GET', null, onSuccess, onError);
const uploadData = (onSuccess, onError, body) => sendRequest(Urls.POST, 'POST', body, onSuccess, onError);

export { loadData, uploadData };
