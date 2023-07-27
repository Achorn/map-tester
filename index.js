let usMap = new Map();
let arr = [];
onload = fetch("./trucks.csv")
  .then((res) => {
    return res.text();
  })
  .then((data) => {
    arr = data
      .replace(/(?:\[r]|[\r]+)+/g, "")
      .replace(/[^\w\s,-.]/gi, "")
      .split("\n");

    for (let i = 1; i < arr.length; i++) {
      let [id, _, year] = arr[i].split(",");
      usMap.set(id, parseInt(year));
    }
  });

function updateMap(newYear) {
  document.getElementById("year").innerHTML = newYear;

  for (let i = 1; i < arr.length; i++) {
    let [id, ,] = arr[i].split(",");

    state = document.getElementById(id);
    if (usMap.get(id) <= newYear) {
      state.style.fill = "brown";
    } else state.style.fill = "#04aa6d";
  }
}

// TOOLTIP  functions
function showTooltip(evt, name, id) {
  text = "<b>" + name + "</b>" + "<br>" + "Converted: " + usMap.get(id);
  let tooltip = document.getElementById("tooltip");
  tooltip.style.display = "block";
  tooltip.innerHTML = text;
  tooltip.style.left = evt.pageX + 10 + "px";
  tooltip.style.top = evt.pageY + 10 + "px";
}

function hideTooltip() {
  var tooltip = document.getElementById("tooltip");
  tooltip.style.display = "none";
}

var paths = document.getElementsByTagName("path");
Array.from(paths).forEach((path) => {
  "mousemove touchstart touchmove".split(" ").forEach((e) =>
    path.addEventListener(e, function (event) {
      path.style.filter = "brightness(1.3)";
      showTooltip(event, path.dataset.name, path.id);
    })
  );

  "mouseout touchend".split(" ").forEach((e) =>
    path.addEventListener(e, function () {
      path.style.filter = "brightness(1)";
      hideTooltip();
    })
  );
});
