const router = require('express').Router()
const twilio = require('twilio');
const accountSid = "ACd1adc2ff0ada6bffbcd003a9e5c75e24";
const authToken ="fd04e56bbdce2921bf0fe4b1558a3a5c";
const verifySid = "VA846265135520d0ae1edd1e07d3bb9387";
const client = require("twilio")(accountSid, authToken);

router.get('/verify/:to', async (req, res) => {


    const to = req.params.to
    console.log("to",to)
  
    client.verify
      .v2
      .services(verifySid)
      .verifications.create({ to, channel: 'sms' })
      .then((verification) => {
        res.json(verification)
      })
      .catch((err) => {
        res.json(err)
        console.log("error",err)
      })
  })

  router.get('/check/:to/:code', async (req, res) => {
    const to = req.params.to
    const code = req.params.code
    client.verify
      .v2
      .services(verifySid)
      .verificationChecks.create({ to, code })
      .then((verification) => {
        res.json(verification)
      })
      .catch((err) => {
        res.json(err)
      })
  })

  module.exports = router;