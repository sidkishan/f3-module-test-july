$.getJSON("https://api.ipify.org?format=json", function (data) {
  // Setting text of span with id ip-address
  $("#ip-address").html(data.ip);
  getGeographicData();
});
let latitude = document.getElementById("latitude");
let city = document.getElementById("city");
let organisation = document.getElementById("organisation");
let longitude = document.getElementById("longitude");
let region = document.getElementById("region");
let hostname = document.getElementById("hostname");
function appendLocationOntoUI(data) {
  latitude.innerText = data.loc.split(",")[0];
  longitude.innerText = data.loc.split(",")[1];
  city.innerText = data.city;
  organisation.innerText = data.org;
  region.innerText = data.region;
  hostname.innerText = data.ip;
}
var dataOfPO = null;
//appending postoffices according to search functionality
let searchInput = document.getElementById("search-postoffice");
searchInput.addEventListener("input", (event) => {
  let div = document.getElementById("postoffice-container");
  div.innerHTML = "";
  dataOfPO.forEach((element) => {
    //console.log(element);
    let x = element.Name.toLowerCase().trim();
    let y = searchInput.value.trim().toLowerCase();
    console.log(x);
    console.log(y);
    if (x.includes(y)) {
      let card = `<div class="card">
        <p>Name: ${element.Name}</p>
        <p>Branch Type: ${element.BranchType}</p>
        <p>Delivery Status: ${element.DeliveryStatus}</p>
        <p>District: ${element.District}</p>
        <p>Division: ${element.Division}</p>
    </div>`;
      div.innerHTML += card;
    }
  });
});
//when user stops typing on search bar i.e losing focus from search bar
searchInput.addEventListener("change", (event) => {
  searchInput.value = "";
  appendPostOfficesOntoUI(dataOfPO);
});
// Appending all post offices details onto the ui

function appendPostOfficesOntoUI(arr) {
  dataOfPO = arr;
  let div = document.getElementById("postoffice-container");
  div.innerHTML = "";
  arr.forEach((element) => {
    //console.log(element);
    let card = `<div class="card">
                    <p>Name: ${element.Name}</p>
                    <p>Branch Type: ${element.BranchType}</p>
                    <p>Delivery Status: ${element.DeliveryStatus}</p>
                    <p>District: ${element.District}</p>
                    <p>Division: ${element.Division}</p>
                </div>`;
    div.innerHTML += card;
  });
}
//########################################################
//Date time logic
async function appendTimeInfo(data) {
  let chicago_datetime_str = new Date().toLocaleString("en-US", {
    timeZone: data.timezone,
  });
  document.getElementById("time-zone").innerText = data.timezone;
  document.getElementById("date-time").innerText = chicago_datetime_str;
  let pincode = data.postal;
  document.getElementById("pincode").innerText = pincode;

  let resp = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
  let decryptedData = await resp.json();
  document.getElementById("msg").innerText = decryptedData[0].PostOffice.length;
  //console.log("pincodes=> ", decryptedData[0].PostOffice.length);
  let postOfficesArr = decryptedData[0].PostOffice;
  appendPostOfficesOntoUI(postOfficesArr);
}
// "3/22/2021, 5:05:51 PM"

//################################################
// function initMap() {
//   // Replace latitude and longitude with the actual coordinates
//   var latitude1 = 37.7749;
//   var longitude1 = -122.4194;

//   // Create a new map centered at the specified coordinates
//   var map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: latitude1, lng: longitude1 },
//     zoom: 12, // Set the initial zoom level
//   });

//   // Create a marker at the specified coordinates
//   var marker = new google.maps.Marker({
//     position: { lat: latitude1, lng: longitude1 },
//     map: map,
//   });
// }
//initMap();
//api key : AIzaSyBjHxqLm3dH-4JxfOSw9JVMB3RrwxYs0IY
/*
{
  city: "Bengaluru";
  country: "IN";
  ip: "43.224.157.58";
  loc: "12.9719,77.5937";
  org: "AS132556 Blue Lotus Support Services Pvt Ltd";
  postal: "560002";
  region: "Karnataka";
  timezone: "Asia/Kolkata";
}
*/
let apiKey = "9692db051c452b";
async function getGeographicData() {
  try {
    let ipAddress = document.getElementById("ip-address").innerText;
    let endpiont = `https://ipinfo.io/${ipAddress}/geo?token=${apiKey}`;
    let response = await fetch(endpiont);
    let data = await response.json();
    appendLocationOntoUI(data);
    appendTimeInfo(data);
  } catch (err) {
    console("some error", err);
  }
}
