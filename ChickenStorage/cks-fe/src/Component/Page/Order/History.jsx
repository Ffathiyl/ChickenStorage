import { useEffect, useState } from "react";
import { API_ORDER } from "../../../util/Constants";
import UseFetch from "../../../util/UseFetch";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import Loading from "../../../part/Loading";
import Button from "../../../part/Button";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SweetAlert from "../../../util/SweetAlert";
import { separator } from "../../../util/Formatting";

export default function HistoryOrder() {
  const navigate = useNavigate();

  const listOrders = () => axios.get(API_ORDER + "/getAllOrders");

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listOrders();
        setOrders(response.data.data);
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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <section className="">
            <div className="container px-4 px-lg-5 mt-5">
              <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div className="flex-fill">
                  <table className="table table-hover table-striped table table-light border">
                    <thead>
                      <tr>
                        <th>Order Number</th>
                        <th>Tanggal</th>
                        <th>Customer Name</th>
                        <th>Order Menu</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td>{order.orderNumber}</td>
                          <td>{format(order.date, "dd MMMM yyyy")}</td>
                          <td>{order.customerName}</td>
                          <td>
                            <ul>
                              {order.listOrder.map((item, index) => (
                                <li key={index}>
                                  {item.menuName} x {item.quantity} ={" "}
                                  {separator(item.total)}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>{separator(order.grandTotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
