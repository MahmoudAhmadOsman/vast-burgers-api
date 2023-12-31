import React, { useEffect, useState } from "react";
import BurgerService from "../service/BurgerService";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import "./OrderStyle.css";

const OrderListcomponent = () => {
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [orderDate, setOrderDate] = useState(0);

	const handleImageLoad = () => {
		setLoading(false);
	};

	const handleImageError = () => {
		setLoading(true);
	};

	const getAllOrders = async () => {
		try {
			await BurgerService.getAllOrders()
				.then((res) => {
					if (Array.isArray(res.data)) {
						const allOrders = res.data.flatMap((order) => order.cart);
						setOrders(allOrders);

						const totalPrice = res.data.reduce(
							(acc, order) => acc + order.totalPrice,
							0
						);
						setTotalPrice(totalPrice);
						setOrderDate(new Date().toLocaleDateString());

						setLoading(false);
					} else {
						throw new Error("Invalid data format");
					}
				})

				.catch((error) => {
					toast.warn(`An Error ${error} has occurred!!`, {
						position: "top-right",
						autoClose: 3000,
					});
					console.log(error.message);
				});
		} catch (error) {
			toast.warn(`An Error ${error} has occurred!!`, {
				position: "top-right",
				autoClose: 3000,
			});
			console.log(error.message);
		}
	};

	useEffect(() => {
		getAllOrders();
	}, []);

	return (
		<div className="order-list container">
			{loading ? (
				<div>
					<Loading />
				</div>
			) : (
				<>
					<div className="row mt-4">
						{orders.length === 0 ? (
							<span></span>
						) : (
							<div className="mb-3">
								<h1 className="text-success">Your Order List</h1>
								<hr />
							</div>
						)}

						{orders.length === 0 ? (
							<div className="alert alert-danger mt-4">
								<h3 className="text-center">
									No Orders Yet. Please Submit a New Order
								</h3>
							</div>
						) : (
							<>
								<div className="table-responsive  shadow-lg p-3 mb-5 bg-body rounded">
									<table className="table table-striped table-hover table-bordered table-sm ">
										<thead>
											<tr>
												<th scope="col">Item #</th>
												<th scope="col">Name</th>
												<th scope="col">Image</th>
												<th scope="col">Price</th>
												<th scope="col">Description</th>
												<th scope="col">Order Status</th>
												<th scope="col">Order Date</th>
											</tr>
										</thead>
										<tbody>
											{orders.map((order, index) => (
												<tr key={order.id}>
													<th scope="row">{index + 1}</th>
													<td>{order.name}</td>
													<td className="order-image">
														{order.meal_img ? (
															<img
																src={order.meal_img}
																className="img-fluid"
																alt={order.name}
																onLoad={handleImageLoad}
																onError={handleImageError}
															/>
														) : (
															<img
																src={order.drink_image}
																className="img-fluid"
																alt={order.name}
																onLoad={handleImageLoad}
																onError={handleImageError}
															/>
														)}
													</td>
													<td>
														<b className="text-danger fw-bold">
															${order.price}
														</b>
													</td>
													<td className="text-muted">
														{order.description.slice(0, 48)}...
													</td>
													<td>
														{order ? (
															<div className="text-center">
																<span className="text-success">Processing</span>
															</div>
														) : (
															<div>
																Status
																<span className="text-danger">Pending</span>
															</div>
														)}
													</td>
													<td>
														<span className="text-warning">{orderDate}</span>
													</td>
												</tr>
											))}
										</tbody>
										<caption>Number of order items {orders.length}</caption>
									</table>
								</div>
							</>
						)}

						{/* {orders.length === 0 ? (
							<div className="alert alert-danger mt-4">
								<h3 className="text-center">
									No Orders Yet. Please Submit a New Order
								</h3>
							</div>
						) : (
							orders.map((order, index) => (
								<div
									className="col-lg-3 col-md-4 col-sm-6 clearfix "
									key={order.id}
								>
									<div className="card mb-4">
										<div className="card-header">
											<h6>Order Item {index + 1}</h6>
										</div>
										{order.meal_img ? (
											<img
												src={order.meal_img}
												className="img-fluid"
												alt={order.name}
												onLoad={handleImageLoad}
												onError={handleImageError}
											/>
										) : (
											<img
												src={order.drink_image}
												className="img-fluid"
												alt={order.name}
												onLoad={handleImageLoad}
												onError={handleImageError}
											/>
										)}

										<div className="card-body">
											<h4>{order.name}</h4>
											<h6>
												Price :{" "}
												<b className="text-danger fw-bold">${order.price}</b>
											</h6>{" "}
											<hr />
											<b className="h5 text-muted">Description:</b>{" "}
											<p className="text-muted">
												{order.description.slice(0, 48)}...
											</p>
											<div>
												{order ? (
													<div>
														<hr />
														<b>Order Status: </b>

														<span className="text-success">Processing</span>
														<p>
															<b>Order Date:</b>{" "}
															<span className="text-warning">{orderDate}</span>
														</p>
													</div>
												) : (
													<div>
														{" "}
														Status
														<span className="text-danger">Pending</span>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							))
						)} */}
						{/* Total price */}
						{orders.length > 0 ? (
							<div>
								<h1 className="float-end bg-light p-3 shadow-lg p-3 mb-5 rounded">
									Total Price:{" "}
									<b className="text-danger">${totalPrice.toFixed(2)}</b>
								</h1>
							</div>
						) : null}
					</div>
				</>
			)}
		</div>
	);
};

export default OrderListcomponent;
