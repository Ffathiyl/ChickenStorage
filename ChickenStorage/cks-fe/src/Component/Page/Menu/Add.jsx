import React from "react";
import { useRef, useState } from "react";
import { object, string } from "yup";
import Button from "../../../part/Button";
import Dropdown from "../../../part/Dropdown";
import Input from "../../../part/Input";
import FileUpload from "../../../part/FileUpload";
import UseFetch from "../../../util/UseFetch";
// import Loading from "../../../part/Loading";
import Alert from "../../../part/Alert";
import { validateAllInputs, validateInput } from "../../../util/ValidateForm";
import { separator } from "../../../util/Formatting";
import { Navigate, useNavigate } from "react-router-dom";
import { API_MENU } from "../../../util/Constants";
import SweetAlert from "../../../util/SweetAlert";

export default function MenuAdd({ onChangePage }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const formDataRef = useRef({
    mnu_name: "",
    mnu_description: "",
    mnu_stock: "",
    mnu_price: "",
    picture: "",
    creaby: 1,
    creadate: "2024-11-12",
  });

  const fileGambarRef = useRef(null);

  const userSchema = object({
    mnu_name: string()
      .max(100, "maksimum 100 karakter")
      .required("harus diisi"),
    mnu_stock: string().max(4, "Maximum Stock 999").required("Must Filled"),
    mnu_price: string().required("Must Filled"),
    mnu_description: string().required("harus dipilih"),
    picture: string(),
    creaby: string(),
    creadate: string(),
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const validationError = await validateInput(name, value, userSchema);

    if (name === "mnu_stock" || name === "mnu_price")
      formDataRef.current[name] = separator(value);
    else formDataRef.current[name] = value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [validationError.name]: validationError.error,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const validationErrors = await validateAllInputs(
      formDataRef.current,
      userSchema,
      setErrors
    );
    console.log("1: " + formDataRef.current.name);

    if (Object.values(validationErrors).every((error) => !error)) {
      setIsLoading(true);
      setIsError((prevError) => {
        return { ...prevError, error: false };
      });
      setErrors({});

      const dataToSave = {
        ...formDataRef.current,
        mnu_price: parseFloat(formDataRef.current.mnu_price.replace(/\./g, "")),
      };

      UseFetch(API_MENU + "/saveMenu", dataToSave)
        .then((data) => {
          console.log(data);
          if (data === "ERROR") {
            setIsError((prevError) => {
              return {
                ...prevError,
                error: true,
                message: "Error Occured: Failed to add Menu.",
              };
            });
          } else {
            SweetAlert("Success", "Menu Added successfully", "success");
            navigate("/Menu");
          }
        })
        .then(() => setIsLoading(false));
    } else {
      console.error("Validation error occurred:", validationErrors);
    }
  };

  return (
    <>
      {isError.error && (
        <div className="flex-fill">
          <div className="alert alert-danger">{isError.message}</div>
          {/* <Alert type="danger" message={isError.message} /> */}
        </div>
      )}
      <form onSubmit={handleAdd}>
        <div className="card mx-4 my-2">
          <div className="card-header bg-dark fw-medium text-white">
            Add New Menu
          </div>
          <div className="card-body p-4">
            <div className="row">
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="mnu_name"
                  label="Menu Name"
                  isRequired
                  value={formDataRef.current.mnu_name}
                  onChange={handleInputChange}
                  errorMessage={errors.mnu_name}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="mnu_description"
                  label="Description"
                  isRequired
                  value={formDataRef.current.mnu_description}
                  onChange={handleInputChange}
                  errorMessage={errors.mnu_description}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="mnu_stock"
                  label="Stock"
                  isRequired
                  value={formDataRef.current.mnu_stock}
                  onChange={handleInputChange}
                  errorMessage={errors.mnu_stock}
                />
              </div>
              <div className="col-lg-4">
                <Input
                  type="text"
                  forInput="mnu_price"
                  label="Price"
                  isRequired
                  value={formDataRef.current.mnu_price}
                  onChange={handleInputChange}
                  errorMessage={errors.mnu_price}
                />
              </div>
              {/* <div className="col-lg-4">
                                <FileUpload
                                    forInput="gambarProduk"
                                    label="Gambar Produk (.pdf, .jpg, .png)"
                                    formatFile=".pdf,.jpg,.png"
                                    ref={fileGambarRef}
                                    onChange={() =>
                                        handleFileChange(fileGambarRef, "pdf,jpg,png")
                                    }
                                    errorMessage={errors.gambarProduk}
                                />
                            </div> */}
              {/* <div className="col-lg-12">
                                <Input
                                    type="text"
                                    forInput="spesifikasi"
                                    label="Spesifikasi"
                                    value={formDataRef.current.spesifikasi}
                                    onChange={handleInputChange}
                                    errorMessage={errors.spesifikasi}
                                />
                            </div> */}
            </div>
          </div>
        </div>
        <div className="float-end my-4 mx-4">
          <Button
            classType="secondary me-2 px-4 py-2"
            label="BATAL"
            onClick={() => navigate("/Menu")}
          />
          <Button
            classType="primary ms-2 px-4 py-2"
            type="submit"
            label="SIMPAN"
          />
        </div>
      </form>
    </>
  );
}
