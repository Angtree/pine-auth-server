pine-auth-server
================

Welcome to pine authentication server



How to install project
======================

Run tests
---------
  1. Start redis server
    
    $ redis-server /usr/local/etc/redis.conf
    
  2. Start express server
  
    $ node bin/www 
  
  3. Run mocha test
    
    $ mocha ./test --recursive --reporter nyan


Project documentation
======================

  * Install yuidocjs
  
    $ npm install -g yuidocjs
    
  * Run yuidoc
  
    $ yuidoc .

  * View out/index.html page


## Quick Examples

```javascript
Register user api

Content-type: application/json
{
    "username": "+821012345678",
    "password": "password_here"
}

Password must have one of english and one of number character.
8 <= password <= 24.
```

```javascript
Login user api

Content-type: application/json
{
    "username": "+821012345678",
    "password": "password_here"
}

If log in succeed, cookie will be returned.
Expire date is UTC String.

ex) Cookie: sessionid="aaaaaaaaaaaaaaa"; expires=Fri, 08 Aug 2014 12:10:42 GMT"
```