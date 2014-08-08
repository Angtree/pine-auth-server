# pine-auth-server

Welcome to pine authentication server

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