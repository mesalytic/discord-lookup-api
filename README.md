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

`https://discordlookup.mesavirep.xyz/v1/application/437190817195753472`

```json
{
   "id":"437190817195753472",
   "name":"Helixus",
   "icon":"https://cdn.discordapp.com/avatars/437190817195753472/9d7e869d626efd6d0e61ac9e552e6fb6",
   "description":"Helixus aims to do what would normally need multiple bots, and does it all by itself !\nYou can play Music (from some sources), log what happens in your server, send some memes, and much more!\n\nInvite it now to see the full capacity of Helixus!\n**SUPPORT**: https://discord.gg/pBATVfHg",
   "summary":"",
   "type":null,
   "hook":true,
   "guild_id":"418433461817180180",
   "bot_public":true,
   "bot_require_code_grant":false,
   "terms_of_service_url":"https://gist.github.com/mesalytic/c132c786b47c86599021237f0303b952",
   "privacy_policy_url":"https://gist.github.com/mesalytic/598c963ddfa4562ec7c867574ed7cedf",
   "install_params":{
      "scopes":["bot","applications.commands"],
      "permissions":"1926057290966"
   },
   "verify_key":"82449bea917a3e2b4a407254cc548e5d35de9cb8a888d692d65f31471ddc5fa0",
   "flags":{
      "bits":10764288,
      "detailed":["GATEWAY_GUILD_MEMBERS","GATEWAY_MESSAGE_CONTENT","APPLICATION_COMMAND_BADGE"]
   },
   "tags":["image","logging","meme","mini-game","music"]
}
```

`https://discordlookup.mesavirep.xyz/v1/guild/81384788765712384`
> **Note**
> The guild linked to the request ID must have Server Widget and/or Server Discovery enabled.
> An error will be thrown otherwise.

```json
{
   "id":"81384788765712384",
   "name":"Discord API",
   "instant_invite":null,
   "presence_count":18759
}
```

## Installation

> **Note**
> You must have a Redis server installed, and ready to be used.
> **Warning**
> The experiment worker API is not open-source, you'll need to implement one on your own.

1) Clone the repo using Git
2) Install dependencies (`npm i`)
3) Open ports (either 3000 or any other port)
4) Launch the Redis Server
5) Launch the server (`node server.js`)
