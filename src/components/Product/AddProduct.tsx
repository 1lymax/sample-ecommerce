// @flow
import {FC} from "react";
import * as React from 'react';
import styled from "styled-components";
import * as Yup from 'yup'
import {Field, Form, Formik} from "formik";

const Container = styled.div``

interface IAddProduct {

}

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export const AddProduct: FC<IAddProduct> = () => {
 return (
  <Container>
   <h1>Signup</h1>
   <Formik
       initialValues={{
        firstName: '',
        lastName: '',
        email: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
        // same shape as initial values
        console.log(values);
       }}
   >
    {({ errors, touched }) => (
        <Form>
         <Field name="firstName" />
         {errors.firstName && touched.firstName ? (
             <div>{errors.firstName}</div>
         ) : null}
         <Field name="lastName" />
         {errors.lastName && touched.lastName ? (
             <div>{errors.lastName}</div>
         ) : null}
         <Field name="email" type="email" />
         {errors.email && touched.email ? <div>{errors.email}</div> : null}
         <button type="submit">Submit</button>
        </Form>
    )}
   </Formik>
  </Container>
 );
};