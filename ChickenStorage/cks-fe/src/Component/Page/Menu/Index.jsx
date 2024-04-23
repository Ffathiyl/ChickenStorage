import burgerImage from "../../../assets/BurgerReact.jpg";
import pepsiImage from "../../../assets/Pepsi 450x300.jpg";
import rbImage from "../../../assets/RBDrink 450x300.jpg";
import pizzaImage from "../../../assets/Pizza 450x300.jpg";
import { useEffect, useState } from "react";
import { API_MENU } from "../../../util/Constants";
import UseFetch from "../../../util/UseFetch";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import Loading from "../../../part/Loading";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SweetAlert from "../../../util/SweetAlert";
import { separator } from "../../../util/Formatting";

export default function MenuIndex() {
  const navigate = useNavigate();

  const dummyData = [
    {
      mnu_id: "1",
      mnu_name: "Burger",
      mnu_description: "Food",
      mnu_price: 15000,
      mnu_picture: burgerImage,
      mnu_stock: 5,
    },
    {
      mnu_id: "2",
      mnu_name: "Red Bull",
      mnu_description: "Drink",
      mnu_price: 30000,
      mnu_picture: rbImage,
      mnu_stock: 3,
    },
    {
      mnu_id: "3",
      mnu_name: "Pepsi",
      mnu_description: "Drink",
      mnu_price: 8000,
      mnu_picture: pepsiImage,
      mnu_stock: 3,
    },
    {
      mnu_id: "4",
      mnu_name: "Pizza",
      mnu_description: "Food",
      mnu_price: 90000,
      mnu_picture: pizzaImage,
      mnu_stock: 3,
    },
  ];

  const listMenus = () => axios.get(API_MENU + "/getAllMenus");

  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listMenus();
        setMenus(response.data.data);
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

  const handleDelete = (menuId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This menu will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMenu(menuId);
      }
    });
  };

  const deleteMenu = async (menuId) => {
    const deletedMenu = {
      mnu_id: menuId,
    };
    try {
      // Kirim ke BE
      UseFetch(API_MENU + "/deleteMenu", deletedMenu)
        .then((data) => {
          console.log(data);
          if (data === "ERROR") {
            Swal.fire("Error!", "Failed to Delete Menu.", "error");
          } else {
            Swal.fire("Success", "Menu Deleted successfully", "success");
            navigate("/Menu");
            setTimeout(() => setIsLoading(false), 1400);
            window.location.reload();
          }
        })
        .then(() => setIsLoading(false));
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to delete item.", "error");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* <div className="bg-dark py-5">
            <div className="container px-4 px-lg-5 my-5">
              <div className="text-center text-white">
                <h1 className="display-4 fw-bolder">
                  Welcome to Los Pollos Hermanos
                </h1>
                <p className="lead fw-normal text-white-50 mb-0">
                  Gustavo Fring
                </p>
              </div>
            </div>
          </div> */}

          {/* Menampilkan Card Menu */}
          <section className="">
            <div className="container px-4 px-lg-5 mt-5">
              <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {menus
                  .filter((menu) => menu.status === 1)
                  .map((menu) => (
                    <div className="col mb-5" key={menu.idMenu}>
                      <div className="card h-100 position-relative">
                        {/* Edit button */}
                        <Link
                          className="btn btn-edit position-absolute top-0 end-0 mt-2 me-2"
                          to={`/EditMenu/${menu.idMenu}`}
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                        {/* Delete button */}
                        <button
                          className="btn btn-delete position-absolute top-0 start-0 mt-2 ms-2"
                          onClick={() => handleDelete(menu.idMenu)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                        {/* Product image */}
                        <img
                          className="card-img-top"
                          src={burgerImage}
                          alt="..."
                        />
                        {/* Product details */}
                        <div className="card-body px-4">
                          <div className="text-center">
                            {/* Product name */}
                            <h5 className="fw-bolder">{menu.name}</h5>
                          </div>
                          <div className="text-center">
                            {/* Product Description */}
                            <h6 className="text-secondary">
                              {menu.description}
                            </h6>
                          </div>
                          <div className="text-center">
                            {/* Product Stock */}
                            <h6 className="text-secondary">
                              Stock: {menu.stock}
                            </h6>
                          </div>
                        </div>
                        {/* Product actions */}
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-center">
                            {/* Buy button */}
                            {/* <a className="btn btn-outline-dark mt-auto" href="#">
                            Buy
                          </a> */}
                            {/* Product price */}
                            <span className="mx-2">
                              Rp {separator(menu.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
