const fs = require('fs');
const path = require('path');
const { O_CREAT, O_RDWR, O_TRUNC } = require('constants');

function addAttachements(files) {
    let attachments = '';

    files.each((file) => {
        if (file.contentType.includes('image')) {
            attachments += `        <img class="image-attachment" src=${file.url}>`;
        } else {
            attachments += `        <a href=${file.url}>${file.name}</a>\n`;
        }
    });
    return attachments;
}

function transcriptChannel(data, messages) {
    let transcripted = '<html>\n    <head></head>\n    <body>';

    transcripted += `${data}\n`;
    messages.forEach((message) => {
        const date = String(message.createdAt.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }));
        transcripted += '<div class="parent-container">\n';
        transcripted += '   <div class="avatar-container">';
        transcripted += `       <img src=${message.author.avatarURL()} class="avatar">`;
        transcripted += '   </div>\n';
        transcripted += '   <div class="message-container">';
        transcripted += `       <div class="message-title"><span>${message.author.tag}</span><span class="message-date">${date}</span></div>\n`;
        transcripted += `       <span class="message-content">${message.cleanContent}</span>`;
        transcripted += addAttachements(message.attachments);
        transcripted += '   </div>\n';
        transcripted += '</div>';
    });
    transcripted += '   </body>\n</html>';
    return transcripted;
}

module.exports = async function (messages, ticketName) {
    const templatePath = path.join(__dirname, '..', '..', 'assets', 'template.html');
    const ticketPath = path.join(__dirname, '..', `data/cache/${ticketName}.html`);
    let data = fs.readFileSync(templatePath, 'utf8');
    return new Promise((resolve, reject) => {
        fs.open(ticketPath, O_CREAT | O_RDWR | O_TRUNC, (err, fd) => {
            if (err) { console.log(`[SAE-BOT][ERROR] ${err}`); reject(err); }
            fs.closeSync(fd);
        });
        data = transcriptChannel(data, messages);
        fs.writeFile(ticketPath, data, (err) => {
            if (err) { console.log(`[SAE-BOT][ERROR] ${err}`); reject(err); }
        });
        resolve(ticketPath);
    });
};
