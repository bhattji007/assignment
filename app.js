const express = require('express');
const bodyParser = require('body-parser');
const { getAuthorizationUrl,getGsuiteToken ,getCalender, getEvents} = require('./google');
const app = express();

// Middleware setup
clientId=`831992996968-cifgn7ptbn6r3637p7pd5i0p3i8qssop.apps.googleusercontent.com`
clientSecret=`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`

app.use(bodyParser.json());

app.get('/rest/v1/calendar/init/', async (req, res) => {
   const url= await getAuthorizationUrl(clientId,clientSecret);
    res.redirect(url);
});
app.get('/rest/v1/calendar/redirect/', async (req, res) => {
    const code=req.query.code;
    console.log(code);
    const token= await getGsuiteToken(code,clientId,clientSecret);
    const calender= await getCalender(token);
    const Id=calender.items[0].id;
    const events=await getEvents(token,Id)
     res.json(events);
 });
// Start the server
app.listen(4000, () => {
  console.log('Server started on port 4000');
});
