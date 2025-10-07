import { LightningElement } from 'lwc';

export default class RenderListFilerComp extends LightningElement {

    level = 'All';
    query='';
    options = [
        {label:'All',value: 'All'},
        {label:'Beginner',value: 'Beginner'},
        {label:'Intermediate',value: 'Intermediate'},
        {label:'Advanced',value: 'Advanced'},
    ];

    courses = [
        { id: 'c-1', name: 'Salesforce Fundamentals', level: 'Beginner', duration: 4 },
        { id: 'c-2', name: 'Apex Basics',            level: 'Beginner', duration: 6 },
        { id: 'c-3', name: 'Lightning Web Components', level: 'Intermediate', duration: 8 },
        { id: 'c-4', name: 'Aura Components', level: 'Intermediate', duration: 8 },
        { id: 'c-5', name: 'Integration (REST & Named Credentials)', level: 'Advanced', duration: 6 }
    ];

    get filteredresults(){
        const q = (this.query || '').trim().toLowerCase();
        
        return this.courses.filter(c => {
            const matcheslevel = this.level === 'All' || c.level === this.level;
            const matchesquery = c.name.toLowerCase().includes(q);
            return matcheslevel && matchesquery;
        });

       /* const sum = function(a,b){
            return a + b;
        }

        const add = (a,b) => {
            return a+b;
        }

        
        return this.courses.filter(function (c) {
            const matcheslevel = this.level === 'All' || c.level === this.level;
            const matchesquery = c.name.toLowerCase().includes(q);
            return matcheslevel && matchesquery;
        });

                const q1 = '';
        if(this.query == ''){
            q1 = blank;
        }
        else 
            q1 = this.query;

        q1.trim();
        q1.toLowerCase(); */

    }

    get totalcount(){
        return this.courses.length;
    }
    
    get filteredcount(){
        return this.filteredresults.length;
    }

    handleChange(e){
        this.level = e.target.value;
    }

    handlequerychange(e){
        this.query = e.target.value;
    }

    clearquery(e){
        this.level = 'All';
        this.query = '';
    }
}