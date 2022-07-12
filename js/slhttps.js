class slhttp {
  get = (url) => {
    return new Promise(function (accept, reject) {
      fetch(url)
        .then((res) => {
          if (res.status >= 200) {
            return res.json();
          }
          throw new Error(res.status + '' + res.statusText);
        })
        .then((data) => accept(data))
        .catch((err) => reject(err));
    });
  };

  post = (url) => {
    return new Promise(function (accept, reject) {
      fetch(url)
        .then((res) => {
          if (res.status >= 200) {
            return res.json();
          }
          throw new Error(res.status + '' + res.statusText);
        })
        .then((data) => accept(data))
        .catch((err) => reject(err));
    });
  };

  put = (url) => {
    return new Promise(function (accept, reject) {
      fetch(url)
        .then((res) => {
          if (res.status >= 200) {
            return res.json();
          }
          throw new Error(res.status + '' + res.statusText);
        })
        .then((data) => accept(data))
        .catch((err) => reject(err));
    });
  };
  delete = (url) => {
    return new Promise(function (accept, reject) {
      fetch(url)
        .then((res) => {
          if (res.status >= 200) {
            return res.json();
          }
          throw new Error(res.status + '' + res.statusText);
        })
        .then((data) => accept(data))
        .catch((err) => reject(err));
    });
  };
}
