import app from './App'
import view from './views/View'
import model from './models/Model'
import update from './controllers/Update'

const node = document.getElementById('app')

app(model, update, view, node)