/**
 * Helper functions for making API requests! 
 * All formatting/converting to JSON are done for you.
 *
 * Note: these functions return Promises
 */   

const toJSON = (res) => {
    if (!res.ok) {
        throw `Failed with error ${res.status} and text: ${res.statusText}`
    }
    console.log('hello?');
    return res
        .json()
        .catch((err) => {
            throw `Response cannot not be converted to JSON`
        });
}

export const get = (endpoint, params = {}) => {
    // ex: { key0: val0, key1: val1 } => key0=val0&key1=val1
    const formattedParams = Object.keys(params)
        .map((key) => key + '=' + encodeURIComponent(params[key]))
        .join('&');
    let path;
    if (formattedParams) {
        path = endpoint + '?' + formattedParams;
    } else {
        path = endpoint;
    }
    return fetch(path)
        .then(toJSON)
        .catch((err) => {
            throw `GET request to ${path} failed with error: ${err}`
        });
}

export const post = (endpoint, body = {}) => {
    return fetch(endpoint, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      })
      .then(toJSON)
      .catch((err) => {
          throw `POST request to ${endpoint} failed with error: ${err}`
      });
}
