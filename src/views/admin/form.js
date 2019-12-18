import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

import {
    showFormMsg,
    kindInputMsg,
    quantityInputMsg,
    unitPriceInputMsg,
    saveCropRecordMsg,
} from '../../controllers/dispatchers'

const {
    div,
    button,
    form,
    label,
    input,
} = hh(h)


const fieldSet = (labelText, value, oninput) => {
    return div({
        className: 'mb3'
    }, [
        label({
            className: 'purple db mb1'
        }, labelText),
        input({
            className: 'shadow-5 pa2 br2 ba b--blue bg-light-yellow w-100',
            value,
            oninput
        })
    ])
}

const formControls = dispatch => {
    return div({
        className: ''
    }, [
        button({
            className: 'shadow-5 pv2 ph3 mr2 br2 bn dim pointer white bg-purple',
            type: 'submit'
        }, 'Save'),
        button({
            className: 'shadow-5 pv2 ph3 br2 bn dim pointer white bg-gray',
            type: 'button',
            onclick: () => dispatch(showFormMsg(false))
        }, 'Cancel'),
    ])
}

const formView = (dispatch, model) => {
    const {
        showForm
    } = model
    if (showForm) {
        return form({
            className: '',
            onsubmit: e => {
                e.preventDefault()
                dispatch(saveCropRecordMsg)
                dispatch(showFormMsg(false))
            }
        }, [
            fieldSet('Crop Kind (Name)', model.cropKind, e => dispatch(kindInputMsg(e.target.value))),
            fieldSet('Crop Quantity (Bags)', model.cropQuantity || '', e => dispatch(quantityInputMsg(e.target.value))),
            fieldSet('Unit Price per Crop (GHS)', model.unitPrice || '', e => dispatch(unitPriceInputMsg(e.target.value))),
            formControls(dispatch)
        ])
    }

    return button({
        className: 'center pv2 ph3 br2 code bn white bg-purple shadow-5 dim pointer',
        onclick: () => dispatch(showFormMsg(true))
    }, 'New Crops')
}

export default formView