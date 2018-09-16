const functions = require('firebase-functions');
const fetch = require('node-fetch');

const get = (url) => {
  const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', timeout: 5 * 1000},
  };
  return fetch(url, options).then(response => response.json());
};

const put = (url, body) => {
  console.log('http requesting.. ', url);
  const options = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json', timeout: 5 * 1000},
  };
  return fetch(url, options).then(response => response.text());
};

const post = (url, body) => {
  console.log('http requesting.. ', url);
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json', timeout: 5 * 1000},
  };
  return fetch(url, options).then(response => response.text());
};

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

// const line = require('@line/bot-sdk');
// const config = {
//   channelAccessToken: 'sqEytFUZdDJhPP4H4McGquYFNrCNGcoS8kqWeX4wsTxeJZOnW+VEjNvk0dypZ3mepfOIKbC6wMWTCrOu8rr9XdR/PfoDDhdSyvcRI+Pgkv7M2cAs+8YuC4HlXVBzL6hY2zCEZEm6pYHPZg9jsmHxKAdB04t89/1O/w1cDnyilFU=',
//   channelSecret: 'cbf5a858d9275514b75916a930ba6247',
// };
// const client = new line.Client(config);


exports.line_cmmc_chatbot_webhook = functions.https.onRequest((req, res) => {
  function handleEvent(event) {
    if (event.type === 'message' && event.message.type === 'text') {
      console.log('-----------------------------------------');
      console.log(`source type = ${event.source.type}`);
      console.log(`message text = ${event.message.text}`);
      console.log(`replyToken = ${event.replyToken}`);
      console.log(JSON.stringify(event));
      console.log('/-----------------------------------------');
  // }
      // if (event.message.text) {
        
      //   const data = {
      //     type: 'text',
      //     text: event.message.text,
      //   };

        // put("https://api.netpie.io/topic/superman/gearname/apiman?retain&auth=uOAduYd4huNwtVW:tfrsqVJdto4sdZNYKlghwdPDT",
         // data).then(res => console.log(res))
        
        // client.replyMessage(event.replyToken, data).then(function(res) {
        //   console.log(`reply result = `, res);
        // });

        // if (event.message.text.indexOf('@DustBoy') !== -1) {
        //   console.log('sending replyMessage');
        //   const data = {
        //     type: 'text',
        //     text: 'สภาพอากาศตอนนี้แย่มากเลยครับ.. น้อง DustBoy ล่ะกลุ้มใจจริงๆเลย',
        //   };
          // client.replyMessage(event.replyToken, data).then(function(res) {
          //   console.log(`reply result = `, res);
          // });
        // }
      // }

    }
    // else {
    //   if (event.type === 'postback') {
    //     client.replyMessage(event.replyToken,
    //         {type: 'message', text: 'ระบบกำลังประมวลผล (แต่ไม่ตอบกลับ)'});
    //   }
    //   console.log('another message type');
    //   console.log(event);
    // }
  }

  if (req.method === 'POST') {
    const body = Object.assign(req.body);
    body.events.map(handleEvent);
    res.status(200).send('post ok');
  }
  else if (req.method === 'GET') {
    res.status(200).send('get ok');
  }
  else {
    res.status(500).send('Forbidden!');
  }
});
