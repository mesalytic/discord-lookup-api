# discord-lookup-api

Discord Lookup API is an API that lets you, with a given ID, get basic informations about a user

The API returns :

- User ID
- User Username
- User Badges
- Avatar (ID, Link, animated boolean)
- Banner (ID, Link, animated boolean, color)

The API has built-in CORS support, so you won't have to worry

Data is cached for 3 hours (or until the Redis Server restarts)

## Planned features

- Experiment Lookup
- Invite Resolver

## Usage

You can freely access the API [here](https://discordlookup.mesalytic.moe)

Or you can deploy your own instance of the API through Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmesalytic%2Fdiscord-lookup-api&env=TOKEN&envDescription=Discord%20bot%20token&envLink=https%3A%2F%2Fdiscord.com%2Fdevelopers%2Fdocs%2Fquick-start%2Fgetting-started&project-name=discord-lookup-api&repository-name=discord-lookup-api)
> **Note**
> This version does not have caching due to Vercel limitations. You must also have a Discord Bot Token to use the API. You can get one [here](https://discord.com/developers/docs/quick-start/getting-started)
>

Right now, you must specify an ID to the link (a proper website is currently in development)

### Example

`https://discordlookup.mesalytic.moe/v1/user/547744111419981825`

```json
{
  "id": "547744111419981825",
  "created_at": "2019-02-20T11:39:32.756Z",
  "username": "oxyde.code",
  "avatar": {
    "id": "03c99885d79674a95c176d4f1f613494",
    "link": "https://cdn.discordapp.com/avatars/547744111419981825/03c99885d79674a95c176d4f1f613494",
    "is_animated": false
  },
  "avatar_decoration": {
    "asset": "a_f37b13213a05d82f2125bc262f61180a",
    "sku_id": "1391785327613706301",
    "expires_at": 1758582000
  },
  "badges": [
    "HOUSE_BRILLIANCE",
    "ACTIVE_DEVELOPER"
  ],
  "accent_color": 3487288,
  "global_name": "Oxyde",
  "banner": {
    "id": null,
    "link": null,
    "is_animated": false,
    "color": "#353638"
  },
  "raw": {
    "id": "547744111419981825",
    "username": "oxyde.code",
    "avatar": "03c99885d79674a95c176d4f1f613494",
    "discriminator": "0",
    "public_flags": 4194432,
    "flags": 4194432,
    "banner": null,
    "accent_color": 3487288,
    "global_name": "Oxyde",
    "avatar_decoration_data": {
      "asset": "a_f37b13213a05d82f2125bc262f61180a",
      "sku_id": "1391785327613706301",
      "expires_at": 1758582000
    },
    "collectibles": null,
    "display_name_styles": null,
    "banner_color": "#353638",
    "clan": {
      "identity_guild_id": "611968575342903297",
      "identity_enabled": true,
      "tag": "GTAF",
      "badge": "08778bfc800e50707543540f0c167607"
    },
    "primary_guild": {
      "identity_guild_id": "611968575342903297",
      "identity_enabled": true,
      "tag": "GTAF",
      "badge": "08778bfc800e50707543540f0c167607"
    }
  }
```

`https://discordlookup.mesalytic.moe/v1/application/437190817195753472`

```json
{
  "id": "437190817195753472",
  "name": "Helixus",
  "icon": "https://cdn.discordapp.com/avatars/437190817195753472/9d7e869d626efd6d0e61ac9e552e6fb6",
  "description": "Helixus is currently not up to date, as development was ceased in January 2024.\nThank you all.",
  "summary": "",
  "type": null,
  "is_monetized": false,
  "is_verified": true,
  "is_discoverable": false,
  "hook": true,
  "guild_id": "418433461817180180",
  "storefront_available": false,
  "bot_public": true,
  "bot_require_code_grant": false,
  "terms_of_service_url": "https://gist.github.com/mesalytic/c132c786b47c86599021237f0303b952",
  "privacy_policy_url": "https://gist.github.com/mesalytic/598c963ddfa4562ec7c867574ed7cedf",
  "install_params": {
    "scopes": [
      "applications.commands",
      "bot"
    ],
    "permissions": "1926057290966"
  },
  "integration_types_config": {
    "0": {

    }
  },
  "verify_key": "82449bea917a3e2b4a407254cc548e5d35de9cb8a888d692d65f31471ddc5fa0",
  "flags": {
    "bits": 10764288,
    "detailed": [
      "GATEWAY_GUILD_MEMBERS",
      "GATEWAY_MESSAGE_CONTENT",
      "APPLICATION_COMMAND_BADGE"
    ]
  },
  "tags": [
    "image",
    "logging",
    "meme",
    "mini-game",
    "music"
  ]
}
```

`https://discordlookup.mesalytic.moe/v1/guild/81384788765712384`
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

1) Clone the repo using Git
2) Install dependencies (`npm i`)
3) Open ports (either 3000 or any other port)
4) Launch the Redis Server
5) Launch the server (`node server.js`)
