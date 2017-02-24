import * as React from 'react';

interface ResponseData{
    data:Array<any>
    keysOfData:string[]
    lastUpdated:Date
}
interface CollpasedValue{
    value:any
    count:number
}

interface GenericTableProps{
    dataUrl:string
}

export class GenericTable extends React.Component<GenericTableProps,ResponseData>{
    
    constructor(props:GenericTableProps) {
        super(props);
        this.state = {
            data:[],
            keysOfData:[],
            lastUpdated:undefined
        };
        this._fetchData();
    }

    private _fetchData(){
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = this._loadTable.bind(this,ajax);
        ajax.open('GET', this.props.dataUrl);
        ajax.send();
    }    
    private _loadTable(ajax:XMLHttpRequest){
        if(ajax.readyState !== XMLHttpRequest.DONE || ajax.status !== 200) return;
        const response = JSON.parse(ajax.responseText) as ResponseData;
        response.lastUpdated = new Date(response.lastUpdated);
        response.keysOfData = Object.keys(response.data[0]);
        this.setState(response);
    }

    private _createRow<T, K extends keyof T>(headers:K[], object:T, id:number){
        const collapsedValues = this._collapseValues(headers,object);
        return (<tr key={id}>
            {collapsedValues.map(v => <td key={v.value} {...this._colspanAttrs(v.count)}>{v.value}</td>)}
        </tr>);
    }

    private _colspanAttrs(count:number){
        return count > 1 ? {colSpan:count}  : {};
    }

    private _collapseValues<T, K extends keyof T>(keys:K[],object:T){
        const collapsesValues:CollpasedValue[] = [];
        for(let i = 0; i < keys.length;){
            const value = object[keys[i]];
            let count = 1;
            while(value === object[keys[++i]]){
                count++;
            }
            collapsesValues.push({value,count});
        }
        return collapsesValues;
    }

    private _formatDate(dt:Date){
        return dt ? dt.toLocaleDateString() : 'N/A';
    }

    render(){
        return (<table className="table table-striped table-bordered">
            <thead>
                <tr>
                    {this.state.keysOfData.map(key => <th key={key}>{key}</th>)}
                </tr>
            </thead>
            <tbody>
                {this.state.data.map((obj,i) => this._createRow(this.state.keysOfData,obj,i))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={1000} className="small">Last updated: {this._formatDate(this.state.lastUpdated)}</td>
                </tr>
            </tfoot>
        </table>);
    }
}