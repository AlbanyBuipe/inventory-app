import hh from 'hyperscript-helpers'
import {
    h
} from 'virtual-dom'
import formView from './form'
import tableView from './table'

const {
    pre,
    div
} = hh(h)

const adminView = (dispatch, model) => {
    return div({className: '' }, [
        formView(dispatch, model),
        tableView(dispatch, model),
        // pre({
        //         className: 'shadow-5 grow white pa4 bb bt br bl stripe-dark br-100 bn'
        //     },
        //     JSON.stringify(model, null, 2)
        // )
    ])
}

export default adminView