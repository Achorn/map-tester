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
    } else state.style.fill = "lightblue";
  }
}
