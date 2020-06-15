import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Theme from "../Styles/Theme";

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${props => props.bg_color};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`;

const Button = ({ color=Theme.blueColor, text }) => <Container bg_color={color}>{text}</Container>;

Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;