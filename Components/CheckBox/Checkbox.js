// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import Circle from '../Icons/CircleSolid';
import Check from '../Icons/CheckCircle';

const CheckBoxContainer = styled.label `
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: ${props => props.theme.font.family};
  position:relative;
  margin:0rem 1rem 0rem 1rem;
`;
const CircleIcon = styled(Circle)`
    color: ${props =>  props.theme.color.primaryLightColor};
    position:absolute;
    top:2.5px;
    left:2.5px;
`;
const CircleCheck = styled(Check)`
    color: ${props => props.checked ? props.theme.color.primaryDarkColor :  props.theme.color.primaryLightColor};
    position:absolute;
    top:2.5px;
    left:2.5px;
`;

const CheckBoxInput = styled.input.attrs({type: 'checkbox'})`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const CheckBox = (props) => {
    const { title, onCheck, checked } = props;

    return (
      <CheckBoxContainer >
        {title}
        <CheckBoxInput onChange={onCheck} checked={checked} />
        <CircleIcon/>
        <CircleCheck checked={checked}/>
      </CheckBoxContainer>
    );
}

export default CheckBox;