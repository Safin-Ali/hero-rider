
export function createRfcTime(daysToExpire) {
    const date = new Date();
    
    // add days to the current date to get the expiration date
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    // convert the date to an RFC 1123 string
    const rfcDate = date.toUTCString();
    return rfcDate;
  }
