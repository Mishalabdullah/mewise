const http = require('http');
const fs = require('fs');

const users = {
    // Simulated user credentials (replace with your actual user data)
    user1: 'password1',
    user2: 'password2',
    // Add more users as needed
};

const server = http.createServer((req, res) => {
    if (req.url === '/login' && req.method === 'GET') {
        fs.readFile('./login.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error retrieving file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const username = formData.get('username');
            const password = formData.get('password');

            if (users[username] && users[username] === password) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Login successful!');
            } else {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Invalid username or password');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});

