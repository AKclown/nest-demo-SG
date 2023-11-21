const Imap = require('imap');
const { MailParser } = require('mailparser');
const fs = require('fs');
const path = require('path');

const imap = new Imap({
  user: '1097986280@qq.com',
  password: 'spsdowmooyphfhce',
  host: 'imap.qq.com',
  port: 993,
  tls: true
})

imap.once('ready', () => {
  imap.openBox('INBOX', true, (err) => {
    imap.search([['SEEN'], ['SINCE', new Date('2023-11-19 22:00:00').toLocaleString()]], (err, results) => {
      if (!err) {
        handleResults(results);
      } else {
        throw err;
      }
    })
  })
})

function handleResults(results) {
  imap.fetch(results, {
    bodies: ''
  }).on('message', (msg) => {
    const mailParser = new MailParser();

    msg.on('body', (stream) => {
      const info = {};
      stream.pipe(mailParser)
      mailParser.on('headers', (headers) => {
        info.theme = headers.get('subject')
        info.form = headers.get('from').value[0].address;
        info.mailName = headers.get('from').value[0].name;
        info.to = headers.get('from').value[0].address;
        info.datatime = headers.get('date').toLocaleString();
      })

      mailParser.on('data', (data) => {
        if (data.type === 'text') {
          info.html = data.html;
          info.text = data.text;
          const filePath = path.join(__dirname, 'mails', info.theme + '.html');
          fs.writeFileSync(filePath, info.html || info.text)
          console.log('info: ', info);
        }

        if (data.type === 'attachment') {
          const filePath = path.join(__dirname, 'files', data.filename)
          const ws = fs.createWriteStream(filePath);
          console.log('data.content: ', data.content);
          data.content.pipe(ws);
        }
      })

    })
  })
}


imap.connect();



