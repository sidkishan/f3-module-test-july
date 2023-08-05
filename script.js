const btn = document.getElementById("info-page-btn");
const userIp = document.getElementById("ip-address");
$.getJSON("https://api.ipify.org?format=json", function (data) {
  // Setting text of span with id ip-address
  $("#ip-address").html(data.ip);
});

function goToDetailsPage() {
  window.location.href = "./details-page/index.html";
}
btn.addEventListener("click", goToDetailsPage);
