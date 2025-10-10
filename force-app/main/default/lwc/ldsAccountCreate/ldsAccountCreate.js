import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';




export default class LdsAccountCreate extends LightningElement {

name='';
site='';
active='';
ar='';

onname = (e) => (this.name = e.target.value?.trim());
onsite = (e) => (this.site = e.target.value?.trim());
onactive = (e) => (this.active = e.target.value?.trim());
onar = (e) => (this.ar = e.target.value?.trim());

/*onname(e){
    this.Name = this.name = e.target.value?.trim();
}*/

async createrec(){
    const createrecInput = {
        apiName : 'Account',
        fields: {
            Name: this.name,
            Active__c: this.active,
            Site: this.site,
            AnnualRevenue: this.ar
        }

    };

    const res = await createRecord(createrecInput);
    this.dispatchEvent(new ShowToastEvent({
        title:'Account Created',
        message: 'Account has been created ${this.name}',
        variant: 'success'
    })
)

}

}