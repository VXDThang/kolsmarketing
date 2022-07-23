import React from "react";
import {
	Box,
	Container,
	Row,
	Column,
	FooterLink,
	Heading,
	LinkOff
} from "./FooterStyles";

const Footer = () => {
	return (
		<div>
			<Box>
				<Container>
					<Row style={{}}>
						<Column>
							<Heading>
								<div style={{
									color: "#00b14f",
									textAlign: "left",
									fontSize: "30px",

									marginTop: "-20px"

								}}>
									KOLsMarketing
								</div>
							</Heading>

						</Column>
						<Column>
							<Heading>Cơ hội</Heading>
							<FooterLink href="#">Các cơ hội dành cho bạn</FooterLink>
							<FooterLink href="#">Các cơ hội hấp dẫn</FooterLink>
							<FooterLink href="#">Tất cả cơ hội</FooterLink>
						</Column>
						<Column>
							<Heading>Nhãn hàng</Heading>
							<FooterLink href="#">Danh sách nhãn hàng</FooterLink>
							<FooterLink href="#">Top nhãn hàng nổi bật</FooterLink>

						</Column>
						<Column>
							<Heading>Liên hệ</Heading>
							<FooterLink href="#">Facebook</FooterLink>
							<FooterLink href="#">Instagram</FooterLink>
							<FooterLink href="#">LinkedIn</FooterLink>
						</Column>

					</Row>
				</Container>
			</Box>
			<div style={{
				textAlign: "center", maxWidth: "100%", paddingTop: "10px", marginBottom: "20px",
				fontSize: "12px"
			}}>
				<span style={{fontWeight:600}}>KOLsMarketing</span>
				<span style={{ paddingLeft: "15px" }}>© 2022</span>
				<LinkOff href="#" style={{ paddingLeft: "15px" }}>About</LinkOff>
				<LinkOff href="#" style={{ paddingLeft: "15px" }}>Accessibility</LinkOff>
				<LinkOff href="#" style={{ paddingLeft: "15px" }}>User Agreement</LinkOff>
				<LinkOff href="#" style={{ paddingLeft: "15px" }}>Privacy Policy</LinkOff>
				<LinkOff href="#" style={{ paddingLeft: "15px" }}>Cookie Policy</LinkOff>
				<LinkOff href="#" style={{ paddingLeft: "15px" }}>Copyright Policy</LinkOff>
				<LinkOff href="#" style={{ paddingLeft: "15px" }}>Brand Policy</LinkOff>
				<LinkOff href="#" style={{ paddingLeft: "15px" }}>Guest Controls</LinkOff>
				<LinkOff href="#" style={{ paddingLeft: "15px" }}>Community Guidelines</LinkOff>
				<LinkOff href="#" style={{ paddingLeft: "15px" }}>Language</LinkOff>
			</div>
		</div>
	);
};
export default Footer;
