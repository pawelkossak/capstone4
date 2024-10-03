import express, { response } from "express"
import axios from "axios"
const app = express()
const port = 3000
var userAuth = "84a6b575123c3cd630db680bf2fc21f798c431680850b81fca5c95ddb4ab82e0e1afe9854a9a249d0da7a03c7a6589ec"
var registered = false

const API_URL = "https://api.foxypool.io/api/v3/chia-og"

app.use(express.static("public"))

app.get('/', (req, res) => {
    if (registered) {
        res.redirect("/")
    }
    else {
        res.render("registration.ejs")
    }
})

app.get('/panel', (req, res) => {
    axios.get(API_URL + `/account/${userAuth}`)
    .then((response) => {
        res.render("index.ejs", { 
            data: JSON.stringify(response.data),
            userAuth: userAuth
        })
    })
    .catch((error) => {
        res.render("index.ejs", { data: JSON.stringify(error.response.data), userAuth: userAuth })
    })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))