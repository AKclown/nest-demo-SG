const nodemailer = require("nodemailer");
const fs = require('fs')
const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
        user: '1097986280@qq.com',
        pass: 'spsdowmooyphfhce'
    },
});

async function main() {
  const info = await transporter.sendMail({
    from: '"AK" <1097986280@qq.com>',
    to: "1376513637@qq.com",
    subject: "AKclown nest project",
    text: "努力努力再努力",
    html:fs.readFileSync('./index.html')
  });

  console.log("邮件发送成功：", info.messageId);
}

main().catch(console.error);
