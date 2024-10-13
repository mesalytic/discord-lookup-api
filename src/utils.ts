function snowflakeToDate(id: string): Date {
    let temp = parseInt(id).toString(2);
    let length = 64 - temp.length;

    if (length > 0) {
        for (let i = 0; i < length; i++) {
            temp = "0" + temp;
        }
    }

    temp = temp.substring(0, 42);
    const date = new Date(parseInt(temp, 2) + 1420070400000);

    return date;
}

export default snowflakeToDate;