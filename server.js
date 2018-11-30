const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server');

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:3eab0279-4c02-4923-a8c6-0952af4b709e',
  key: 'a4b17dbe-8504-40fe-9c86-35e96687cb89:q8OUCZfdxU5/w2ENij0Z9u30cSLFnTYIYo9hbRQzsPo='
})

app.use(bodyParser.urlencoded({ extended: false }))
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(cors())


app.post('/users', (req, res) =>{
  const { username } = req.body

  chatkit.createUser({
    id: username,
    name: username
    // id: 'xyz',
    // name: 'xyz'
  })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if(error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      }else{
        res.status(error.statusCode >= 100 && error.statusCode < 600 ? error.code : 500).json(error)
      }
    })
    
   /*  .then(() => {
        console.log('User created successfully');
      }).catch((err) => {
        console.log(error.error_type);
      }); */
})

app.post('/authenticate', (req, res) => {
  const { grant_type } = req.body
  console.log('grant_type', grant_type, 'req.body', req.body)
  res.json(chatkit.authenticate({ grant_type, userId: req.query.user_id }))
})


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
