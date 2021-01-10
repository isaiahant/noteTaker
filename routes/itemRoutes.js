const fs = require('fs')
const path = require('path')
const router = require('express').Router()

router.post('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let notes = JSON.parse(data)
      let note = {
        id: notes[notes.length - 1].id + 1,
        ...req.body

      }
      notes.push(note)
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), (err) => {
        if (err) {
          console.log(err)
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
})

router.get('/notes', (req, res)=>{
  fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let notes = JSON.parse(data)
      res.json(notes)
    }
  })
})

router.delete('/notes/*', (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let notes = JSON.parse(data)
      let key = parseInt(req.params[0])
      let found = -1
      let len = notes.length
      for (let i = 0; i < len; i++) {
        if (notes[i].id === key) {
          found = i
          i = len
        }
      }
      if (found !== -1) {
        notes.splice(found, 1)
      }
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), (err) => {
        if (err) {
          console.log(err)
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
})



// nice

module.exports = router