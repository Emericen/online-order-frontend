import { Button, Card, List, message, Select, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { addItemToCart, getMenus, getRestaurants } from "../utils"
import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import Meta from "antd/lib/card/Meta";


const { Option } = Select;

const AddToCartButton = ({ itemId }) => {
	const [loading, setLoading] = useState(false);

	const AddToCart = () => {
		setLoading(true);
		addItemToCart(itemId)
			.then(() => message.success(`Successfully add item`))
			.catch((err) => message.error(err.message))
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<Tooltip title="Add to shopping cart">
			<Button
				loading={loading}
				type="text"
				icon={<PlusOutlined />}
				onClick={AddToCart}
			/>
		</Tooltip>
	)
}

const FoodList = () => {
	const [foodData, setFoodData] = useState([])
	const [curRest, setCurRest] = useState()
	const [restaurants, setRestaurants] = useState([])
	const [loading, setLoading] = useState(false)
	const [loadingRest, setLoadingRest] = useState(false)

	useEffect(() => {
		setLoadingRest(true);
		getRestaurants()
			.then((data) => {
				setRestaurants(data);
			})
			.catch((err) => {
				message.error(err.message);
			})
			.finally(() => {
				setLoadingRest(false);
			})
	}, [])

	useEffect(() => {
		if (curRest) {
			setLoading(true)
			getMenus(curRest)
				.then((data) => {
					setFoodData(data)
				})
				.catch((err) => {
					message.error(err.message)
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [curRest])

	return (
		<>
			<Select
				value={curRest}
				onSelect={(value) => setCurRest(value)}
				placeholder="Select a restaurant"
				loading={loadingRest}
				style={{ width: 300 }}
				onChange={() => { }}
			>
				{restaurants.map((item) => {
					return <Option value={item.id}>{item.name}</Option>
				})}
			</Select>
			{curRest && (
				<List
					style={{ marginTop: 20 }}
					loading={loading}
					grid={{
						gutter: 16,
						xs: 1,
						sm: 2,
						md: 3,
						lg: 3,
						xl: 4,
						xxl: 5,
					}}
					dataSource={foodData}
					renderItem={(item) => (
						<List.Item>
							<Card
								style={{
									width: 300,
								}}
								cover={
									<img 
										src={item.imageUrl}
										alt={item.name}
									/>
								}
								actions={[
									<AddToCartButton itemId={item.id} />,
									<EditOutlined key="edit" />,
								]}
							>
								<Meta 
									title={item.name}
									description={item.discription}
								/>
									
							</Card>
						</List.Item>
					)}
				/>
			)}
		</>
	)
}

export default FoodList

