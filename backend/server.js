const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 9000

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
})
/*
app.get('/image.jpg', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/image.jpg`))
})

app.get('/script.js', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../backend/script.js`))
})
*/
app.use('/public', express.static(`${__dirname}/../frontend/public`))

app.get('/data', (req, res) => {
  res.sendFile(path.join(`${__dirname}/data/data.json`))
})

app.get('/data/:id', (req, res) => {
	//console.log(req.params)
	try {
		const searchId = parseInt(req.params.id)
		//console.log(searchId)
		if(isNaN(searchId)) {
			res.status(418).send('Not a number')
		} else {
			fs.readFile(`data/data.json`, (err, data) => {
				let result = null
				const fileData = JSON.parse(data)
				//console.log(fileData)
				for (let index = 0; index < fileData.length; index++) {
					const element = fileData[index];
					if (element.id === searchId) {
						console.log(element)
						result = element
					}
				}
				if (result === null) {
					res.status(404).send('Nincs ilyen user')
				} else {
					res.send(result)
				}
			})
		}
	} catch(error) {
		console.log(error)
		res.send('It is an error!')
	}
})

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`)
})


/* const http = require('http');
const fs = require('fs');
const path = require('path');
const mediaTypes = {
	"html": "text/html",
	"jpeg": "image/jpeg",
	"jpg": "image/jpeg",
	"png": "image/png",
	"svg": "image/svg+xml",
	"json": "application/json",
	"js": "text/javascript",
	"css": "text/css",
	"csv": "text/csv",
	"mp3": "audio/mpeg",
	"mp4": "video/mp4",
	"oga": "audio/ogg",
	"ogv": "video/ogg",
	"pdf": "application/pdf",
	"weba": "audio/webm",
	"webm": "video/webm",
	"webp": "image/webp",
	"woff": "font/woff",
	"woff2": "font/woff2",
	"ttf": "font/ttf",
	"gif": "image/gif"
};

const server = http.createServer((req, res) => {

	const errorHTML = `
		
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="preconnect" href="https://fonts.googleapis.com"> 
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
		<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet">
		<style>
			body{
				padding: 0; margin: 0;
				font-family: 'Montserrat', sans-serif;
				font-weight: 800;
				background-color: #4343F9;
				color: #fff;
			}
			#root{
				width: 100%;
				height: 100vh;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 21px;
			}
		</style>
		<title>Not here</title>
	</head>
	<body>
		<div id="root">Rise your gaze to the sky<br/>than a bit back to the URL bar<br/>and check that link again</div>
	</body>
	</html>
	
	`;
    
	let filePath = path.resolve(__dirname + '/../frontend' + req.url);
    
	fs.access(filePath, fs.constants.R_OK, (err) => {
	if(err){
		res.statusCode = 404;
		res.end(errorHTML);
	}else{
		if(fs.statSync(filePath).isDirectory()) {
			filePath += '/index.html';
		}
		fs.readFile(filePath, "binary", (err, data) => {
			if(err) {
				res.statusCode = 500;
				res.end(errorHTML);
			} else {
				let mediaType = mediaTypes[filePath.split('.').pop()];
      
				if (!mediaType) {
					mediaType = 'text/plain';
				}
				res.writeHead(200, { "Content-Type": mediaType });
				res.write(data, "binary");
				res.end();
			}
		});
	}
	});
});

server.listen(9000, "127.0.0.1", () => {
    const addr = server.address();
		console.log(`http://${addr.address}:${addr.port}`);
}); */