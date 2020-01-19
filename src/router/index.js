import express from 'express'
const router = express.Router()

import { google } from 'googleapis'
import OAuth2Data from '../../google_key.json'

const CLIENT_ID = OAuth2Data.web.client_id
const CLIENT_SECRET = OAuth2Data.web.client_secret
const REDIRECT_URL = OAuth2Data.web.redirect_uris

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
let authed = false

router.get('/google-auth',function(req,res){
    if (!authed) {
        // Generate an OAuth URL and redirect there
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/gmail.readonly'
        })
        // eslint-disable-next-line no-undef
        console.log(url)
        res.redirect(url)
    } else {
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client })
        gmail.users.labels.list({
            userId: 'me',
        }, (err, res) => {
            // eslint-disable-next-line no-undef
            if (err) return console.log('The API returned an error: ' + err)
            const labels = res.data.labels
            if (labels.length) {
                // eslint-disable-next-line no-undef
                console.log('Labels:')
                labels.forEach((label) => {
                    // eslint-disable-next-line no-undef
                    console.log(`- ${label.name}`)
                })
            } else {
                // eslint-disable-next-line no-undef
                console.log('No labels found.')
            }
        })
        res.send('Logged in')
    }
})

router.get('/auth/google/callback',function(req,res){
    const code = req.query.code
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                // eslint-disable-next-line no-undef
                console.log('Error authenticating')
                // eslint-disable-next-line no-undef
                console.log(err)
            } else {
                // eslint-disable-next-line no-undef
                console.log('Successfully authenticated')
                oAuth2Client.setCredentials(tokens)
                authed = true
                res.redirect('/')
            }
        })
    }
})

router.use((req, res) => { 
    res.status(404).send('404')
})

router.use((err, req, res) => { 
    // eslint-disable-next-line no-undef
    console.error(err.stack)
    res.status(500).send('500')
})

export default router
