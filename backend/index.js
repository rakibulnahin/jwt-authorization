// Server
const express = require("express")
const jwt = require('jsonwebtoken')
const cors = require("cors");
const app = express()
app.use(express.json())
app.use(cors())
const user = { username: "Monkey D. Luffy", password: "123" }

const secret_access = "ACCESS_TOKEN"; // for a real application this MUST be in the environment variable
const secret_refresh = "REFRESH_TOKEN"; // for a real application this MUST be in the environment variable

app.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username == user.username && password == user.password) {
        const accessToken = jwt.sign(user, secret_access, { expiresIn: "20s" })
        const refreshToken = jwt.sign(user, secret_refresh, { expiresIn: "90s" })
        res.json({ "accessToken": accessToken, "refreshToken": refreshToken })

    } else {
        res.statusCode = 401;
        res.send("User not found")
    }
})

app.post("/accessVerify", (req, res) => {
    let accessToken = req.headers.authorization.split(" ")[1];
    console.log("accessVerify  access token: ", JSON.stringify(accessToken));
    if (!accessToken) {
        res.statusCode = 401
        res.send("Access token not found")
    }
    jwt.verify(accessToken, secret_access, (err, decoded) => {
        if (err) {
            res.statusCode = 403
            res.send("Invalid Access Token")
        }   
        res.json(decoded)
    })
})

app.post("/refreshVerify", (req, res) => {
    let refreshToken = req.headers.authorization.split(" ")[1];
    console.log("refreshVerify  refresh token: ", JSON.stringify(refreshToken));
    if (!refreshToken) {
        res.statusCode = 401
        res.send("Refresh token not found")
    }
    jwt.verify(refreshToken, secret_refresh, (err, decoded) => {
        if (err) {
            res.statusCode = 403
            res.send("Invalid Refresh Token")
        }
        let accessToken = jwt.sign(user, secret_access, { expiresIn: "20s" })
        res.json({"accessToken": accessToken})
    })
})

app.listen(3001, () => {
    console.log("Server running in port 3001")
})