import { createStoreon } from 'storeon'

import { algorithms } from './algorithms'
import { datasets } from './datasets'

export const store = createStoreon([algorithms, datasets])