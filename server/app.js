//Implement an API server using ExpressJS.
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser());
// add your code here
var data = [
  {
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
  }
];

//GET requests to your server will return data
//Status message from server

app.get('/', (req, res) => {
  res.json('status: ok')
});
//Read All Todo Items from List
app.get('/api/TodoItems', (req, res) => {
  res.json(data);
});
//Read Single Todo Item from List
app.get('/api/TodoItems/:number', (req, res) => {
  res.json(data.find(function (item) {
    return item.todoItemId == req.params.number
  }));
});
//Create a Single Todo Item
app.post('/api/TodoItems/', (req, res) => {
  var postedID = req.body.todoItemId;
  var itemWasFound = false;

  for (var x = 0; x < data.length; x++) {
    if (data[x].toDoItemId === postedID) {
      data[x] = req.body;
      itemWasFound = true;
    }
  }

  if (itemWasFound === false) {
    data.push(req.body)
  }
  res.status(201).json(req.body)
});

app.delete('/api/TodoItems/:number', (req, res) => {
  var deleteItem = req.params.number;
  for (var x = 0; x < data.length; x++) {
    if (data[x].todoItemId == deleteItem) {
      res.json(data[x]);
      data.splice(x, 1)
    }
  }
});

module.exports = app;









