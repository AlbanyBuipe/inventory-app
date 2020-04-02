import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

import adminView from './admin/admin-view'

const { div, h1 } = hh(h)

const view = (dispatch, model) => {
    return div({ className: 'mw6 f3 center' }, [
        h1({ 
            // className: 'f1 bb bt purple shadow-5 br-100 pa2 ph3 grow' 
            className: 'f1 bb bt purple shadow-5 pa2 ph3 grow' 
            }, `A. Amo Enterprise`
        ),
        adminView(dispatch, model)
    ])
}

export default view