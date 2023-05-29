import { createStoreon } from 'storeon'

import { algorithms } from './algorithms'
import { datasets } from './datasets'
import { modal } from './modal'
export const store = createStoreon([algorithms, datasets, modal])