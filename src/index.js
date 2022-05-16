import 'core-js/actual';
import 'regenerator-runtime/runtime';

import { Excel } from 'src/components/excel/excel';
import { Header } from 'src/components/header/header';
import { Toolbar } from 'src/components/toolbar/toolbar';
import { Formula } from 'src/components/formula/formula';
import { Table } from 'src/components/table/table';
import './scss/index.scss';

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table]
});

excel.render();
//excel.destroy();
