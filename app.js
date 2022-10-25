import { ip_url, getURL } from "./apiInfo.js";
import createMap, { updateMap } from "./map.js";
import {print} from "./helper.js";


//HTML elements 
const ipAddress = document.getElementById("ip-address");
const location = document.getElementById("location");
const timeZone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const search = document.getElementById("IP-search");
const searchBtn = document.getElementById("search-btn");
const overlay = document.querySelector(".overlay");
const errorMsg = document.querySelector(".error");
const hideErrorBtn = document.querySelector("#errorOK");


//Search input clear on load
search.value = "";

//Function to handle Updating the displayed information
const updateDisplay = (ip, loc, time, i) => {
    ipAddress.innerHTML = ip;
    location.innerHTML = loc;
    timeZone.innerHTML = time;
    isp.innerHTML = i;
}

const getData = () => {
    const response = fetch(ip_url);
    response.then(res => {
        return res.json();
    }).then(data => {
        let city = data.city;
        fetch(getURL(data.ip)).then(res => res.json()).then(res => {
            let ip = res.ip;
            let country = res.country.isoName;
            let time = res.location.timeZone.effectiveTimeZoneFull;
            let isp = res.network.organisation;
            updateDisplay(ip, `${city}, ${country}`, time, isp);

            let lat = res.location.latitude;
            let lng = res.location.longitude;
            createMap(lat, lng);
        });
    });
}

//Toggle Error display message
const hideErrorMsg = () => {
    overlay.style.display = "none";
    errorMsg.style.display = "none";
}
const showErrorMsg = () => {
    overlay.style.display = "flex";
    errorMsg.style.display = "flex";
}
hideErrorBtn.addEventListener("click", hideErrorMsg);
//Handle invalid IP address input
const handleError = () => {
    print("here");
    showErrorMsg();
}


//Handle new IP address search
searchBtn.addEventListener("click", () => {
    let val = `49.36.187.25`;
    val = search.value;
    fetch(getURL(val)).then(res => {
        if (!res.ok) {
            handleError();
            return Promise.reject(res);
        }
        return res.json();
    }).then(res => {
        if (!res.isReachableGlobally) { 
            handleError();
            throw Error("Invalid IP");
        } 
        let ip = res.ip;
        let country = res.country.isoName;
        let time = res.location.timeZone.effectiveTimeZoneFull;
        let isp = res.network.organisation.split(' ');
        updateDisplay(ip, country, time, `${isp[0]} ${isp[1]} ${isp[2]}`);

        let lat = res.location.latitude;
        let lng = res.location.longitude;
        updateMap(lat, lng);
    }).catch(err=>print(""));
});

getData();