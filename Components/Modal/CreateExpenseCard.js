// @ts-nocheck
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation, gql} from'@apollo/client';

import TimesCircle from '../Icons/TimesCircle';
import Input from '../Input/Input';
import Button from '../Button/Button';
import ErrorField from '../ErrorField/ErrorField';
import StyledSelect from '../StyledSelect/StyledSelect';
import {YearOptions, MonthOptions, NumberOfMonthOptions} from '../../constants/constants';

const CrossButton = styled(TimesCircle)`
    align-self:center;
    font-size: 25px;
    color: black;
    margin: 0rem 1rem 1rem 1rem;
    cursor: pointer;
    &:hover{
        color: ${props => props.theme.color.primaryLightColor};
    }
`;
const CreateExpenseCardContainer = styled.form`
    z-index:5;
    position:relative;
    align-self:center;
    background-color:white;
    border-radius:5px;
`;
const ModalHeader = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin:1rem;
    height:10%;
    border-bottom: 2px solid ${props => props.theme.color.primaryLightColor};
`;
const ModalHeaderText = styled.div`
    font-family:${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
`;
const ModalBody = styled.div`
    display:flex;
    flex-direction:column;
    overflow-y: auto;
`;

const InputContainer = styled.div`
    margin:0.1rem 1rem 0.1rem 1rem;
    width:50%;
    display:flex;
    flex-direction:column;
    position:relative;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;
const ButtonContainer = styled.div`
    margin:0.1rem 1rem 0.1rem 1rem;
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    position:relative;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;    
    margin-top:1rem;
`;
const CustomButton = styled(Button)`
  margin:1rem 0rem 1rem 0rem;
  width:50%;
  @media screen {
    width:100%;
  }
  cursor: pointer;
`;

const ADD_RANGE_EXPENSES = gql`
    mutation addRangeExpenses($input:RangeExpenseInput!){
        addRangeExpenses(input: $input){
            id
        }
    }
`;

const CreateExpenseCard = (props) => {
    const {changeVisibility} = props;
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [addRangeExpenses] = useMutation(ADD_RANGE_EXPENSES);
    const formik = useFormik({
        initialValues: {
            name: '',
            amount: 0,
            startMonth: MonthOptions[(new Date()).getMonth()],
            startYear: YearOptions[0],
            numberOfMonth: NumberOfMonthOptions[0],
        },
        validationSchema: Yup.object({
            name: Yup.string('Debe ser string').required('Campo requerido.'),
            amount: Yup.number('Debe ser numero').min(0, 'monto mayor a 0.').required('Campo requerido.'),
            startMonth: Yup.object().required('Campo requerido.'),
            startYear: Yup.object().required('Campo requerido.')
        }),
        onSubmit: async values => {
            try {
                const {name, amount, startMonth, startYear, numberOfMonth} = values;
                const inp = {   name,
                                amount: parseFloat(amount),
                                startMonth: parseInt(startMonth.value),
                                startYear: parseInt(startYear.value),
                                monthAmount: parseInt(numberOfMonth.value)};
                await addRangeExpenses({variables: { input: {...inp}}});
                changeVisibility();
            } catch (err) {
                const message = err.message.replace('GraphQL error:', '');
                setErrorMessage(message);
                setTimeout( () => {
                  setErrorMessage(null);
                },3000);
            }
            formik.resetForm();
        }
    });

    const { setFieldValue } = formik;
    const handleStartMonthSelect = useCallback((value) => setFieldValue('startMonth', value), [setFieldValue]);
    const handleStartYearSelect = useCallback((value) => setFieldValue('startYear', value), [setFieldValue]);
    const handleNumberOfMonthSelect = useCallback((value) => setFieldValue('numberOfMonth', value), [setFieldValue]);

    return (
        <CreateExpenseCardContainer onSubmit={formik.handleSubmit} id='expenseForm'>
            <ModalHeader>
                <ModalHeaderText>
                    Nuevo gasto
                </ModalHeaderText>
                <CrossButton onClick={changeVisibility}/>
            </ModalHeader>
            <ErrorField ErrorMessage={ErrorMessage} touched={true} />
            <ModalBody >
                <Row>
                    <InputContainer>
                        <Input
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='name'
                            id='name'
                            type='name'
                        />
                        <label>Nombre</label>
                    <ErrorField errorMessage={formik.errors.name} touched={formik.touched.name} />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='amount'
                            id='amount'
                            type='amount'
                        />
                        <label>Monto</label>
                    <ErrorField errorMessage={formik.errors.amount} touched={formik.touched.amount} />
                    </InputContainer>
                </Row>
                <Row>
                    <StyledSelect
                        value={formik.values.startMonth}
                        onChange={handleStartMonthSelect}
                        name='startMonth'
                        type='startMonth'
                        options={MonthOptions}
                        label='Mes de comienzo'
                    />
                    <StyledSelect
                        options={YearOptions}
                        value={formik.values.startYear}
                        onChange={handleStartYearSelect}
                        name='startYear'
                        type='startYear'
                        label='Año de comienzo'
                    />
                    <ErrorField errorMessage={formik.errors.startMonth} touched={formik.touched.startMonth} />
                    <ErrorField errorMessage={formik.errors.startYear} touched={formik.touched.startYear} />
                </Row>
                <Row>
                    <StyledSelect
                        options={NumberOfMonthOptions}
                        value={formik.values.numberOfMonth}
                        onChange={handleNumberOfMonthSelect}
                        name='numberOfMonth'
                        type='numberOfMonth'
                        label='Cantidad de meses'
                    />
                    <ErrorField errorMessage={formik.errors.numberOfMonth} touched={formik.touched.numberOfMonth} />
                </Row>
                <Row>
                    <ButtonContainer>
                        <CustomButton type='submit' form='expenseForm' >Agregar!</CustomButton>
                    </ButtonContainer>
                </Row>
            </ModalBody>
        </CreateExpenseCardContainer>
    )
}

export default CreateExpenseCard;