const fs = require('fs');

const importFromDirectory = (directoryPath, maxPasses=4) => {
    const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.js'));
    const result = {};
    let passes = 0;
    let errors = [];

    while (files.length > 0 && passes <= maxPasses) {
        files.map(file => {
            try {
                result[file.split('.')[0]] = require(`${directoryPath}/${file}`);
                files.splice(files.indexOf(file), 1);
            } catch (err) {
                errors.push(err);
            }
        });
        passes++;
    }

    if (passes >= maxPasses && files.length > 0) {
        throw new Error(`Maximum import attempts reached, the following errors occured on the last attempt: ${errors}`);
    }

    return result;
};

module.exports = importFromDirectory;
