const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const apiUrl = event.queryStringParameters && event.queryStringParameters.apiUrl;
  let response;
  try {
    response = await fetch(apiUrl, {
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
