import styled from 'styled-components';

const Button = styled.button`
    cursor: pointer;
    padding: 1rem;
    margin-top: 1rem;    
    margin-bottom: 1rem;
    border-radius: 8px;
    border: 2px solid ${props => props.theme.color.primaryDarkColor};
    background-color: ${props => props.theme.color.primaryColor};
    font-size: ${props => props.theme.font.size.text};
    font-weight:${props => props.theme.font.weight.bold};
    color:white;
    font-weight:800;
    &:hover{
        background-color: ${props => props.theme.color.primaryDarkColor};
        color: ${props => props.theme.color.primaryLightColor};
    }
    &:focus {
        outline: unset;
    }
    &:disabled {
        background-color: ${props => props.theme.color.primaryDarkColor};
        color: ${props => props.theme.color.primaryLightColor};
    }
`;
export const SecondaryButton = styled.button`
    cursor: pointer;
    padding: 1rem;
    margin-top: 1rem;    
    margin-bottom: 1rem;
    border-radius: 8px;
    color: ${props => props.theme.color.primaryDarkColor};
    border: 2px solid ${props => props.theme.color.primaryDarkColor};
    background-color: white;
    font-size: ${props => props.theme.font.size.text};
    font-weight:${props => props.theme.font.weight.bold};
    & > * {
        font-weight:800;
    }
    &:hover{
        background-color: ${props => props.theme.color.primaryDarkColor};
        color: ${props => props.theme.color.primaryLightColor};
    }
    &:focus {
        outline: unset;
    }
    &:disabled {
        background-color: ${props => props.theme.color.primaryDarkColor};
        color: ${props => props.theme.color.primaryLightColor};
    }
`;
export default Button;