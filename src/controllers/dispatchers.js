import { MSGS } from './constants'

export const showFormMsg = showForm => {
    return {
        type: MSGS.SHOW_FORM,
        showForm,
    }
}

export const kindInputMsg = cropKind => {
    return {
        type: MSGS.CROP_KIND_INPUT,
        cropKind,
    }
}

export const quantityInputMsg = cropQuantity => {
    return {
        type: MSGS.CROP_QUANTITY_INPUT,
        cropQuantity,
    }
}

export const unitPriceInputMsg = unitPrice => {
    return {
        type: MSGS.UNIT_PRICE_INPUT,
        unitPrice,
    }
}

export const saveCropRecordMsg = { type: MSGS.SAVE_CROP_RECORD }

export const deleteCropRecordMsg = id => {
    return {
        type: MSGS.DELETE_CROP_RECORD,
        id,
    }
}

export const editCropRecordMsg = editId => {
    console.log('Edit clicked')
    return {
        type: MSGS.EDIT_CROP_RECORD,
        editId,
    }
}