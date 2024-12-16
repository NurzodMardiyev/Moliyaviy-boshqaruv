import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "./diogram.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Diogram() {
  const categoryEl = JSON.parse(localStorage.getItem("transactions")) || [];
  const dataMap = {};
  const usdMap = {};

  useEffect(() => {
    AOS.init({
      duration: 800, // animatsiya davomiyligi
      easing: "ease-in-out", // animatsiyaning tezligi
      once: true, // faqat bir marta ishga tushadi
    });
  }, []);

  categoryEl?.forEach((item) => {
    if (item.redioValue === "false") {
      const category = item.category;
      const usdValue = parseFloat((item?.amount / item?.usd).toFixed(2));

      if (dataMap[category]) {
        dataMap[category] += item.amount;
        usdMap[category] += usdValue;
      } else {
        dataMap[category] = item.amount;
        usdMap[category] = usdValue;
      }
    }
  });

  // Natijalarni massivga aylantiramiz
  const dataValuee = Object.keys(dataMap); // Kategoriyalarni olish
  const usdValue = Object.values(usdMap);

  const dataOAV = {
    labels: dataValuee,
    datasets: [
      {
        data: usdValue, // Har bir kesim qiymati
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ], // Ranglar
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ],
        hoverBorderColor: [
          "#FF6384", // Rangni bo‘lakka moslash
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9F40",
        ],
        hoverBorderWidth: 5, // Chegarani kattalashtirish
        hoverRadius: 5, // Kursorni kattalashtirish
      },
    ],
  };

  const options = (title) => ({
    relative: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Legend diagramma ostida
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets[0];
            return chart.data.labels.map((label, i) => {
              const value = datasets.data[i];
              return {
                text: `${label}: ${value} ($)`, // Har bir rang uchun matn
                fillStyle: datasets.backgroundColor[i],
              };
            });
          },
        },
      },
      title: {
        display: true,
        text: title.includes("\n") ? title.split("\n") : [title], // Diagramma sarlavhasi
        font: {
          size: 15,
          weight: "bold",
        },
        color: "#333", // Sarlavha rangi
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${value} ($)`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  });

  console.log(typeof dataValuee);
  return (
    <div>
      {dataValuee.length !== 0 ? (
        <div>
          <div className="d-flex justify-content-center mt-4 mb-3 ">
            <h2>Diogramma va Valyutalar kursi</h2>
          </div>
          <div className="container d-flex ">
            <div className="chart w-50" data-aos="fade-down-right">
              {dataValuee.length === 0 ? (
                ""
              ) : (
                <Doughnut
                  data={dataOAV}
                  options={options(
                    "Xarajat kategoriyalari uchun doira diagrammasi "
                  )}
                />
              )}
            </div>
            <div className="valyutaKursi w-50" data-aos="fade-down-left">
              <div>
                <h6 className="mt-2">
                  Tranzaksiyaga qo`shilgan valyutalarning kurslari
                </h6>
              </div>
              <ul>
                {categoryEl?.map((item, index) => (
                  <li
                    key={index}
                    className="d-flex align-items-center  mal justify-content-around mt-3"
                  >
                    <span className="fs-4 fw-semibold d-block">1 USD</span>{" "}
                    <span className="chiz"></span>
                    <span className="fs-5 fw-medium d-block">
                      {item.usd} {item.sumKey}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
