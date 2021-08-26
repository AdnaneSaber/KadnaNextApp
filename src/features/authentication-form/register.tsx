import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "components/forms/input";
import {
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  // Input,
  Divider,
  LinkButton,
  Loaderr,
} from "./authentication-form.style";
import { Facebook } from "assets/icons/Facebook";
import { Google } from "assets/icons/Google";
import { AuthContext } from "contexts/auth/auth.context";
import Error from "components/custom-message/error";
import Success from "components/custom-message/success";
import { FormattedMessage } from "react-intl";
import { useMutation } from "@apollo/client";
import { GET_REGISTERED } from "graphql/mutation/register";
import { closeModal } from "@redq/reuse-modal";
export default function SignOutModal() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerStatus, setRegisterStatus] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerMutation, data] = useMutation(GET_REGISTERED, {
    onCompleted: () => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
  });
  const { authDispatch } = useContext<any>(AuthContext);

  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };
  const justRegistered = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };
  const register = () => {
    setLoading(true);
    if (typeof window !== "undefined") {
      registerMutation({
        variables: { username, email, password1, password2 },
      });
    }
  };
  useEffect(() => {
    if (data.data) {
      if (data.data.register.success) {
        setRegisterSuccess(data.data.register.success);
        justRegistered();
      } else {
        setRegisterStatus(
          data.data.register.errors[
            Object.keys(data.data.register.errors)[0]
          ][0].message
        );
      }
    }
  }, [loading]);
  return (
    <Wrapper className={loading && "hh"}>
      <Container>
        <Heading>
          <FormattedMessage id="signUpBtnText" defaultMessage="Sign Up" />
          {loading && <Loaderr /> }
        </Heading>
        <SubHeading>
          {registerSuccess ? (
            <Success message="Registered successfully !" />
          ) : (
            <Error message={registerStatus} />
          )}
        </SubHeading>
        <Input
          type="text"
          placeholder={"Username"}
          height="48px"
          backgroundColor="#F7F7F7"
          mb="10px"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          type="text"
          placeholder={"Email"}
          height="48px"
          backgroundColor="#F7F7F7"
          mb="10px"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder={"Password"}
          height="48px"
          backgroundColor="#F7F7F7"
          mb="10px"
          value={password1}
          onChange={(e) => {
            setPassword1(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder={"Confirm Password"}
          height="48px"
          backgroundColor="#F7F7F7"
          mb="10px"
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
        <HelperText style={{ padding: "20px 0 30px" }}>
          <FormattedMessage
            id="signUpText"
            defaultMessage="By signing up, you agree to Kanda's"
          />
          &nbsp;
          <Link href="/terms">
            <a>
              <FormattedMessage
                id="termsConditionText"
                defaultMessage="Terms &amp; Condition"
              />
            </a>
          </Link>
        </HelperText>
        <Button
          variant="primary"
          size="big"
          width="100%"
          type="submit"
          onClick={register}
        >
          <FormattedMessage id="continueBtn" defaultMessage="Continue" />
        </Button>
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
            id="alreadyHaveAccount"
            defaultMessage="Already have an account?"
          />{" "}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id="loginBtnText" defaultMessage="Login" />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
