//token for ipinfo to get client ip address
const token = `d63c036c3c9b99`;
//URL for ipinfo api
export const ip_url = `https://ipinfo.io/json?token=${token}`;

//API for aditional info
const key = "bdc_9fe74b162d864b439df64275cd038de3";
export const getURL = (ip_address = "49.36.185.39") => {
    return `https://api.bigdatacloud.net/data/ip-geolocation-with-confidence?ip=${ip_address}&localityLanguage=en&key=${key}`;
}