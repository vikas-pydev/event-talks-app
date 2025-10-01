const http = require('http');
const fs = require('fs');
const path = require('path');

const talks = [
    {
        title: 'The Future of Artificial Intelligence',
        speakers: ['Jane Doe'],
        category: ['AI', 'Machine Learning'],
        description: 'A deep dive into the latest advancements in AI and what to expect in the coming years.'
    },
    {
        title: 'Modern Web Development with React',
        speakers: ['John Smith'],
        category: ['Web Development', 'JavaScript'],
        description: 'Learn how to build fast, scalable, and modern web applications using React.'
    },
    {
        title: 'Cybersecurity in the Cloud',
        speakers: ['Emily Jones', 'Michael Brown'],
        category: ['Cybersecurity', 'Cloud Computing'],
        description: 'An overview of the best practices for securing your cloud infrastructure.'
    },
    {
        title: 'The Rise of Serverless Architectures',
        speakers: ['David Wilson'],
        category: ['Serverless', 'Cloud Computing'],
        description: 'Discover the benefits of serverless and how to implement it in your projects.'
    },
    {
        title: 'Data Science for Beginners',
        speakers: ['Sarah Miller'],
        category: ['Data Science', 'Python'],
        description: 'An introductory session to the world of data science and its applications.'
    },
    {
        title: 'Building Mobile Apps with Flutter',
        speakers: ['Chris Green'],
        category: ['Mobile Development', 'Flutter'],
        description: 'A hands-on guide to building beautiful and performant mobile apps with Flutter.'
    }
];

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (req.url === '/api/talks') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(talks));
    } else {
        let filePath = path.join(__dirname, 'public', req.url);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                let extname = path.extname(req.url);
                let contentType = 'text/html';
                switch (extname) {
                    case '.js':
                        contentType = 'text/javascript';
                        break;
                    case '.css':
                        contentType = 'text/css';
                        break;
                }
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
