
    // ApexCharts options and config
    window.addEventListener("load", function() {
      const options = {
            colors: ["#EDEDED", "#6D6D6D"],
            series: [
              {
                name: "Male",
                color: "#EDEDED",
                data: [
                  { x: "Jan", y: 231 },
                  { x: "feb", y: 122 },
                  { x: "mar", y: 63 },
                  { x: "Apr", y: 421 },
                  { x: "May", y: 122 },
                  { x: "Jun", y: 323 },
                  { x: "July", y: 322 },
                  { x: "Aug", y: 322 },
                  { x: "Sep", y: 111 },
                  { x: "Oct", y: 533 },
                  { x: "Nov", y: 333 },
                  { x: "Dec", y: 322 },
                 
                ],
              },
              {
                name: "Female .",
                color: "#6D6D6D",
                data: [
                    { x: "Jan", y: 231 },
                    { x: "feb", y: 122 },
                    { x: "mar", y: 63 },
                    { x: "Apr", y: 421 },
                    { x: "May", y: 122 },
                    { x: "Jun", y: 323 },
                    { x: "July", y: 111 },
                    { x: "Aug", y: 322 },
                    { x: "Sep", y: 131 },
                    { x: "Oct", y: 250 },
                    { x: "Nov", y: 323 },
                    { x: "Dec", y: 125 },
                ],
              },
            ],
            chart: {
              type: "bar",
              height: "320px",
              fontFamily: "Inter, sans-serif",
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "70%",
                borderRadiusApplication: "end",
                borderRadius: 10,
              },
            },
            tooltip: {
              shared: true,
              intersect: false,
              style: {
                fontFamily: "Inter, sans-serif",
              },
            },
            states: {
              hover: {
                filter: {
                  type: "darken",
                  value: 1,
                },
              },
            },
            stroke: {
              show: true,
              width: 0,
              colors: ["transparent"],
            },
            grid: {
              show: false,
              strokeDashArray: 4,
              padding: {
                left: 2,
                right: 2,
                top: -14
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              floating: false,
              labels: {
                show: true,
                style: {
                  fontFamily: "Inter, sans-serif",
                  cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                }
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            fill: {
              opacity: 1,
            },
          }
  
          if(document.getElementById("column-chart") && typeof ApexCharts !== 'undefined') {
            const chart = new ApexCharts(document.getElementById("column-chart"), options);
            chart.render();
          }
    });
//male and female chart 

   // Function to fetch gender counts from the server
async function fetchGenderCounts() {
  try {
      const response = await fetch('/admin/gender-counts'); // Replace with your API endpoint
      const data = await response.json();
      const male = parseInt(data.maleCount, 10);
        const female = parseInt(data.femaleCount, 10);

        return { male, female };
  } catch (error) {
      console.error('Error fetching gender counts:', error);
      return { male: 0, female: 0 };
  }
}

window.addEventListener("load", async function () {
  // Function to get chart options
  const getChartOptions = (maleCount, femaleCount) => {
      return {
          series: [maleCount, femaleCount],
          colors: ["#5F27CD", "#D61F8D"],
          chart: {
              height: 320,
              width: "100%",
              type: "donut",
          },
          stroke: {
              colors: ["transparent"],
              lineCap: "",
          },
          plotOptions: {
              pie: {
                  donut: {
                      labels: {
                          show: true,
                          name: {
                              show: true,
                              fontFamily: "Inter, sans-serif",
                              offsetY: 20,
                          },
                          total: {
                              showAlways: true,
                              show: true,
                              label: "Total Users",
                              fontFamily: "Inter, sans-serif",
                              formatter: function (w) {
                                  const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                  return `${sum}`;
                              },
                          },
                          value: {
                              show: true,
                              fontFamily: "Inter, sans-serif",
                              offsetY: -20,
                              formatter: function (value) {
                                  return value + "";
                              },
                          },
                      },
                      size: "80%",
                  },
              },
          },
          grid: {
              padding: {
                  top: -2,
              },
          },
          labels: ["Male", "Female"],
          dataLabels: {
              enabled: false,
          },
          legend: {
              position: "bottom",
              fontFamily: "Inter, sans-serif",
          },
          yaxis: {
              labels: {
                  formatter: function (value) {
                      return value + "";
                  },
              },
          },
          xaxis: {
              labels: {
                  formatter: function (value) {
                      return value + "";
                  },
              },
              axisTicks: {
                  show: false,
              },
              axisBorder: {
                  show: false,
              },
          },
      };
  };

  if (document.getElementById("donut-chart") && typeof ApexCharts !== 'undefined') {
      // Fetch gender counts
      const { male, female } = await fetchGenderCounts();

      // Initialize chart with fetched counts
      const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions(male, female));
      chart.render();

      // Get all the checkboxes by their class name
      const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]');

      // Function to handle the checkbox change event
      function handleCheckboxChange(event, chart) {
          const checkbox = event.target;
          if (checkbox.checked) {
              switch (checkbox.value) {
                  // Update chart series based on the checkbox value
                  case 'desktop':
                      chart.updateSeries([15.1, 22.5, 4.4, 8.4]);
                      break;
                  case 'tablet':
                      chart.updateSeries([25.1, 26.5, 1.4, 3.4]);
                      break;
                  case 'mobile':
                      chart.updateSeries([45.1, 27.5, 8.4, 2.4]);
                      break;
                  default:
                      chart.updateSeries([55.1, 28.5, 1.4, 5.4]);
              }
          } else {
              // Update chart series with fetched male and female counts
              chart.updateSeries([male, female]);
          }
      }

      // Attach the event listener to each checkbox
      checkboxes.forEach((checkbox) => {
          checkbox.addEventListener('change', (event) => handleCheckboxChange(event, chart));
      });
  }
});
