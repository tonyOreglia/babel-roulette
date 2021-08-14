# Babel Roulette

The MOST important thing when it comes to learning a new language is simply to talk with native speakers. The more the better; and if there is a choice between this and other learning methods; talking to a native speaker is always preferable.

However, this is not always so easy. For some, it's not comfortable striking up conversations with strangers; and when they do the conversation is short lived and irksome to the person forced to tutor this language learner.

In many places, english is a universal second language; and so in some cases the language learner is constantly missing opportunities to learns as people switch to english for convenience.

Event the websites designed to accommodate conversation exchanges require messaging people and scheduling a date/time to meet.

I want to build a platform where a person can sign on and immediately be in conversation in their target language -- matched with another user that is on the platform. By just giving a passcode to uniquely identify themselves; they can gain credits by speaking in their native language; and then use the credits in their target language.

## Run in production with pm2 
```
pm2 start npm -- start
```

See https://stackoverflow.com/questions/31579509/can-pm2-run-an-npm-start-script


## Challenges

- requires multiple concurrent users == solution here can be to choose a single hour time slot once per week and market heavily.
- need people to understand the concept so they see how it's useful -- barrier to entry
  - using a single passcode (no login) can be a confusing new concept to people if not done right
- Needs a nice UI ; can do but annoying / time consuming
- needs secure DB to store people's credits

Estimate 3 months of work (working like 5 hours / week) (very roughly; finger in the air)

## User Experience / Flow

1. User visits website
2. User enters personal UUID or if new they are given a new UUID
3. User chooses target language and native language
4. User indicates if they want to teach or learn
5. User is then linked to a partner

If user enters personal UUID, the server is called and their profile is returned. They can then consume their credits by learning or earn credits by teaching. Updates sent to server for each minute earned or used.

## MVP

- [x] ~~_I go to the website; get a UUID; share that with someone and they can join and talk with me._~~ [2021-03-23]

## MVP Phase 2

- [x] ~~_camera on / off_~~ [2021-03-25]
- [x] ~~_mic on / off_~~ [2021-03-25]
- [x] ~~_UI improvements_~~ [2021-03-29]

### To get this out

1. run peerjs server; expose it to internet
2. run chat website server; expose it to internet
3. update code to point to the "live" servers

## Tasks

- [ ] modal to ask user for their UUID / generate new one
- [ ] DB to store user credits
- [ ] UI
  - [ ] description of the product
  - [ ] some kind of simple wrapper for the video's (minimalist)
- [ ] new domain?
- [ ] upgrade server hardware?
  - [ ] case for the motherboard
  - [ ] new hard drive
  - [ ] air air pressure cleaning thing
- [ ] modal for user to choose `Teach and Earn` or `Learn and Burn`

## Dependencies / Tech Stack

- [Peerjs](https://peerjs.com/)
- [Embedded Javascript (EJS)](https://ejs.co/)
- [ExpressJS](https://expressjs.com/)

## Resources

- HTML
  - https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
  - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
  - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event
- Peerjs
  - https://peerjs.com/docs.html
- [Socket.io](https://socket.io/docs/v3/index.html) - Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server using websockets.
  - https://socket.io/docs/v3/server-api/#socket-join-room
  - https://socket.io/docs/v3/glossary/#Room
  - https://www.nginx.com/blog/nginx-nodejs-websockets-socketio/
  - https://stackoverflow.com/questions/29043879/socket-io-with-nginx
- [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Material Design Light]
  - [Guide](https://getmdl.io/started/index.html)
  - [Mat Design Light Example](https://www.creativebloq.com/web-design/build-static-site-material-design-lite-21619409)
  - [Color Picker](https://getmdl.io/customize/index.html)
- React
  - [Create Element](https://reactjs.org/docs/react-api.html#createelement)
- W3.css
  - https://www.w3schools.com/w3css/defaulT.asp
  - https://www.w3schools.com/w3css/w3css_buttons.asp
