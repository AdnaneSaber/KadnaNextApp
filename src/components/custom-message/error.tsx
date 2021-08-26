import styled from "styled-components";
export default function Error({ message }) {
  return <StyledAside>{message}</StyledAside>;
}

const StyledAside = styled.aside({
  justifyContent: "center",
  color: "#EA2027",
  fontFamily: "Poppins,sans-serif",
  fontWeight:'bold',
});
