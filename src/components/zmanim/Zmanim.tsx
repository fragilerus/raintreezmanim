import * as React from 'react';
import {GenericTable} from '../genericTable/GenericTable';

export class Zmanim extends React.Component<{},{}>{
    
    constructor(props:{}) {
        super(props);
    }

    render(){
        return (<div>
            <h2 className="text-center">Zmanei Tefilah In Raintree & Nearby Areas</h2>,
            <GenericTable dataUrl="https://script.google.com/macros/s/AKfycbzxKV-iDLr8oOYtnRPcUSeGTFIDf-tbf83Qx9XJpJLQSaLTtZ8/exec"></GenericTable>
        </div>);
    }
}