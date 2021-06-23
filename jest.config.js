/**jest.config.js**/
module.exports = {
    testRegex: 'resources/js/test/.*.test.js$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        "^.+\\.jsx?$": "babel-jest"
      },
}