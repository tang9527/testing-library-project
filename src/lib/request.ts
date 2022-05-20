/**
 * Get Reqeust
 * 暂时支持IE浏览器
 * @param {string} url
 * @returns {Promise<HttpResponse>}
 */
export function httpGetRequest(url: string): Promise<HttpResponse> {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();
  return new Promise((resolve) => {
    xhr.onreadystatechange = function () {
      const { readyState, status, responseText } = xhr;
      if (readyState === 4) {
        if (status === 200) {
          const data = JSON.parse(responseText);
          resolve({ status, data });
        } else {
          resolve({ status, data: null });
        }
      }
    };
  });
}
