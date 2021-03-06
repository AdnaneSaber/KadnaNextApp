import React, { useContext } from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, Form } from "formik";
import { closeModal } from "@redq/reuse-modal";
import TextField from "components/forms/text-field";
import { Button } from "components/button/button";
import { useMutation } from "@apollo/client";
import { UPDATE_ADDRESS } from "graphql/mutation/address";
import { FieldWrapper, Heading } from "./address-card.style";
import { ProfileContext } from "contexts/profile/profile.context";
import { FormattedMessage } from "react-intl";

// Shape of form values
type FormValues = {
  id?: number | null;
  title?: string;
  address?: string;
};

// The type of props MyForm receives
interface MyFormProps {
  item?: any | null;
}

// Wrap our form with the using withFormik HoC
const FormEnhancer = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      id: props.item.id || null,
      title: props.item.title || "",
      address: props.item.address || "",
    };
  },
  validationSchema: Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    address: Yup.string().required("Address is required"),
  }),
  handleSubmit: (values) => {
    // console.log(values, "values");
    // do submitting things
  },
});

const UpdateAddress = (props: FormikProps<FormValues> & MyFormProps) => {
  const {
    isValid,
    item,
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,

    handleReset,
    isSubmitting,
  } = props;
  const addressValue = {
    id: values.id,
    type: "SECONDARY",
    title: values.title,
    address: values.address,
  };
  
  const { state, dispatch } = useContext(ProfileContext);
  const [addressMutation] = useMutation(UPDATE_ADDRESS);
  const handleSubmit = async () => {
    const { id, title, address } = values;
    await addressMutation({
      variables: { id, title, address },
    });
    dispatch({ type: "ADD_OR_UPDATE_ADDRESS", payload: values });
    closeModal();
  };
  return (
    <Form>
      <Heading>{item && item.id ? "Edit Address" : "Add New Address"}</Heading>
      <FieldWrapper>
        <TextField
          id="name"
          type="text"
          placeholder="Enter Title"
          error={touched.title && errors.title}
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <FieldWrapper>
        <TextField
          id="address"
          as="textarea"
          placeholder="Enter Address"
          error={touched.address && errors.address}
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FieldWrapper>

      <Button
        onClick={handleSubmit}
        type="submit"
        style={{ width: "100%", height: "44px" }}
      >
        <FormattedMessage id="savedAddresssId" defaultMessage="Save Address" />
      </Button>
    </Form>
  );
};

export default FormEnhancer(UpdateAddress);
