# GitHub User Search

This project consumes public GitHub APIs in an Angular front-end. API calls are made from serverless functions in order
to safely secure an authentication token that allows for larger rate limits.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3.

## Development server

Run `netlify dev` to run a local development server that runs Netlify Functions and injects all necessary environment
variables. Navigate to `http://localhost:8888/`. The app will automatically reload if you change any of the source
files. You will need to authenticate to be able to run in this mode, and you will need to install the Netlify CLI by
running `npm install -g netlify-cli`.

To create a local Angular server without loading back-end processes, run `ng serve` and navigate
to `http://localhost:4200/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io). End-to-end tests are run on every
build and test runs are recorded to a [public dashboard](https://dashboard.cypress.io/projects/4z8iyr/runs).

[![github-user-search](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/4z8iyr&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/4z8iyr/runs)

## View deployed app

The application has been deployed to https://github-users.chrisstone.dev. The application is hosted
on [Netlify](https://www.netlify.com/). [Deployment logs](https://app.netlify.com/sites/github-user-search-chrisstonedev/deploys) are made available publicly and can be viewed online.

[![Netlify Status](https://api.netlify.com/api/v1/badges/caf0035a-d0fb-405c-bdba-c4f07c7f62e8/deploy-status)](https://app.netlify.com/sites/github-user-search-chrisstonedev/deploys)

## Further help

To get more help on the Angular CLI, use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

To get more help on the Netlify CLI, use `netlify help` or go to
the [Netlify CLI Command List](https://cli.netlify.com/) page.
