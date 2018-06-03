DESCRIPTION (WIP)
===========
This is an example to test with angular 5 the interceptors

COMMANDS
=========

## Run stub application
* Step 1: set json-server:
    `npm install json-server --save-dev`
* Step 2: Run application
    `npm run stub-application`
More info: 
    - https://www.npmjs.com/package/json-server
    - Run application using mocks services

## Run PhantomJStest 
* Step 1: Change the package manager setting
    `ng set --global packageManager=npm`
* Step 2: Add PhantomJS dependency
    `npm install karma-phantomjs-launcher --save-dev`
* Step 3: Add Intl Polyfill Dependency
    `npm install intl --save `
* Step 4: Enable Shims and Pollyfills in `polyfills.ts` file
    - Behind the section `Evergreen browsers require these.`, add the following library:
     `import 'core-js/client/shim';`
    - Add (if it doesn't exist) `import 'intl';`
* Step 5: Enable PhantomJS for Karma in `karma.conf.js` adding:
    - `require('karma-phantomjs-launcher'),`
    - `browsers: ['PhantomJS'],`
    - `singleRun: true`
* Step 6: Run the test
`npm run test` or `npm test`

## Avoid scripts
`--ignore-scripts`

##Interceptors
* Info: 
    https://angular.io/guide/http#intercepting-requests-and-responses


    


