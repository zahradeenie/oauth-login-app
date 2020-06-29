# OAuth Login

I've created a basic user login before but what I wanted to get into was how to set up OAuth with Google, GitHub and Facebook to allow users to login via these providers. The goal is to build this from scrach - the server, the frontend and authenticating without the PassportJS package.

I'm also going to add in a normal email/password login to learn how to hash passwords and store user data securely in a database.

## Understanding OAuth

Before I can start working, I need to find out what is OAuth and how it works? The abstract definition of the OAuth framework is that 'enables a third-party application to obtain limited access to an HTTP service'. This protocol flow is defined with 4 roles:

1. resource owner
  - this is an entity that can grant access to its protected resource (Google / Facebook)
2. resoure server
  - this is the server that hosts the protected resource (an API). It accepts and responds to requests via access tokens.
3. client
  - the application making the request for a protected resource with authorization from the resource owner. this is not necessarily the browser but just refers to the entity making the request.
4. authorization server
  - the server that issues access tokens once it has authenticated the resource owner and received authorization.

## Protocol flow diagram

     +--------+                               +---------------+
     |        |--(A)- Authorization Request ->|   Resource    |
     |        |                               |     Owner     |
     |        |<-(B)-- Authorization Grant ---|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(C)-- Authorization Grant -->| Authorization |
     | Client |                               |     Server    |
     |        |<-(D)----- Access Token -------|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(E)----- Access Token ------>|    Resource   |
     |        |                               |     Server    |
     |        |<-(F)--- Protected Resource ---|               |
     +--------+                               +---------------+


### Technology used
- Vue
- Express
- Postgres - running via Docker
- Sequelize
- OAuth providers: Google, Facebook, GitHub
