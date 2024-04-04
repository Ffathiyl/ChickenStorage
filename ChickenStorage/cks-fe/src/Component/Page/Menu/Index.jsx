import burgerImage from "../../../assets/BurgerReact.jpg";
import pepsiImage from "../../../assets/Pepsi 450x300.jpg";
import rbImage from "../../../assets/RBDrink 450x300.jpg";
import pizzaImage from "../../../assets/Pizza 450x300.jpg";

export default function MenuIndex() {

    const dummyData = [
        {
            "mnu_id": "1",
            "mnu_name": "Burger",
            "mnu_description": "Food",
            "mnu_price": 15000,
            "mnu_picture": burgerImage,
            "mnu_stock": 5
        },
        {
            "mnu_id": "2",
            "mnu_name": "Red Bull",
            "mnu_description": "Drink",
            "mnu_price": 30000,
            "mnu_picture": rbImage,
            "mnu_stock": 3
        },
        {
            "mnu_id": "3",
            "mnu_name": "Pepsi",
            "mnu_description": "Drink",
            "mnu_price": 8000,
            "mnu_picture": pepsiImage,
            "mnu_stock": 3
        },
        {
            "mnu_id": "4",
            "mnu_name": "Pizza",
            "mnu_description": "Food",
            "mnu_price": 90000,
            "mnu_picture": pizzaImage,
            "mnu_stock": 3
        }
    ]

    return (
        <>
            <div className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">
                            Welcome to Los Pollos Hermanos
                        </h1>
                        <p className="lead fw-normal text-white-50 mb-0">Gustavo Fring</p>
                    </div>
                </div>
            </div>

            {/* Menampilkan Card Menu */}
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {dummyData.map((menu) => (
                            <div className="col mb-5" key={menu.mnu_id}>
                                <div className="card h-100">
                                    {/* Product image */}
                                    <img
                                        className="card-img-top"
                                        src={menu.mnu_picture}
                                        alt="..."
                                    />
                                    {/* Product details */}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name */}
                                            <h5 className="fw-bolder">{menu.mnu_name}</h5>
                                            {/* Product price */}
                                            
                                        </div>
                                    </div>
                                    {/* Product actions */}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <a className="btn btn-outline-dark mt-auto" href="#">
                                                Buy
                                            </a>
                                            <span className="mx-2">Rp. {menu.mnu_price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}