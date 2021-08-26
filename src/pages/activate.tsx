import { NextPage } from "next";
import Sticky from "react-stickynode";
import { Modal } from "@redq/reuse-modal";
import { StyledContainer } from "features/terms-and-services/terms-and-services";
import { Heading } from "components/heading/heading";
import { SEO } from "components/seo";
import queryString from "query-string";
import { Button } from "components/button/button";
import { GET_VERIFIED } from "graphql/mutation/verify";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
const pageTitle = "Activate Account";
import Error from "components/custom-message/error";
import Success from "components/custom-message/success";
import Info from "components/custom-message/info";
import { SubHeading } from "features/authentication-form/authentication-form.style";

const ActivateAccount: NextPage<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(true);
  let token = "";
  if (typeof window !== "undefined") {
    token = queryString.parse(window.location.search).token;
  }
  const [activateMutation, data] = useMutation(GET_VERIFIED, {
    onCompleted: () => {
      setLoading(true);
    },
    onError: () => {
      setSuccess(false);
    },
  });
  const verify = () => {
    if (typeof window !== "undefined") {
      activateMutation({
        variables: { token },
      });
    }
  };
  useEffect(() => {
    if (data.error) {
      data.error.message === "CustomUser matching query does not exist."
        ? setSuccessStatus("Invalid token !")
        : setSuccessStatus("error !");
    }
  }, [success]);
  useEffect(() => {
    if (data.data) {
      if (data.data.verifyAccount.success) {
        setStatus(data.data.verifyAccount.success);
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      } else {
        setSuccessStatus(
          data.data.verifyAccount.errors[
            Object.keys(data.data.verifyAccount.errors)[0]
          ][0].message
        );
      }
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [loading]);
  return (
    <Modal>
      <SEO title="Activate Account" description="Kanda Activate Account" />
      <StyledContainer>
        <Heading
          title={pageTitle}
          subtitle={
            "Thank you for registering with us. In order to activate your account please click the button below."
          }
        />
        <SubHeading>
          {status ? (
            <Success message="Activated successfully !" />
          ) : (
            <Error message={successStatus} />
          )}
        </SubHeading>
        {/* <Info message={successStatus} /> */}
        <Button onClick={verify}>Activate your account !</Button>
      </StyledContainer>
    </Modal>
  );
};

export default ActivateAccount;
