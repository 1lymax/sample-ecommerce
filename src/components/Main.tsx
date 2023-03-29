// @flow
import {FC} from "react";
import * as React from 'react';
import styled from "styled-components";

const Container = styled.div`
margin: 40px;
`

interface IMain {

}

export const Main: FC<IMain> = () => {
 return (
  <Container>
   Sample e-commerce application
  </Container>
 );
};