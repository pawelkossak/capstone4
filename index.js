import express, { response } from "express"
import axios from "axios"
import bodyParser from "body-parser"
const app = express()
const port = 3000
var isRegistered = false
var API_URL = ""
var userAuth = ""

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    if (isRegistered) {
        res.redirect("/panel")
    }
    else {
        res.render("registration.ejs")
    }
})

app.post('/register', (req, res) => {
    if (isRegistered) {
        res.redirect("/panel")
    }
    else {
        if (req.body.pool == 'option-1'){
            API_URL = "https://api.foxypool.io/api/v3/chia"
        }
        else if (req.body.pool == 'option-2'){
            API_URL = "https://api.foxypool.io/api/v3/chia-og"
        }
        userAuth = req.body.publicKey
        isRegistered = true
        res.redirect("/panel")
    }
})


app.get('/panel', (req, res) => {
    if (isRegistered){
    axios.get(API_URL + `/account/${userAuth}`)
    .then((response) => {
        res.render("index.ejs", { 
            data: JSON.stringify(response.data),
            userAuth: userAuth
        })
    })
    .catch((error) => {
        res.render("index.ejs", { data: JSON.stringify(error.data), userAuth: userAuth })
    })
    }
    else {
        res.redirect("/")
    }

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))