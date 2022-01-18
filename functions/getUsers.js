const fetch = require('node-fetch');

const API_ENDPOINT = 'https://api.github.com/search/users';

exports.handler = async (event, context) => {
  const searchText = event.queryStringParameters && event.queryStringParameters.searchText;
  const requestedPage = event.queryStringParameters && event.queryStringParameters.requestedPage;
  let response;
  try {
    let requestUrl = API_ENDPOINT + '?' + new URLSearchParams({
      'q': searchText,
      'per_page': 10,
      'page': requestedPage
    });
    response = await fetch(requestUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
      }
    });
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: await response.json()
    })
  };
}
