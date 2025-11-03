import {
	Body,
	Container,
	Column,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";

export const OrderConfirmationEmail = ({
	orderNumber = "ORDER123456",
	customerName = "Customer",
	items = [],
	subtotal = 0,
	shipping = 50,
	vat = 0,
	total = 0,
}) => (
	<Html>
		<Head />
		<Preview>Your Audiophile order confirmation</Preview>
		<Body style={main}>
			<Container style={container}>
				<Section style={header}>
					<Heading style={heading}>audiophile</Heading>
				</Section>

				<Section style={content}>
					<Heading style={title}>Thank You For Your Order!</Heading>
					<Text style={paragraph}>Hi {customerName},</Text>
					<Text style={paragraph}>
						We've received your order and are processing it now. You'll receive
						a shipping confirmation email as soon as your items are on their
						way.
					</Text>

					<Section style={orderInfo}>
						<Text style={orderNumber}>Order #{orderNumber}</Text>
					</Section>

					{/* Order Items */}
					<Section style={itemsSection}>
						{items.map((item, index) => (
							<Row key={index} style={itemRow}>
								<Column style={itemImageCol}>
									<Img
										src={item.image}
										width="80"
										height="80"
										alt={item.name}
										style={itemImage}
									/>
								</Column>
								<Column style={itemDetailsCol}>
									<Text style={itemName}>{item.name}</Text>
									<Text style={itemPrice}>
										${item.price.toLocaleString()} x {item.quantity}
									</Text>
								</Column>
								<Column style={itemTotalCol}>
									<Text style={itemTotal}>
										${(item.price * item.quantity).toLocaleString()}
									</Text>
								</Column>
							</Row>
						))}
					</Section>

					{/* Order Summary */}
					<Section style={summarySection}>
						<Row style={summaryRow}>
							<Column>
								<Text style={summaryLabel}>Subtotal:</Text>
							</Column>
							<Column align="right">
								<Text style={summaryValue}>${subtotal.toLocaleString()}</Text>
							</Column>
						</Row>
						<Row style={summaryRow}>
							<Column>
								<Text style={summaryLabel}>Shipping:</Text>
							</Column>
							<Column align="right">
								<Text style={summaryValue}>${shipping}</Text>
							</Column>
						</Row>
						<Row style={summaryRow}>
							<Column>
								<Text style={summaryLabel}>VAT (Included):</Text>
							</Column>
							<Column align="right">
								<Text style={summaryValue}>${vat.toLocaleString()}</Text>
							</Column>
						</Row>
						<Row style={totalRow}>
							<Column>
								<Text style={totalLabel}>Total:</Text>
							</Column>
							<Column align="right">
								<Text style={totalValue}>${total.toLocaleString()}</Text>
							</Column>
						</Row>
					</Section>

					<Text style={paragraph}>
						If you have any questions, please don't hesitate to contact our
						support team.
					</Text>

					<Text style={footer}>
						Best regards,
						<br />
						The Audiophile Team
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

export default OrderConfirmationEmail;

// Styles remain the same...
const main = {
	backgroundColor: "#f6f9fc",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "20px 0 48px",
	marginBottom: "64px",
};

const header = {
	padding: "32px 48px",
	backgroundColor: "#000000",
};

const heading = {
	fontSize: "24px",
	fontWeight: "bold",
	color: "#ffffff",
	textTransform: "uppercase",
	letterSpacing: "2px",
	margin: 0,
};

const content = {
	padding: "0 48px",
};

const title = {
	fontSize: "32px",
	fontWeight: "bold",
	marginTop: "32px",
};

const paragraph = {
	fontSize: "16px",
	lineHeight: "26px",
	color: "#525252",
};

const orderInfo = {
	backgroundColor: "#f3f4f6",
	padding: "16px",
	borderRadius: "8px",
	margin: "24px 0",
};

const orderNumberStyle = {
	fontSize: "18px",
	fontWeight: "bold",
	margin: 0,
};

const itemsSection = {
	marginTop: "32px",
};

const itemRow = {
	borderBottom: "1px solid #e5e7eb",
	paddingTop: "16px",
	paddingBottom: "16px",
};

const itemImageCol = {
	width: "80px",
};

const itemImage = {
	borderRadius: "8px",
	backgroundColor: "#f3f4f6",
};

const itemDetailsCol = {
	paddingLeft: "16px",
};

const itemName = {
	fontSize: "16px",
	fontWeight: "600",
	margin: "0 0 4px 0",
};

const itemPrice = {
	fontSize: "14px",
	color: "#6b7280",
	margin: 0,
};

const itemTotalCol = {
	textAlign: "right",
};

const itemTotal = {
	fontSize: "16px",
	fontWeight: "600",
	margin: 0,
};

const summarySection = {
	marginTop: "32px",
	borderTop: "2px solid #e5e7eb",
	paddingTop: "16px",
};

const summaryRow = {
	marginBottom: "8px",
};

const summaryLabel = {
	fontSize: "14px",
	color: "#6b7280",
	margin: 0,
};

const summaryValue = {
	fontSize: "14px",
	fontWeight: "600",
	margin: 0,
};

const totalRow = {
	marginTop: "16px",
	paddingTop: "16px",
	borderTop: "1px solid #e5e7eb",
};

const totalLabel = {
	fontSize: "16px",
	fontWeight: "bold",
	margin: 0,
};

const totalValue = {
	fontSize: "20px",
	fontWeight: "bold",
	color: "#d97706",
	margin: 0,
};

const footer = {
	fontSize: "14px",
	color: "#6b7280",
	marginTop: "48px",
};
