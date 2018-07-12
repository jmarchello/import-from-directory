const fs = require('fs');

exports.importFromDirectory = (directoryPath, maxPasses=4) => {
    const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.js'));
    const result = {};
    let passes = 0;
    let error;

    while (files.length > 0 && passes <= maxPasses) {
        files.map(file => {
            try {
                result[file.split('.')[0]] = require(`${directoryPath}/${file}`);
                files.splice(files.indexOf(file), 1);
            } catch (err) {
                error = err;
            }
        });
        passes++;
    }

    if (passes >= maxPasses && files.length > 0) {
        console.log("Maximum import attempts reached, throwing last error");
        throw error;
    }

    return result;
};

