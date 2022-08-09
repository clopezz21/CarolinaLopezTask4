const API_URL = "https://amazing-events.herokuapp.com/api/events";
const $ = (element) => document.getElementById(element);

const tableMain = $("mainTable");
const tableUpcoming = $("body-upcoming");
const tablePast = $("body-past");

const readApi = async (url) => {
  await fetch(url)
    .then((res) => res.json())
    .then((json) => (data = json));
  upcomingEvents = data.events.filter(
    (event) => event.date.toString() > data.currentDate
  );
  pastEvents = data.events.filter(
    (event) => event.date.toString() < data.currentDate
  );

  let stats = statsCalc(data.events);
  let maxAtt = maxAssistance(stats);
  let minAtt = minAssistance(stats);
  let maxCap = maxCapacity(stats);

  innerDataAttendance(maxAtt, minAtt, maxCap, tableMain);

  let categories = [...new Set(data.events.map((item) => item.category))];
  let upcomingStatistics = statsForUpcomingAndPast(upcomingEvents, categories);
  let pastStatistics = statsForUpcomingAndPast(pastEvents, categories);

  showTableUpcomingAndPast(upcomingStatistics, tableUpcoming);
  showTableUpcomingAndPast(pastStatistics, tablePast);
};

document.addEventListener("DOMContentLoaded", function () {
  readApi(API_URL);
});

const innerDataAttendance = (array1, array2, array3, tbodyContainer) => {
  let tr = document.createElement("tr");
  tr.innerHTML += `<td>${array1[0].name} - ${array1[0].percent}% of assistance</td>
                    <td>${array2[0].name} - ${array2[0].percent}% of assistance</td>
                    <td>${array3[0].name} - Capacity of the venue:${array3[0].capacity} people</td>`;
  tbodyContainer.appendChild(tr);
};

const showTableUpcomingAndPast = (array, table) => {
  array.forEach((item) => {
    let tr = document.createElement("tr");
    tr.innerHTML += `<td>${item.category}</td>
                        <td>$${item.revenue}</td>
                        <td>${item.attendance > 0 ? item.attendance : 0}%</td>`;
    table.appendChild(tr);
  });
};

const statsCalc = (array) => {
  return array.map((element) => {
    let percent = Math.round(
      (Number(element.assistance) * 100) / Number(element.capacity)
    );

    return {
      name: element.name,
      percent: percent,
      assistance: element.assistance,
      capacity: element.capacity,
    };
  });
};

const statsForUpcomingAndPast = (array, categories) => {
  let categoriesStats = [];
  for (let category of categories) {
    let cant = 0;
    let sum = 0;
    let attendance = 0;
    for (let element of array) {
      if (element.category === category) {
        sum +=
          element.price *
          Number(element.assistance ? element.assistance : element.estimate);
        attendance +=
          (Number(element.assistance ? element.assistance : element.estimate) *
            100) /
          Number(element.capacity);
        cant += 1;
      }
    }
    let objectCat = {
      category: category,
      revenue: sum,
      attendance: Math.round(attendance / cant).toFixed(2),
    };
    categoriesStats.push(objectCat);
  }
  return categoriesStats;
};

let maxAssistance = (array) => {
  return array
    .filter((element) => element.assistance)
    .sort((a, b) => b.percent - a.percent);
};

let minAssistance = (array) => {
  return array
    .filter((element) => element.assistance)
    .sort((a, b) => a.percent - b.percent);
};

let maxCapacity = (array) => {
  return array.sort((a, b) => b.capacity - a.capacity);
};
