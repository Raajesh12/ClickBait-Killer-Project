# Demo server code for MP4
You should be able to do
`npm install` and `nodemon server.js`

Nodemon does auto-reloading the same way grunt does on the frontend.

You might have to install nodemon on the vagrant machine using
`npm install -g nodemon`

Quick Documentation
--------------------------------
all running under localhost:3000

under /api: 
  .get - returns 'Alchemy API routing (work pl0x)'

under /api/alchemy:

need to specify these in body:

 - inputstyle: url, text, html
 - input: the data (url, "Text input", html)
 - method: what function to call? keywords, seniment, etc.
   
Supported Methods:

- entities
- keywords
- concepts
- sentiment
- text
- author
- language
- title
- relations
- feeds
- microformats
- taxonomy
- combined
- image
- image_keywords
- three special (author, keywords, doc-sentiment)

See http://www.ibm.com/watson/developercloud/alchemy-language/api/v1/#methods for descriptions of each call

Alchemy will return a JSON file containing its analysis