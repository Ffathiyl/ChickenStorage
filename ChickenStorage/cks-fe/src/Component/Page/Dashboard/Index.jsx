import { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import { API_ORDER } from '../../../util/Constants';
import axios from "axios";

export default function DashboardIndex() {
  const chartData = () => axios.get(API_ORDER + "/getChartData");
  const [chartDatas, setChartDatas] = useState({ labels: [], series: [] });
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await chartData();
        const data = response.data.data;
        const chartLabels = data.map((item) => item.ord_date);
        const chartDataValues = data.map((item) => item.pemasukkan);

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: chartLabels,
            datasets: [{
              label: 'Pemasukkan',
              data: chartDataValues,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
        });
        setChartDatas(myChart);
      } catch (error) {
        console.error(error);
      } finally {
        // timeout loading
        setTimeout(() => setIsLoading(false), 1400);
      }
    };

    fetchData();

    // Clear timeout
    return () => clearTimeout();
  }, []);

  return (
    <div className="container-fluid position-relative py-4">
      <div className="row mt-4 justify-content-center">
        <div className="col-lg-10 mb-lg-0 mb-4">
          <div className="card ">
            <div className="card-header pb-0 pt-3 bg-transparent">
              <h6 className="text-capitalize">Penjualan</h6>
            </div>
            <div className="card-body">
              <canvas id="myChart" style={{ width: '400px', height: '200px' }}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
