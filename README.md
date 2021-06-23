# README

## Tech stack

1. Laravel 8.x
2. ReactJS Bootstrap 4.x
3. PHP >7.3
4. Artisan test runner
5. Jest test runner

## How to install

1. composer install
2. php artisan migrate
3. php artisan db:seed
4. php artisan queue:work
5. `npm install && npm run dev` to compile React UI Scaffolding
6. `npm run watch` to auto compile React UI
7. `npm test` to run front end Unit Testing

## How to run unit testing

### PHP artisan unit testing (back-end)

```
php artisan test
```
**Expected ouput**
```
   PASS  Tests\Unit\ExampleTest
  ✓ basic test

   PASS  Tests\Feature\DashboardTest
  ✓ must count designer vote

   PASS  Tests\Feature\DatabaseTest
  ✓ example

   PASS  Tests\Feature\ExampleTest
  ✓ basic test

   PASS  Tests\Feature\GuestTest
  ✓ example

   PASS  Tests\Feature\GuestValidationCodeTest
  ✓ must show invalid token
  ✓ must show valid token

   PASS  Tests\Feature\GuestVoteTest
  ✓ must show registration code

   PASS  Tests\Feature\LoginTest
  ✓ must enter email and password
  ✓ successful login

   PASS  Tests\Feature\RouteMiddlewareTest
  ✓ example

   PASS  Tests\Feature\RouteTest
  ✓ example

  Tests:  12 passed
  Time:   3.70s
  ```

### ReactJS unit testing (front-end)
  
```
npm test
```
**Expected ouput**
```
 PASS  resources/js/test/login.test.js
 PASS  resources/js/test/reset_password.test.js
 PASS  resources/js/test/forgot_password.test.js
 PASS  resources/js/test/dashboard.test.js
 PASS  resources/js/test/guest_list.test.js
 PASS  resources/js/test/setting.test.js
 PASS  resources/js/test/guest.test.js

Test Suites: 7 passed, 7 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        4.44 s
Ran all test suites.
```
