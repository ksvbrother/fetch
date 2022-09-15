import React from 'react'
import { Field, reduxForm, formValueSelector, formValues } from 'redux-form';
import { connect } from 'react-redux';

import '../../index.css'

///////////-----validation------////////


export const SelectField = ({
    input,
    label,
    meta: { touched, error },
    children
}) => (
    <div className="field">
        <label className="label">{label}</label>
        <div className="control">
            {/* <div className={
                'select ' + (touched ? (error ? 'is-danger' : 'is-success') : '')
            }> */}
            <select {...input} >
                {children}
            </select>
            {touched && (error && <p>{error}</p>)}
        </div>
    </div>
    // </div >
);
const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />

            {touched && ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)


const normalizePhone = value => {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 3) {
        return onlyNums
    }
    if (onlyNums.length <= 7) {
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
        6,
        10
    )}`
}
const renderNumber = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)
const validate = values => {
    const errors = {}
    if (!values.hasUser) {
        errors.hasUser = 'Required'
    } else if (values.hasUser.length > 15) {
        errors.hasUser = 'Must be 10 characters or less'
    }
    if (!values.hasEmail) {
        errors.hasEmail = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.hasEmail)) {
        errors.hasEmail = 'Invalid email address'
    }
    if (!values.hasPhone) {
        errors.hasPhone = 'Required'
    }
    else if (!/^(0|[1-9][0-9]{9})$/i.test(values.hasPhone)) {
        errors.hasPhone = 'Must Enter 10 number Only'
    }

    if (!values.favoriteColor) {
        errors.favoriteColor = 'Required'
    }



    return errors
}



export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

///////////////////////////////////////

let SelectingFormValuesForm = props => {
    const {
        handleSubmit,
        pristine,
        reset, submitting } = props;
    return (
        <div className='form'>
            <div className='form_box'>
                <form onSubmit={handleSubmit}>
                    <div className='field'>
                        <Field name="hasUser" type="text"
                            component={renderField} label="Username" />
                    </div>
                    <div className='field'>
                        <Field
                            name="hasEmail"
                            type="email"
                            label="Email"
                            component={renderField}
                        />
                    </div>
                    <div className='field'>
                        <Field
                            name="hasPhone"
                            type="number"
                            label="Mobile Number"

                            component={renderNumber}
                            validate={[number]}
                        />
                    </div>
                    <div className='field'>
                        <label>Favorite Color</label>
                        <Field name="favoriteColor" component={SelectField}>
                            <option className='option'>--Select-Color--</option>
                            <option value="ff0000">Red</option>
                            <option value="00ff00">Green</option>
                            <option value="0000ff">Blue</option>
                        </Field>
                    </div>
                    <div className='button_group'>
                        <button type="submit" disabled={submitting} >
                            Submit
                        </button>

                        <button type="button" disabled={pristine || submitting} onClick={reset}>
                            Clear Values
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
SelectingFormValuesForm = reduxForm({
    form: 'selectingFormValues',
    validate,
})(SelectingFormValuesForm);

const selector = formValueSelector('selectingFormValues'); // <-- same as form name
SelectingFormValuesForm = connect(state => {
    const hasUserNameValue = selector(state, 'hasUser');
    const hasEmailValue = selector(state, 'hasEmail');
    const favoriteColorValue = selector(state, 'favoriteColor');
    const hasPhoneValue = selector(state, 'hasPhone');
    return {
        hasUserNameValue,
        hasEmailValue,
        favoriteColorValue,
        hasPhoneValue,
    };
})(SelectingFormValuesForm);


console.log(SelectingFormValuesForm)

// // console.log(itemlist);
// const itemlist = formValues(props => ({ name: props.SelectingFormValuesForm }))(formValueSelector)
export default SelectingFormValuesForm;

//////////////////////////////