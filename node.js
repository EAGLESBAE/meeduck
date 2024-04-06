const express = require('express');
const path = require('path');
const app = express();
WebSocket = require('ws'); 

// 정적 파일 제공을 위한 미들웨어 추가
app.use(express.static(path.join(__dirname, 'public')));

// 홈 페이지 
app.get('/', (req, res) => {
  res.send('<h1>홈 페이지</h1>');
});

// test1 페이지
app.get('/movie', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'movie.html'));
});

// test1 페이지
app.get('/node1', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'node1.html'));
});

// test2 페이지
app.get('/node2', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'node2.html'));
});

// test2 페이지
app.get('/node3', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'node3.html'));
});

// 기타 모든 경로에 대한 처리
app.get('*', (req, res) => {
  res.send('<h1>잘못된  경로입니다.</h1>');
});

// 서버를 지정한 포트에서 실행합니다.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://13.239.147.201:${PORT}/`);
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // 클라이언트로부터 메시지 수신 시 로그 출력
    console.log('서버로부터 받은 메시지:', message);
    
    // 연결된 모든 클라이언트에게 메시지 전송
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        
        console.log('서버로부터 받은 메시지:', message.toString());
        client.send(message.toString());
      }
    }
    );
  });
});
