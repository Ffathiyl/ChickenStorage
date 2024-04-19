import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import UseFetch from "../../../util/UseFetch";
import Input from "../../../part/Input";
import Button from "../../../part/Button";
import { validateAllInputs, validateInput } from "../../../util/ValidateForm";
import { object, string } from "yup";
import { separator } from "../../../util/Formatting";
import { Navigate, useNavigate } from "react-router-dom";
import { API_MENU } from "../../../util/Constants";
import SweetAlert from "../../../util/SweetAlert";

export default function EditMenu() {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isError, setIsError] = useState({ error: false, message: "" });
    const { id } = useParams();

    const formDataRef = useRef({
        mnu_id: id,
        mnu_name: "",
        mnu_description: "",
        mnu_stock: "",
        mnu_price: "",
        picture: "",
        creaby: 1,
        creadate: "2024-11-12",
    });

    const [values, setMenus] = useState({
        mnu_id: id,
        mnu_name: '',
        mnu_description: '',
        mnu_price: '',
        mnu_stock: '',
        mnu_picture: ''
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        axios.get(API_MENU + '/getMenuById/' + id)
        .then(res=>{
            console.log(res);
            setMenus({
                ...values,
                mnu_name: res.data.data[0].name,
                mnu_description: res.data.data[0].description,
                mnu_stock: res.data.data[0].stock,
                mnu_price: res.data.data[0].price,
                mnu_picture: res.data.data[0].picture
              });
        })
        .catch(err => console.log(err))
    },[])

    const userSchema = object({
        mnu_id: string(),
        mnu_name: string()
            .max(100, "maksimum 100 karakter")
            .required("harus diisi"),
        mnu_stock: string()
            .max(4, "Maximum Stock 999")
            .required("Must Filled"),
        mnu_price: string()
            .required("Must Filled"),
        mnu_description: string().required("harus dipilih"),
        picture: string().nullable(),
        creaby: string(),
        creadate: string()
    });

    const handleAdd = async (e) => {
        console.log(values.mnu_picture);
        formDataRef.current.mnu_id = values.mnu_id;
        formDataRef.current.mnu_name = values.mnu_name;
        formDataRef.current.mnu_price = values.mnu_price;
        formDataRef.current.mnu_stock = values.mnu_stock;
        formDataRef.current.mnu_description = values.mnu_description;
        formDataRef.current.picture = values.mnu_picture;
        e.preventDefault();

        const validationErrors = await validateAllInputs(
            formDataRef.current,
            userSchema,
            setErrors
        );

        console.log("1: " + formDataRef.current.mnu_name);

        if (Object.values(validationErrors).every((error) => !error)) {
            setIsLoading(true);
            setIsError((prevError) => {
                return { ...prevError, error: false };
            });
            setErrors({});

            UseFetch(API_MENU + "/updateMenu", formDataRef.current)
                .then((data) => {
                    console.log(data);
                    if (data === "ERROR") {
                        setIsError((prevError) => {
                            return {
                                ...prevError,
                                error: true,
                                message: "Error Occured: Failed to Update Menu.",
                            };
                        });
                    } else {
                        SweetAlert("Success", "Menu Updated successfully", "success");
                        navigate("/Menu");
                    }
                })
                .then(() => setIsLoading(false));
        } else {
            console.error("Validation error occurred:", validationErrors);
        }
    };

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        const validationError = await validateInput(name, value, userSchema);

        if (name === "mnu_stock" || name === "mnu_price") formDataRef.current[name] = separator(value);
        else formDataRef.current[name] = value;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [validationError.name]: validationError.error,
        }));
    };

    return (
        <>
            {isError.error && (
                <div className="flex-fill">
                    <div className="alert alert-danger">
                        {isError.message}
                    </div>
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
                                    value={values.mnu_name}
                                    onChange={e => setMenus({...values, mnu_name: e.target.value})}
                                    errorMessage={errors.mnu_name}
                                />
                                    {/* <input type="text" value={menu.name} /> */}
                                </div>
                                <div className="col-lg-4">
                                    <Input
                                        type="text"
                                        forInput="mnu_description"
                                        label="Description"
                                        isRequired
                                        value={values.mnu_description}
                                        onChange={e => setMenus({...values, mnu_description: e.target.value})}
                                        errorMessage={errors.mnu_description}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <Input
                                        type="text"
                                        forInput="mnu_stock"
                                        label="Stock"
                                        isRequired
                                        value={values.mnu_stock}
                                        onChange={e => setMenus({...values, mnu_stock: e.target.value})}
                                        errorMessage={errors.mnu_stock}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <Input
                                        type="text"
                                        forInput="Price"
                                        label="Price"
                                        isRequired
                                        value={values.mnu_price}
                                        onChange={e => setMenus({...values, mnu_price: e.target.value})}
                                        errorMessage={errors.mnu_price}
                                    />
                                </div>
                            </div>
                        </div>

                </div>
                <div className="float-end my-4 mx-4">
                    <Button
                        classType="secondary me-2 px-4 py-2"
                        label="Cancel"
                        onClick={() => navigate("/Menu")}
                    />
                    <Button
                        classType="primary ms-2 px-4 py-2"
                        type="submit"
                        label="Update"
                    />
                </div>
            </form>
        </>
    );
}