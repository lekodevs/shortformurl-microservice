//app init const
const express = require('express');
const app = express();
app.use(express.json());
const shortId = require('shortid');
const validator = require('validator');

//set server port 
const port = 8090;

const datasource = require('./datasource');


//init app port listener
app.listen(port, () => {
  console.log(`microservice running on port, ${port}`);
});

//default app endpoint - check if service is up
app.get('/', (request, response) => {
  response.send('Hello shortform-microservice');
});

//fetch all urls
app.get('/all', (request, response) => {
  datasource.fetchAllShortUrls().then((data) => {
    response.send(JSON.stringify(data));

  }).catch((error) => { console.log(error) });
});

//create a new short url
app.post('/shorten', (request, response) => {
  if (validateUrl(request.body.url)) {
    datasource.fetchUrlByOriginal(request.body.url).then((data) => {
      if (data.length > 0) {
        response.send('Url already has short version');
      } else {
        let existingShortUrl = false;
        let redirect = null;
        do {
          let short = shortId.generate();

          redirect = `https://${short}.com`;
          existingShortUrl = datasource.fetchUrlByShort(redirect).then((payload) => {
            return payload.length > 0;
          });
        } while (!existingShortUrl);

        datasource.createShortUrl(request.body.url, redirect);
        response.send(`Url: ${request.body.url} has been successfully shortened to ${redirect}`);
      }
    });
  } else {
    response.send('Invalid Url, please fix and try again.');
  }
});

//update url short url to a new short url
app.put('/shorten', (request, response) => {
  let existingShortUrl = false;
  let redirect = null;
  do {
    let short = shortId.generate();

    redirect = `https://${short}.com`;
    existingShortUrl = datasource.fetchUrlByShort(redirect).then((payload) => {
      return payload.length > 0;
    });
  } while (!existingShortUrl);


  datasource.updateShortUrlForOriginalUrl(request.body.url, redirect);
  response.send(`Updated Url ${request.body.url} with a new short url ${redirect}`);
});

//delete an existing short url
app.delete('/shorten', (request, response) => {
  datasource.deleteUrlByOriginal(request.body.url);
  response.send(`deleted ${request.body.url}`);
});

const validateUrl = (url) => {
  return validator.isURL(url);
}

