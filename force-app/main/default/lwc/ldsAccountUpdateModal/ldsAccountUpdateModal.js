import { api } from 'lwc';
import LightningModal from 'lightning/modal';


export default class LdsAccountUpdateModal extends LightningModal {

    @api recordId;

    handleupdated(){
        this.close('updated');
    }

    handleclose(){
        this.close('cancel');
    }

}