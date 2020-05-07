// @ts-nocheck
import React, {useState, useEffect, useContext, useCallback} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation, gql} from'@apollo/client';
import ExpenseContext from '../../../context/expenses/ExpenseContext';
import ModalHeader from '../ModalHeader/ModalHeader';
import {StyledInput} from '../../Input/Input';
import Button from '../../Button/Button';
import ErrorField from '../../ErrorField/ErrorField';
import StyledSelect from '../../StyledSelect/StyledSelect';
import {ExpenseTypeOptions} from '../../../constants/constants';

const UpdateExpenseCardContainer = styled.form`
    z-index:5;
    position:relative;
    align-self:center;
    background-color:${props => props.theme.color.white};
    border-radius:5px;
    width:70vw;
    height:60vh;  
    @media (max-width: 768px) {
        width:100%;
    }
`;
const ModalBody = styled.div`
    display:flex;
    flex-direction:column;
    height:35vh;
    overflow-y: auto;
`;
const ModalFooter = styled.div`
    display:flex;

`;
const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin-top:1rem;
    &:first-child {
        margin:0rem 1rem 0rem 1rem;
    }
`;
const CustomButton = styled(Button)`
    margin:0rem 1rem 0rem 1rem;
`;

const UPDATE_EXPENSE = gql`
    mutation updateExpense($input:UpdateExpenseInput!){
        updateExpense(input: $input){
            id,
            name,
            paid,
            amount,
            type
        }
    }
`;
const UpdateExpenseCard = (props) => {
    const {changeVisibility, expense} = props;
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [updateExpense] = useMutation(UPDATE_EXPENSE);
    const expenseContext = useContext(ExpenseContext);
    const formik = useFormik({
        initialValues: {
            updateAmount: (expense) ? expense.amount : '',
            updateType: (expense) ? ExpenseTypeOptions.find(option => option.value === expense.type) : ExpenseTypeOptions[0],
        },
        validationSchema: Yup.object({
            updateAmount: Yup.number('Must be number')
                            .required('Amount is required.')
                            .min(0, 'Amount greater than 0.')
                            .max(9999999,'Amount must be lower than 9999999 characters'),
            updateType: Yup.object().required('Type is required.'),
        }),
        onSubmit: async values => {
                const {updateAmount, updateType} = values;
                const {id} = expense;
                try {
                    const {data} = await updateExpense({
                        variables: { 
                            input: {
                                expenseId: id, 
                                amount: parseFloat(updateAmount),
                                type:updateType.value
                            }
                        }
                    });
                    expenseContext.updateExpense(data.updateExpense);
                    changeVisibility();
                } catch (err) {
                    const message = err.message.replace('GraphQL error:', '');
                    setErrorMessage(message);
                    setTimeout( () => {
                    setErrorMessage(null);
                    },4000);
                }
            }    
        });
    
    const { setFieldValue } = formik;
    useEffect(() => {
        setFieldValue('updateAmount', (expense) ? expense.amount : '');
        const currentType = expense ? ExpenseTypeOptions.find(option => option.value === expense.type) : null;
        handleTypeSelect((expense) ? currentType : null);
    }, [expense]);

    const handleTypeSelect = useCallback((value) => setFieldValue('updateType', value), [setFieldValue]);

    return (
        <UpdateExpenseCardContainer onSubmit={formik.handleSubmit} id='updateExpenseForm'>
            <ModalHeader title={`Update ${expense !== null ? expense.name : ''}`} onClose={changeVisibility}/>
            <ErrorField ErrorMessage={ErrorMessage} touched={true} />
            <ModalBody >
                <Row>
                    <StyledSelect
                        options={ExpenseTypeOptions}
                        value={formik.values.updateType}
                        onChange={handleTypeSelect}
                        name='updateType'
                        label='Type'
                        error={formik.errors.updateName}
                        touched={formik.touched.updateName}
                    />
                    <StyledInput
                        value={formik.values.updateAmount}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        name='updateAmount'
                        id='updateAmount'
                        label='Amount'
                        errors={formik.errors.updateAmount}
                        touched={formik.touched.updateAmount}
                        noWhitesSpaces={true}
                    />
                </Row>
            </ModalBody>
            <ModalFooter>
                <CustomButton type='submit' form='updateExpenseForm' >Update</CustomButton>
            </ModalFooter>
        </UpdateExpenseCardContainer>
    )
}

export default UpdateExpenseCard;