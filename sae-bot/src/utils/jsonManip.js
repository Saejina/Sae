const fs = require('fs');

exports.readFileAsync = function (file) {
    return new Promise((res, rej) => {
        fs.readFile(file, 'utf8', (err, content) => {
            if (err) {
                return rej(err);
            }
            return res(content);
        });
    });
};

exports.writeFileAsync = function (file, data) {
    return new Promise((res, rej) => {
        fs.writeFile(file, data, 'utf8', (err) => {
            if (err) {
                return rej(err);
            }
            return res(true);
        });
    });
};

exports.writeJsonFile = async function (file, data) {
    await this.writeFileAsync(file, JSON.stringify(data));
};

exports.readJsonFile = async function (file) {
    const contentFile = await this.readFileAsync(file);
    return JSON.parse(contentFile);
};
