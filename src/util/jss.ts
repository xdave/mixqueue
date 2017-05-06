import { create as createJss } from 'jss';
import { SheetDef, create as createInjectSheet } from 'react-jss';
import nested from 'jss-nested';
import camelCase from 'jss-camel-case';
import vendorPrefixer from 'jss-vendor-prefixer';

const jss = createJss();
jss.use(nested());
jss.use(camelCase());
jss.use(vendorPrefixer());

export default createInjectSheet(jss);
