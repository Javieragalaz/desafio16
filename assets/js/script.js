
const form = document.querySelector("form")
const input = document.querySelector("#input")
const select = document.querySelector(".select")
const result = document.querySelector(".result")
const button = document.querySelector("#button")
const badgeChart = document.querySelector(".chart")
let myChart = document.getElementById("myChart")

async function getCoinValues() {

    try{
    const response = await fetch("https://mindicador.cl/api/");
    const arrayCoin = await res.json();
    return arrayCoin;
    }
catch (e) {
    alert("UPS algo anda mal")
}
  }
    
      

  async function conversor(multiplicador) {
    const data = await getCurrency();
    let quantity = Number(input.value);
    let multiplication = (quantity * data[multiplicador].valor).toFixed(2);
    result.innerHTML = ` <h3>Resultado: $ ${multiplication} </h3>`;
  }
  
  async function getDailyCoin(currency) {
    try {
      const response = await fetch("https://mindicador.cl/api/" + currency);
      const arrayCoin = await response.json();
      const lastDays = arrayCoin.serie.slice(0, 20).reverse();
      const labels = lastDays.map((day) => {
        return day.fecha;
      });
      const divisa = lastDays.map((day) => {
        return day.valor;
      });
      const datasets = [
        {
          label: currency,
          borderColor: "rgb(255, 0, 149)",
          divisa,
        },
      ];
  
      return { labels, datasets };
    } catch (e) {
      alert("hay un error por ahi")
    }
  }

  async function renderChart () {

    const res = await getDailyCoin(currency);
    const config = {
        type:"line",
        divisa,

    };
    badgeChart.style.backgroundColor = "rgb(252, 226, 242)";

    if (myChart) {
        myChart.destroy();

    }

    const myChart = new Chart(badgeChart, config)

}

button.addEventListener("click", function () {
    if (input.value ==""){
        alert ("Ingresa una cantidad válida.")
    }
    
    if (input.value <0) {
        alert ("debes ingresar un valor positivo.")
    }

    let final = conversor (
        select.options[select.selectedIndex].value
    );

    renderChart (select.options[select.selectedIndex].value);
})

