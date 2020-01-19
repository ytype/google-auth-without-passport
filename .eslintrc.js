module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent":[
            "error",
            4
        ],
        semi: [2, 'never'],
        "no-unused-vars": "off"
    },
    "env": {
        "mocha": true
    }
}