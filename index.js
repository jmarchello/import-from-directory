const fs = require('fs');

const importFromDirectory = (directoryPath, ignorePattern, maxPasses=4, verbose=false) => {
    let files = [];

    try {
        files = fs.readdirSync(directoryPath).filter(file => {
            return file.endsWith('.js')
                && (!ignorePattern || !file.match(ignorePattern))
        });
    } catch (err) {
        verbose && console.log(err);
        return files;
    }

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
