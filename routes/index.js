let request = require('request');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  let response = req.body;
  if (!req.body.captcha) {
    res.json({ message: 'Captcha token is invalid' });
  }
  const secret_key = '6Le_XMIZAAAAAEKMI_t1Ez_F6CnKdzBUCB-y_V6O';
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${req.body.captcha}`;

  request(verifyURL, (err, response, body) => {
    if (err) {
      console.log(err);
    }
    body = JSON.parse(body);
    if (!body.success || body.score < 0.4) {
      return res.json({
        'message': 'Sorry you might be a bot!',
        'score': body.score,
      });
    }
    return res.send({ 'message': 'You are not a bot!', 'score': body.score });
  });
});

module.exports = router;
