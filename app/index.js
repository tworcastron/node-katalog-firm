const app = require('./app.js');
const { port, ssl } = require('./config');
const https = require('https');
const fs = require('fs');

// http 80
app.listen(port, () => {
  console.log(`Server uruchomiony na porcie: ${port}`);
});

// https 443
if (ssl) {
  https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/kurs-node.tworcastron.pl/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/kurs-node.tworcastron.pl/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/kurs-node.tworcastron.pl/chain.pem'),
  }, app).listen(443, () => {
    console.log(`Server uruchomiony na porcie: 443`);
  });
}