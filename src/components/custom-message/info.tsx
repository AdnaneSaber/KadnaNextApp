import styled from "styled-components";
export default function Info({ message }) {
  return <StyledAside>{message}</StyledAside>;
}

const StyledAside = styled.aside({
  color: "#303952",
  fontFamily: "Poppins,sans-serif",
  marginBottom: "1em",
});
