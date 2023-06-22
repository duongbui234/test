const regex = /<title>(.*)<\/title>/im;
let result = [];

module.exports = async (listUrl) => {
  result = [];
  console.time("time");
  result = await Promise.all(
    listUrl.map(async (uri) => {
      try {
        const res = await fetch(uri);
        const body = await res.text();
        if (body.match(regex)[1]) {
          return { uri, message: body.match(regex)[1] };
        }
      } catch (error) {
        return { uri, message: "Vui long kiem tra lai url" };
      }
    })
  );
  console.timeEnd("time");
  return result;
};
