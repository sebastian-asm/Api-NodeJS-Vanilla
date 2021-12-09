export function bodyParser(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    try {
      req
        .on('data', (chunk) => (body += chunk))
        .on('end', () => resolve(JSON.parse(body)));
    } catch (error) {
      reject(error);
    }
  });
}

export function getQueryId(url) {
  const idQuery = url.split('?')[1];
  const id = {
    key: idQuery.split('=')[0],
    value: idQuery.split('=')[1],
  };
  return id;
}
