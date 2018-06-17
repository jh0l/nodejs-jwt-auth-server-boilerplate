# nodejs-jwt-auth-server-boilerplate

JWT based auth server boilerplate with signup and login functionality
In order for server to work:
add 'config.js' file to root with secret for use with authentication as follows:

```js
// Hold application secrets and config
module.exports = {
  secret: "random bunch of characters"
};
```

where `"random bunch of characters"` is the secret

TO DO:
implement expiration/renewal process for tokens
implement password change
implement username change?

pair JWT with device, create fingerprint for device
add device fingerprint to header
match device fingerprint with it's token
reject if device does not have token's assigned fingerprint
make user login again
am I reinventing Oauth2?
Should I just use Oauth2?

initial diagrams of auth server architecture available at
https://github.com/StephenGrider/AdvancedReduxCode/tree/master/diagrams
