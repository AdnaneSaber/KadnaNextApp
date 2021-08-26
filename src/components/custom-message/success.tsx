import styled from "styled-components";
export default function Success({ message }) {
  return <StyledAside>{message}</StyledAside>;
}

const StyledAside = styled.aside({
  justifyContent: "center",
  color: "#47cb3d",
  fontFamily: "Poppins,sans-serif",
  fontWeight:'bold',
});
