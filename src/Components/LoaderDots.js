import React from "react";
import styled from "styled-components";
import { Dots } from 'react-activity';

const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => (
  <Loader>
    <Dots />
  </Loader>
);