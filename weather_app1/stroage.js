
class Storage {
    
    constructor(){
        this.city;
        this.stae;
        this.defaultCity = 'Tampa';
        this.defaultState = 'FL';
    }

    getLocationData(){

        if(localStorage.getItem('city')=== null){
            this.city = this.defaultCity;
        }else{
            this.city = localStorage.getItem('city');
        }

        if(localStorage.getItem('state') === null){
            this.state = this.defaultCity;
        }else{
            this.state = localStorage.getItem('state');
        }

        // Return a object
        return {
            city : this.city,
            state : this.state
        }
    }

    setLocationData(city, state){
        localStorage.setItem('city', city);
        localStorage.setItem('state', state);

        document.getElementById('city').value = '';
        document.getElementById('state').value = '';
    }

}