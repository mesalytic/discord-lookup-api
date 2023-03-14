# discord-lookup-api

Discord Lookup API is an API that lets you, with a given ID, get basic informations about a user

The API returns :

- User ID
- User Tag (username#0000)
- User Badges
- Avatar (ID, Link, animated boolean)
- Banner (ID, Link, animated boolean, color)

The API has built-in CORS support, so you won't have to worry

Data is cached for 3 hours (or until the Redis Server restarts)

## Planned features

- Guild Lookup
- Application Lookup
- Experiment Lookup
- Invite Resolver

## Usage

You can freely access the API [here](https://discordlookup.mesavirep.xyz)

Right now, you must specify an ID to the link (a proper website is currently in development)

### Example

`https://discordlookup.mesavirep.xyz/v1/user/604779545018761237`

```json
{
    "id": "604779545018761237",
    "tag": "mesa#0101",
    "badges": [
        "HOUSE_BRAVERY",
        "EARLY_VERIFIED_BOT_DEVELOPER",
        "ACTIVE_DEVELOPER"
    ],
    "avatar": {
        "id": "02a161dcd6d590fbce550d6872468cc7",
        "link": "https://cdn.discordapp.com/avatars/604779545018761237/02a161dcd6d590fbce550d6872468cc7",
        "is_animated": false
    },
    "banner": {
        "id": "a_b987e17d75cc964905b04a575636c60e",
        "link": "https://cdn.discordapp.com/banners/604779545018761237/a_b987e17d75cc964905b04a575636c60e",
        "is_animated": true,
        "color": "#385d6d"
    }
}
```

`https://discordlookup.mesavirep.xyz/v1/application/276060004262477825`
> **Warning**
> This endpoint is currently disabled.

```json
{
   "id":"276060004262477825",
   "name":"Koya",
   "icon":"https://cdn.discordapp.com/avatars/276060004262477825/e02f48574f016a82632b7a39f843eb1a",
   "description":"A multipurpose Discord bot including greetings cards, a One Piece RPG, moderation, reddits, rss and more!\n\n> **https://koya.gg**\n> **https://discord.gg/koya**",
   "summary":"",
   "type":1,
   "hook":true,
   "guild_id":"265574509749207043",
   "bot_public":true,
   "bot_require_code_grant":false,
   "terms_of_service_url":"https://koya.gg/tos",
   "privacy_policy_url":"https://koya.gg/privacy",
   "install_params":{
      "scopes":[
         "bot",
         "applications.commands"
      ],
      "permissions":"1644971945207"
   },
   "verify_key":"ac921655280d52d7da2a6e4d659219bb6129a11ec97962af9c9480dd242e0e2a",
   "publishers":[
      {
         "id":"692518071386112150",
         "name":"Koyamie"
      }
   ],
   "developers":[
      {
         "id":"692518071386112150",
         "name":"Koyamie"
      }
   ],
   "flags":{
      "bits":8699904,
      "detailed":[
         "GATEWAY_GUILD_MEMBERS",
         "GATEWAY_GUILD_MEMBERS_LIMITED",
         "GATEWAY_MESSAGE_CONTENT",
         "APPLICATION_COMMAND_BADGE"
      ]
   },
   "tags":[
      "Entertainment",
      "Games",
      "Moderation and Tools",
      "Productivity",
      "Social"
   ]
}
```

## Installation

> **Note**
> You must have a Redis server installed, and ready to be used.

1) Clone the repo using Git
2) Install dependencies (`npm i`)
3) Open ports (either 3000 or any other port)
4) Launch the Redis Server
5) Launch the server (`node server.js`)
