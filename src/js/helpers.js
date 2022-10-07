import { TIMEOUT_SEC } from './config';

/**
 * Returns a rejected promise after the specified seconds pass
 * @param {number} seconds
 * @returns {Promise} promise always returns rejected
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Creates a GET request or POST request based on the parameter passed into the function
// If !uploadData it will be a GET request, otherwise it will use the uploadData as the payload
const _AJAX = async function (url, uploadData = undefined) {
  return uploadData
    ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      })
    : fetch(url);
};

/**
 * Returns JSON data of specified GET request
 * @param {string} GET request url
 * @returns {Object | Error} Returns request data unless timedout or error happens
 */
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([_AJAX(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * Sends POST request with the specified payload
 * @param {string} POST request url
 * @param {Object} POST JSON payload
 * @returns {Object | Error} Returns request data unless timedout or error happens
 */
export const sendJSON = async function (url, uploadData) {
  try {
    const res = await Promise.race([
      _AJAX(url, uploadData),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
