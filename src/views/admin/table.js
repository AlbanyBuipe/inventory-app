import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import * as R from 'ramda'

import {
    deleteCropRecordMsg,
    editCropRecordMsg,
} from '../../controllers/dispatchers'

const {
    div,
    td,
    th,
    tr,
    thead,
    tbody,
    i,
} = hh(h)

const cell = (tag, className, content) => {
    return tag({ className }, content)
}

const row = (dispatch, className, crop) => {
    return tr({ className }, [
        cell(td, 'shadow-5 pa2 tl pink br4', crop.cropKind),
        cell(td, 'shadow-5 pa2 tr pink br4', crop.cropQuantity),
        cell(td, 'shadow-5 pa2 tr pink br4', crop.unitPrice),
        cell(td, 'shadow-5 pa2 tr br4', [
            i({
                className: 'ph1 fa fa-trash-o red dim pointer',
                onclick: () => dispatch(deleteCropRecordMsg(crop.id))
            }),
            i({
                className: 'ph1 fa fa-pencil-square-o dim pointer',
                onclick: () => dispatch(editCropRecordMsg(crop.id))
            })
        ]),
    ])
}

const quantityTotalRow = crops => {
    const total = R.pipe(
        R.map(crop => crop.cropQuantity),
        R.sum,
    )(crops)
    return tr({ className: 'bt b' }, [
        cell(td, 'pa2 tr f4 purple', 'Quantity Total:'),
        cell(td, 'pa2 tr f4 purple', total),
        cell(td, '', '')
    ])
}

const priceTotalRow = crops => {
    const totalPrice = R.pipe(
        R.map(crop => crop.cropQuantity * crop.unitPrice),
        R.sum,
    )(crops)
    return tr({ className: 'bt b' }, [
        cell(td, 'pa2 tr f4 purple', 'Price Total (GHS):'),
        cell(td, 'pa2 tr f4 purple', `${totalPrice.toFixed(2)}`),
        cell(td, '', '')
    ])
}

const body = (dispatch, className, crops) => {
    const rows = R.map(
        R.partial(row, [dispatch, 'stripe-dark']),
        crops
    )

    const plusTotalRow = [...rows, quantityTotalRow(crops), priceTotalRow(crops)]

    return tbody({ className }, plusTotalRow)
}

const tableHeader = thead({ className: 'white' }, [
    cell(th, 'pa2 tl', 'Crop'),
    cell(th, 'pa2 tr', 'Quantity'),
    cell(th, 'pa2 tr', 'Unit Price'),
    cell(th, 'pa2 tr', '')
])

const tableView = (dispatch, model) => {
    const { crops } = model
    if (crops.length === 0) {
        return div({ className: 'gray pt3 i f2' }, 'No crops in store house...')
    }
    return div({ className: 'mt3' }, [
        tableHeader,
        body(dispatch, '', model.crops)
    ])
}

export default tableView