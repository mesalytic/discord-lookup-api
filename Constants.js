let USER_FLAGS = [{
    flag: "DISCORD_EMPLOYEE",
    bitwise: 1 << 0
},
{
    flag: "PARTNERED_SERVER_OWNER",
    bitwise: 1 << 1
},
{
    flag: "HYPESQUAD_EVENTS",
    bitwise: 1 << 2
},
{
    flag: "BUGHUNTER_LEVEL_1",
    bitwise: 1 << 3
},
{
    flag: "HOUSE_BRAVERY",
    bitwise: 1 << 6
},
{
    flag: "HOUSE_BRILLIANCE",
    bitwise: 1 << 7
},
{
    flag: "HOUSE_BALANCE",
    bitwise: 1 << 8
},
{
    flag: "EARLY_SUPPORTER",
    bitwise: 1 << 9
},
{
    flag: "TEAM_USER",
    bitwise: 1 << 10
},
{
    flag: "BUGHUNTER_LEVEL_2",
    bitwise: 1 << 14
},
{
    flag: "VERIFIED_BOT",
    bitwise: 1 << 16
},
{
    flag: "EARLY_VERIFIED_BOT_DEVELOPER",
    bitwise: 1 << 17
},
{
    flag: "DISCORD_CERTIFIED_MODERATOR",
    bitwise: 1 << 18
},
{
    flag: "BOT_HTTP_INTERACTIONS",
    bitwise: 1 << 19
},
{
    flag: "SPAMMER",
    bitwise: 1 << 20
},
{
    flag: "ACTIVE_DEVELOPER",
    bitwise: 1 << 22
},
{
    flag: "QUARANTINED",
    bitwise: 17592186044416
}
];

let APPLICATION_FLAGS = [{
    flag: "GATEWAY_PRESENCE",
    bitwise: 1 << 12
},
{
    flag: "GATEWAY_PRESENCE_LIMITED",
    bitwise: 1 << 13
},
{
    flag: "GATEWAY_GUILD_MEMBERS",
    bitwise: 1 << 14
},
{
    flag: "GATEWAY_GUILD_MEMBERS_LIMITED",
    bitwise: 1 << 15
},
{
    flag: "VERIFICATION_PENDING_GUILD_LIMIT",
    bitwise: 1 << 16
},
{
    flag: "EMBEDDED",
    bitwise: 1 << 17
},
{
    flag: "GATEWAY_MESSAGE_CONTENT",
    bitwise: 1 << 18
},
{
    flag: "GATEWAY_MESSAGE_CONTENT_LIMITED",
    bitwise: 1 << 19
},
{
    flag: "APPLICATION_COMMAND_BADGE",
    bitwise: 1 << 23
},
];

module.exports = {
    USER_FLAGS,
    APPLICATION_FLAGS
}