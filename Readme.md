# cookie-session-id [![Build Status](https://travis-ci.org/KillerByte/cookie-session-id.svg)](https://travis-ci.org/KillerByte/cookie-session-id) [![NPM version](https://badge.fury.io/js/cookie-session-id.svg)](http://badge.fury.io/js/cookie-session-id)

  Simple cookie-based session middleware.

## Semantics

  This module provides "guest" sessions, meaning any visitor will have a session,
  authenticated or not. If a session is _new_ a `Set-Cookie` will be produced regardless
  of populating the session.

  The cookie will only store the ID of the client; the actual client data will be stored in the application memory
  and cleared if restarted

## Install

```bash
$ npm install cookie-session-id
```

## API

  View counter example:

```js
var express = require('express')
var session = require('cookie-session-id')

var app = express()

app.use(session({}));

app.use(function (req, res, next) {
    var n = req.session.views || 0
    req.session.views = ++n
    res.end(n + ' views')
})

app.listen(3000)
```

### Options

  - `name` - The cookie name. Defaults to `express:sessid`.

  Other options are passed to `cookies.get()` and
  `cookies.set()` allowing you to control security, domain, path,
  and signing among other settings.

#### Cookie Options

  - `maxage` - a number representing the milliseconds from `Date.now()` for expiry.
  - `expires` - a `Date` object indicating the cookie's expiration date (expires at the end of session by default on the client side, 24 hours on the server side).
  - `path` - a string indicating the path of the cookie (`/` by default).
  - `domain` - a string indicating the domain of the cookie (no default).
  - `secure` - a boolean indicating whether the cookie is only to be sent over HTTPS (`false` by default for HTTP, `true` by default for HTTPS).
  - `secureProxy` - a boolean indicating whether the cookie is only to be sent over HTTPS (use this if you handle SSL outside your node process).
  - `httpOnly` - a boolean indicating whether the cookie is only to be sent over HTTP(S), and not made available to client JavaScript (`true` by default).
  - `overwrite` - a boolean indicating whether to overwrite previously set cookies of the same name (`true` by default). If this is true, all cookies set during the same request with the same name (regardless of path or domain) are filtered out of the Set-Cookie header when setting this cookie.

  Read more here: https://github.com/jed/cookies

### Destroying a session

  Sessions will automatically be destroyed after the expire time has been reached.

## License

The MIT License (MIT)

Copyright (c) 2013 Daniel Beal killerbyte@xram.co

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
