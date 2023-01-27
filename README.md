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

## Usage

You can freely access the API [here](https://discordlookup.mesavirep.xyz)

Right now, you must specify an ID to the link (a proper website is currently [in development](https://github.com/chocololat/discord-lookup-api/tree/website))

### Example

`https://discordlookup.mesavirep.xyz/v1/604779545018761237`

returns

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

## Installation

> **Note**
> You must have a Redis server installed, and ready to be used.

1) Clone the repo using Git
2) Install dependencies (`npm i`)
3) Open ports (either 3000 or any other port)
4) Launch the Redis Server
5) Launch the server (`node server.js`)
