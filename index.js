/**
 * Module dependencies.
 */

var crypto = require('crypto');
var debug = require('debug')('cookie-session');
var Cookies = require('cookies');

var sessions = {};



/**
 * Decode the base64 cookie value to an object.
 *
 * @param {String} string
 * @return {Object}
 * @api private
 */

function decode(string) {
  var body = new Buffer(string, 'base64').toString('utf8');
  return JSON.parse(body);
}

/**
 * Encode an object into a base64-encoded JSON string.
 *
 * @param {Object} body
 * @return {String}
 * @api private
 */

function encode(body) {
  body = JSON.stringify(body);
  return new Buffer(body).toString('base64');
}

/**
 * Generate a cryptographically strong base64-encoded identification for session ID
 * @return {String}
 * @api private
 */

function generateId() {
    var buf = null;
   try {
       buf = crypto.randomBytes(256);
   } catch(ex) {
       console.err('Could not get random bytes: ' + JSON.stringify(ex));
       // no entropy (most likely) :(
       return '';
   }
   return buf.toString('base64');
}

/**
 * Initialize session middleware with options.
 *
 * See README.md for documentation of options.
 *
 * @param {Object} [opts]
 * @return {Function} middleware
 * @api public
 */

module.exports = function(opts){
    opts = opts || {};

    // name - previously "opts.key"
    var name = opts.name || opts.key || 'express:sessid';

    // defaults
    if (null === opts.overwrite) opts.overwrite = true;
    if (null === opts.httpOnly) opts.httpOnly = true;
    if (null === opts.expires) opts.expires = 24 * 60 * 1000;

    debug('session options %j', opts);

    return function cookieSession(req, res, next){
        var cookies = req.sessionCookies = new Cookies(req, res);
        var sess, json;

        // to pass to Session()
        req.sessionOptions = opts;
        req.sessionKey = name;

        var id = null;

        if(!(id = cookies.get(name))) {
            id = generateId();
            cookies.set(name, id);
        }
        if(!sessions[id]) sessions[id] = {};

        req.session = sessions[id];

        next();
    };
};
