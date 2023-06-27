import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BurgerService from "../service/BurgerService";
import { useEffect } from "react";
import { toast } from "react-toastify";

const BurderDetailsComponent = () => {
	const { id } = useParams();

	const [burger, setBurger] = useState({
		name: "",
		price: "",
		description: "",
		review: "",
		meal_img: "",
		calories: "",
		fiber: "",
		protein: "",
		carbs: "",
	});

	const loadBurderData = async () => {
		try {
			await BurgerService.getBurgerId(id)
				.then((res) => {
					setBurger(res.data);
				})
				.catch((error) => {
					toast.warn(`An Error ${error} has occured!!`, {
						position: "bottom-right",
					});
				});
		} catch (error) {
			toast.warn(`An Error ${error} has occured!!`, {
				position: "bottom-right",
			});
		}
	};

	useEffect(() => {
		// console.log(burger);
		loadBurderData();
	}, []);

	return (
		<section className="burger-details">
			<div className="container mt-3 mb-5">
				<h1 className="text-dark">Burger Details</h1> <hr />
				<div className="row d-flex justify-content-center">
					<div className="col-md-10">
						<div className="card">
							<div className="row">
								<div className="col-md-6">
									<div className="images p-3">
										<div className="text-center p-4">
											<img src={burger.meal_img} alt={burger.name} />{" "}
										</div>
									</div>
								</div>
								<div className="col-md-6">
									<div className="product p-4">
										<div className="float-end">
											<i className="fa fa-chevron-left" />
											<Link to="/burgers" className="ms-2">
												Back
											</Link>
										</div>
										<div className="mb-3">
											<h1 className="text-uppercase">{burger.name}</h1>

											<div className="price">
												{" "}
												<h2 className="act-price">${burger.price}</h2>
												<p>
													<b className="text-warning">Reviews:</b>{" "}
													{burger.review}
												</p>
											</div>
										</div>
										<h4 className="text-muted">Description</h4>
										<p className="about">{burger.description}</p> <hr />
										<div className="meal_btn text-dark">
											<span>
												<i className="fa fa-chevron-right"></i> Reviews:{" "}
												{burger.review}
											</span>
											<span>
												<i className="fa fa-chevron-right ms-2"></i> Calories:{" "}
												{burger.calories}
											</span>
											<span>
												<i className="fa fa-chevron-right ms-2"></i> Fiber:{" "}
												{burger.fiber}
											</span>
											<span>
												<i className="fa fa-chevron-right ms-2"></i> Protein:{" "}
												{burger.protein}
											</span>
											<span>
												<i className="fa fa-chevron-right ms-2"></i> Carbs:{" "}
												{burger.carbs}
											</span>
										</div>
										<div className="cart mt-4 align-items-center">
											<button className="btn btn-outline-danger w-50 btn-lg text-uppercase fw-bold">
												ADD TO CART
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BurderDetailsComponent;
