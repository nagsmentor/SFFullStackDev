import { LightningElement, track } from 'lwc';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';
import searchAccountPages from '@salesforce/apex/AccountSearchPageController.searchAccountPages';
import updateAccount from '@salesforce/apex/AccountSearchPageController.updateAccount';

export default class ServerSearchEditPagesDatatable extends LightningElement {
    @track account = [];
    @track error;
    draftValues = [];
    searchTerm = '';
    pageSize = 5;
    pageSizeOptions = [
        {label: '5', value:5},
        {label: '10', value:10},
        {label: '15', value:15},
        {label: '50', value:50}
    ];
    isLoading = false;
    rangeStart;
    rangeEnd;
    totalItems = 0;

    columns = [
        {label:'Name', fieldName:'Name', type:'text',editable:true},
        {label:'Site', fieldName:'Site', type:'text',editable:true},
        {label:'Active', fieldName:'Active__c', type:'text',editable:true},
        {label:'AnnualRevenue', fieldName:'AnnualRevenue', type:'text',editable:true},
    ];

    connectedCallback(){
        this.fetchPage();
    }

    handleSearchChange(event) {
        this.searchTerm = event.target.value || '';
        window.clearTimeout(this.debounceTimer);
        this.debounceTimer = window.setTimeout(() => {
        this.pageNumber = 1; // reset to first page on new search
        this.fetchPage();
        }, 350);
    }

    handlePageSizeChange(event) {
        const newSize = Number(event.detail.value);
        if (!newSize || newSize === this.pageSize) return;
        this.pageSize = newSize;
        this.pageNumber = 1; // reset to first page when size changes
        this.fetchPage();
    }

    async handleSave(event) {
        const updates = event.detail?.draftValues || [];
        if (!updates.length) return;

        this.isLoading = true;
        try {
        await updateAccount({ acc: updates });
            console.log(JSON.stringify(updates));
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success',
            message: 'Record(s) updated.',
            variant: 'success'
        }));

        // clear drafts
        this.draftValues = [];
        const dt = this.template.querySelector('lightning-datatable');
        if (dt) dt.draftValues = [];

        // re-fetch current page with current server filter
        await this.fetchPage();
        } catch (e) {
        const msg = (e && e.body && e.body.message) ? e.body.message : 'Update failed';
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error updating records',
            message: msg,
            variant: 'error',
            mode: 'sticky'
        }));
        } finally {
        this.isLoading = false;
        }
    }

    get totalPages() {
        return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
    }
    get isFirstPage() {
        return this.pageNumber <= 1;
    }
    get isLastPage() {
        return this.pageNumber >= this.totalPages;
    }
    get rangeStart() {
        if (this.totalItems === 0) return 0;
        return (this.pageNumber - 1) * this.pageSize + 1;
    }
    get rangeEnd() {
        return Math.min(this.pageNumber * this.pageSize, this.totalItems);
    }

    goFirst = () => { if (!this.isFirstPage) { this.pageNumber = 1; this.fetchPage(); } };
    goPrev  = () => { if (!this.isFirstPage) { this.pageNumber -= 1; this.fetchPage(); } };
    goNext  = () => { if (!this.isLastPage)  { this.pageNumber += 1; this.fetchPage(); } };
    goLast  = () => { if (!this.isLastPage)  { this.pageNumber = this.totalPages; this.fetchPage(); } };

    async fetchPage() {
    this.isLoading = true;
    this.error = undefined;
    try {
      const res = await searchAccountPages({
        searchTerm: this.searchTerm,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      });

      this.accounts = res?.records || [];
      this.totalItems = res?.total || 0;
      // Keep pageNumber safe if the underlying count shrank
      const  maxPage= Math.max(1, Math.ceil(this.totalItems / this.pageSize)); //for 34 recs it will return 6.8 ==> 7
      if (this.pageNumber > maxPage) {
        this.pageNumber = maxPage;
      }
    } catch (e) {
      this.error = (e && e.body && e.body.message) ? e.body.message : 'Error loading data';
      this.accounts = [];
      this.totalItems = 0;
    } finally {
      this.isLoading = false;
    }
  }

}