import styled from 'styled-components';

export const Box = styled.div`
padding: 30px 20px;
background: #f3f2f0;
bottom: 0;
width: 100%;
@media (max-width: 1000px) {
	padding: 30px 20px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	margin: 0 auto;
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 60px;
`;

export const Row = styled.div`
display: grid;
width: 100%;
grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color: #616160;
margin-bottom: 20px;
font-size: 14px;
font-weight: 500;
text-decoration: none;

&:hover {
	color: #00b14f;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 16px;
color: black;
margin-bottom: 20px;
font-weight: bold;
`;


export const LinkOff = styled.span`
cursor: pointer;
&:hover {
	color: #00b14f;
	transition: 200ms ease-in;
}
`;