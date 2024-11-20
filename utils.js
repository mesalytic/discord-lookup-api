const { VALID_SNOWFLAKE_REGEX } = require("./Constants");

function snowflakeToDate(id) {
    let temp = parseInt(id).toString(2);
    let length = 64 - temp.length;

    if (length > 0)
        for (let i = 0; i < length; i++)
            temp = "0" + temp;
    
    temp = temp.substring(0, 42)
    date = new Date(parseInt(temp, 2) + 1420070400000)

    return date;
}

async function checkValidSnowflake(id) {
    if (VALID_SNOWFLAKE_REGEX.test(id)) return id;
    else return 'Invalid Discord ID';
}

module.exports = {
    snowflakeToDate,
    checkValidSnowflake
};