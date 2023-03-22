export function getCookieValue(cookieString, cookieName) {
    // split the cookie string into individual cookie pairs
    const cookiePairs = cookieString.split("; ");
    // loop through the cookie pairs to find the desired cookie
    let desiredCookie = null;
    cookiePairs.forEach(cookiePair => {
      const [name, value] = cookiePair.split("=");
      if (name === cookieName) {
        desiredCookie = value;
      }
    });
    // return the value of the desired cookie, or null if the cookie was not found
    return desiredCookie;
  };
