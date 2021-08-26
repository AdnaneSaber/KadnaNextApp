import React, { useContext } from "react";
import {
  LinkButton,
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  // Input,
  Divider,
  Loaderr,
} from "./authentication-form.style";
import { Facebook } from "assets/icons/Facebook";
import { Google } from "assets/icons/Google";
import { AuthContext } from "contexts/auth/auth.context";
import { FormattedMessage } from "react-intl";
import { closeModal } from "@redq/reuse-modal";
import { Input } from "components/forms/input";
import { GET_LOGGED } from "../../graphql/mutation/login";
import { useMutation } from "@apollo/client";
import Error from "components/custom-message/error";
export default function SignInModal() {
  const { authDispatch } = useContext<any>(AuthContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const isValidToken = () => {
    const token = localStorage.getItem("access_token");
    // JWT decode & check token validity & expiration.
    if (token) return true;
    return false;
  };
  const [isAuthenticated, makeAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loginStatus, setLoginStatus] = React.useState("");
  const toggleSignUpForm = () => {
    authDispatch({
      type: "SIGNUP",
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: "FORGOTPASS",
    });
  };
  const [loginMutation, data] = useMutation(GET_LOGGED, {
    onCompleted: () => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
  });
  const loginCallback = (e) => {
    e.preventDefault();
    setLoading(true);
    if (typeof window !== "undefined") {
      loginMutation({
        variables: { username: username, password: password },
      });
    }
  };
  React.useEffect(() => {
    if (data.data) {
      if (data.data.tokenAuth.success) {
        makeAuthenticated(data.data.tokenAuth.success);
        localStorage.setItem("access_token", data.data.tokenAuth.token);
        localStorage.setItem("refresh_token", data.data.tokenAuth.refreshToken);
        authDispatch({
          type: "SIGNIN_SUCCESS",
          isAuthenticated: isAuthenticated,
        });
        closeModal();
      } else {
        setLoginStatus(data.data.tokenAuth.errors.nonFieldErrors[0].message);
      }
    }
  }, [loading]);
  return (
    <Wrapper className={loading && "hh"}>
      <Container>
        <Heading>
          <FormattedMessage id="welcomeBack" defaultMessage="Welcome Back" />
          {loading && <Loaderr />}
        </Heading>

        <SubHeading>
          <FormattedMessage
            id="loginTextt"
            defaultMessage="Login with your username &amp; password"
          />
          <Error message={loginStatus} />
        </SubHeading>
        <form onSubmit={(e) => loginCallback(e)}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            height="48px"
            backgroundColor="#F7F7F7"
            mb="10px"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            height="48px"
            backgroundColor="#F7F7F7"
            mb="10px"
          />

          <Button
            variant="primary"
            size="big"
            style={{ width: "100%" }}
            type="submit"
          >
            <FormattedMessage id="continueBtn" defaultMessage="Continue" />
          </Button>
        </form>
        <Divider>
          <span>
            <FormattedMessage id="orText" defaultMessage="or" />
          </span>
        </Divider>

        <Button
          variant="primary"
          size="big"
          style={{
            width: "100%",
            backgroundColor: "#4267b2",
            marginBottom: 10,
          }}
          onClick={loginCallback}
        >
          <IconWrapper>
            <Facebook />
          </IconWrapper>
          <FormattedMessage
            id="continueFacebookBtn"
            defaultMessage="Continue with Facebook"
          />
        </Button>

        <Button
          variant="primary"
          size="big"
          style={{ width: "100%", backgroundColor: "#4285f4" }}
          onClick={loginCallback}
        >
          <IconWrapper>
            <Google />
          </IconWrapper>
          <FormattedMessage
            id="continueGoogleBtn"
            defaultMessage="Continue with Google"
          />
        </Button>

        <Offer style={{ padding: "20px 0" }}>
          <FormattedMessage
            id="dontHaveAccount"
            defaultMessage="Don't have any account?"
          />{" "}
          <LinkButton onClick={toggleSignUpForm}>
            <FormattedMessage id="signUpBtnText" defaultMessage="Sign Up" />
          </LinkButton>
        </Offer>
      </Container>

      <OfferSection>
        <Offer>
          <FormattedMessage
            id="forgotPasswordText"
            defaultMessage="Forgot your password?"
          />{" "}
          <LinkButton onClick={toggleForgotPassForm}>
            <FormattedMessage id="resetText" defaultMessage="Reset It" />
          </LinkButton>
        </Offer>
      </OfferSection>
    </Wrapper>
  );
}
