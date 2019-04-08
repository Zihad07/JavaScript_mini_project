

const github = new Github();
const ui = new UI();

// search input

const searchUser = document.getElementById('searchUser');

// search input evet listener 

searchUser.addEventListener('keyup', (e)=> {
    // get text input
    const userText = e.target.value;

    if(userText !== ''){
        // console.log(userText);
        github.getUser(userText)
            .then((data)=>{
               
                if(data.profile.message === "Not Found"){
                    // show alert
                }
                else {
                    // show profile
                    //  console.log(data.profile);
                    ui.showProfile(data.profile);
                }
            })
    }
    else {
        // Clear text filed
    }
});