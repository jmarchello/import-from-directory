const importFromDirectory = require('./index.js');

const dirPath = "./dummy/";

it("imports the correct files with default parameters", () => {
    const expectedResult = [ 'cats', 'chickens', 'dogs' ];
    const filenames = Object.keys(importFromDirectory(dirPath));
    expect(filenames).toHaveLength(expectedResult.length);
    expect(filenames).toEqual(expect.arrayContaining(expectedResult));
});

it("ignores files based on a regex pattern", () => {
    const expectedResult = [ 'cats', 'dogs' ];
    const ignorePattern = /.*\.test.*/;
    const filenames = Object.keys(importFromDirectory(dirPath, ignorePattern));
    expect(filenames).toHaveLength(expectedResult.length);
    expect(filenames).toEqual(expect.arrayContaining(expectedResult));
});
