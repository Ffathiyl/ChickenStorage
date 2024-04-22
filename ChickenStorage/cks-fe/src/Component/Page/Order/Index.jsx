import React from "react";
import burgerImage from "../../../assets/BurgerReact.jpg";

import { useEffect, useState, useRef } from "react";
import { API_MENU, API_ORDER } from "../../../util/Constants";
import { object, string, number, array } from "yup";
import UseFetch from "../../../util/UseFetch";
import axios from "axios";
import Input from "../../../part/Input";
import Button from "../../../part/Button";
import { validateInput, validateAllInputs } from "../../../util/ValidateForm";
import "font-awesome/css/font-awesome.min.css";
import Loading from "../../../part/Loading";
import { useNavigate } from "react-router-dom";
import SweetAlert from "../../../util/SweetAlert";
import { separator } from "../../../util/Formatting";

export default function MenuIndex() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(true);

  const listMenus = () => axios.get(API_MENU + "/getMenuActive");

  const [menus, setMenus] = useState([]);

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

  const currentDate = new Date().toISOString().split("T")[0];

  const orderFormDataRef = useRef({
    ord_date: currentDate,
    ord_customer_name: "",
    listMenu: [],
  });

  const orderSchema = object({
    ord_date: string().required("harus diisi"),
    ord_customer_name: string().required("harus diisi"),
    listMenu: array()
      .of(
        object({
          idMenu: number().integer("ID Menu harus berupa bilangan bulat"),
          quantity: number().integer("Quantity harus berupa bilangan bulat"),
        })
      )
      .required("harus diisi minimal satu menu"),
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const validationError = await validateInput(name, value, orderSchema);

    orderFormDataRef.current[name] = value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [validationError.name]: validationError.error,
    }));
  };

  const [checkedProducts, setCheckedProducts] = useState({});

  const handleCheckboxChange = (menuId) => {
    const updatedCheckedProducts = { ...checkedProducts };

    updatedCheckedProducts[menuId] = !updatedCheckedProducts[menuId];

    setCheckedProducts(updatedCheckedProducts);

    const quantityInput = document.getElementById(`quantity-${menuId}`);
    const quantity = parseInt(quantityInput.value);

    if (updatedCheckedProducts[menuId]) {
      const updatedListMenu = [
        ...orderFormDataRef.current.listMenu,
        { idMenu: menuId, quantity },
      ];
      orderFormDataRef.current.listMenu = updatedListMenu;
    } else {
      const updatedListMenu = orderFormDataRef.current.listMenu.filter(
        (item) => item.idMenu !== menuId
      );
      orderFormDataRef.current.listMenu = updatedListMenu;
    }

    console.log(JSON.stringify(orderFormDataRef.current));
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    const validationErrors = await validateAllInputs(
      orderFormDataRef.current,
      orderSchema,
      setErrors
    );

    if (Object.values(validationErrors).every((error) => !error)) {
      setIsLoading(true);
      setIsError((prevError) => ({ ...prevError, error: false }));
      setErrors({});

      try {
        const response = await axios.post(
          API_ORDER + "/saveOrder",
          orderFormDataRef.current
        );
        console.log("Response:", response.data);

        if (response.data === "ERROR") {
          setIsError((prevError) => ({
            ...prevError,
            error: true,
            message: "Error Occurred: Failed to create Order.",
          }));
        } else {
          SweetAlert("Success", "Order created successfully", "success");
          navigate("/Menu");
        }
      } catch (error) {
        console.error("Error occurred while sending order:", error);
        setIsError((prevError) => ({
          ...prevError,
          error: true,
          message: "Error Occurred: Failed to create Order.",
        }));
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Validation error occurred:", validationErrors);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isError.error && (
            <div className="flex-fill">
              <div className="alert alert-danger">{isError.message}</div>
              {/* <Alert type="danger" message={isError.message} /> */}
            </div>
          )}
          <form onSubmit={handleOrder}>
            <div className="container px-4 px-lg-5 mt-5">
              <div className="d-flex justify-content-between">
                <div className="w-50">
                  <Input
                    type="text"
                    forInput="ord_customer_name"
                    label="Customer Name"
                    isRequired
                    value={orderFormDataRef.current.ord_customer_name}
                    onChange={handleInputChange}
                    errorMessage={errors.ord_customer_name}
                  />
                </div>
                <div className="float-end my-4 mx-4">
                  <Button classType="secondary me-2 px-4 py-2" label="CANCEL" />
                  <Button
                    classType="primary ms-2 px-4 py-2"
                    type="submit"
                    label="ORDER"
                  />
                </div>
              </div>
            </div>

            {/* Menampilkan Card Menu */}
            <section className="">
              <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center ">
                  {menus.map((menu) => (
                    <div className="col mb-5" key={menu.idMenu}>
                      <div
                        className={`card h-100 position-relative ${
                          checkedProducts[menu.idMenu]
                            ? "border-3 border-primary-subtle"
                            : ""
                        }`}
                      >
                        <label className="form-check-label position-absolute top-0 start-0 mt-2 ms-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={checkedProducts[menu.idMenu] || false}
                            onChange={() => handleCheckboxChange(menu.idMenu)}
                          />
                        </label>
                        <img
                          className="card-img-top"
                          src={burgerImage}
                          alt="..."
                        />
                        <div className="card-body px-4">
                          <div className="text-center">
                            <h5 className="fw-bolder">{menu.name}</h5>
                          </div>
                          <div className="text-center">
                            <h6 className="text-secondary">
                              {menu.description}
                            </h6>
                          </div>
                          <div className="text-center">
                            <span>Rp {separator(menu.price)}</span>
                          </div>
                        </div>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div className="text-center">
                            <Input
                              id={`quantity-${menu.idMenu}`}
                              type="number"
                              label=""
                              defaultValue="1"
                              min="1"
                              isRequired
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </form>
        </>
      )}
    </>
  );
}
