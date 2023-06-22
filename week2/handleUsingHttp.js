const https = require("node:https");

const regex = /<title>(.*)<\/title>/im;
let result = [];

const getTitle = async (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let body, title;
        let error;

        if (res.statusCode !== 200)
          error = new Error(
            "Request Failed.\n" + `Status Code: ${res.statusCode}`
          );

        if (error) {
          // Consume response data to free up memory
          res.resume();
          reject(error.message);
          return;
        }
        res.on("data", (chunk) => {
          body += chunk;
          if (!title && regex.test(body)) {
            title = body.match(regex)[1];
          }
        });
        res.on("end", function () {
          resolve(title);
        });
      })
      .on("error", function (e) {
        reject(e.message);
      });
  });
};

module.exports = async (listUrl) => {
  result = [];
  console.time("time");
  result = await Promise.all(
    listUrl.map(async (uri) => {
      try {
        const title = await getTitle(uri);
        return { uri, message: title };
      } catch (error) {
        return { uri, message: error };
      }
    })
  );
  console.timeEnd("time");
  return result;
};
