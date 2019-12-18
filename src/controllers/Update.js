import * as R from 'ramda'
import { MSGS } from './constants'

const addCrop = model => {
    const { nextId, cropKind, cropQuantity, unitPrice } = model
    const crop = {
        id: nextId,
        cropKind,
        cropQuantity,
        unitPrice
    }

    const crops = [ ...model.crops, crop ]

    return {
        ...model,
        crops,
        cropKind: '',
        cropQuantity: 0,
        unitPrice: 0,
        nextId: nextId + 1,
    }
}

const editCrop = model => {
    const { cropKind, cropQuantity, unitPrice, editId } = model
    const crops = R.map( crop => {
        if (crop.id === editId) {
            return {...crop, cropKind, cropQuantity, unitPrice}
        }
        return crop
    }, model.crops)

    return {
        ...model,
        crops,
        cropKind: '',
        cropQuantity: 0,
        unitPrice: 0,
        showForm: false,
        editId: null,
    }
}

const update = (msg, model) => {
    switch (msg.type) {
        case MSGS.SHOW_FORM: {
            const { showForm } = msg
            return {
                ...model,
                showForm,
            }
        }

        case MSGS.CROP_KIND_INPUT: {
            const { cropKind } = msg
            return { ...model, cropKind }
        }

        case MSGS.CROP_QUANTITY_INPUT: {
            const cropQuantity = R.pipe(
                parseInt,
                R.defaultTo(0)
            )(msg.cropQuantity)
            return { ...model, cropQuantity }
        }

        case MSGS.UNIT_PRICE_INPUT: {
            const unitPrice = R.pipe(
                parseInt,
                R.defaultTo(0)
            )(msg.unitPrice)
            return { ...model, unitPrice }
        }

        case MSGS.SAVE_CROP_RECORD: {

            const { editId } = model
            const updatedModel = editId !== null ?
                editCrop(model) :
                addCrop(model)

            return updatedModel
        }

        case MSGS.DELETE_CROP_RECORD: {
            const { id } = msg
            const crops = model.crops.filter( crop => crop.id !== id)
            return {
                ...model,
                crops,
            }
        }

        case MSGS.EDIT_CROP_RECORD: {
            const { editId } = msg
            const crop = R.find(
                crop => crop.id === editId,
                model.crops
            )

            const { cropKind, cropQuantity, unitPrice } = crop

            return {
                ...model,
                editId,
                cropKind,
                cropQuantity,
                showForm: true,
            }
        }

    }
    return model
}

export default update