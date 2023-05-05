const router = require('express').Router()
const twilio = require('twilio');
const accountSid = "ACd1adc2ff0ada6bffbcd003a9e5c75e24";
const authToken ="f575eea69e06b2590e3088ea4a832701";
const verifySid = "VA846265135520d0ae1edd1e07d3bb9387";
const client = require("twilio")(accountSid, authToken);

router.get('/verify/:to', async (req, res) => {
    const to = req.params.to
  
    client.verify
      .v2
      .services(verifySid)
      .verifications.create({ to, channel: 'sms' })
      .then((verification) => {
        res.json(verification)
      })
      .catch((err) => {
        res.json(err)
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