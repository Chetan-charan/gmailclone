
var mail;
var token;
        


async function getProfile(ml,tk){

    //function to list all the mails in the inbox of the user
    console.log("hello from get profile")
    mail = ml;
    token = tk;
    const data = await fetch('https://gmail.googleapis.com/gmail/v1/users/'+mail+'/messages'+'?access_token='+token);
    const data1 = await data.json();
    let array_Id = []
    for(var key in data1){
     
        if(key=='messages'){
            let arr = data1[key];
            for(var i=0;i<arr.length;i++){
                let value = arr[i];
                for(var l in value){
                    if(l=='id'){
                        array_Id.push(value[l]);   //collecting all the ids of the mails
                    }
                }
            }
        }
    }
    let mails = document.querySelector('.mail');
    mails.innerHTML = '';
    for(var i=0;i<array_Id.length;i++){

        const data = await fetch('https://gmail.googleapis.com/gmail/v1/users/'+mail+'/messages/'+array_Id[i]+'?access_token='+token);
        const data1 = await data.json();
        //to display the mail corresponding to each id.
        for(var key in data1){
         if(key=='snippet'){
            console.log(data1[key])
            mails.innerHTML+=`<div class='inner-mail'><div>${data1[key].slice(0,100)}</div></div>`
           }
        }
    }


   
}


function getUserData(x,y){
    console.log(x,y);
    mail = x;
    token = y;
    //to display the initial page
    document.body.innerHTML = `<div class='main'>
        <div class='left'>
        <button type="button" class="block">Compose</button>
        <button type="button" class="block" onclick='getProfile()'>Inbox</button>
        <button type="button" class="block">Sent</button>
        <button type="button" class="block" onclick='displayDrafts()'>Drafts</button>
        </div>
        <div class='right'>
        <div class='mail'></div>
        </div>
        </div>`


}


async function getDrafts(){
    //to display all the drafts
    const data = await fetch('https://gmail.googleapis.com/gmail/v1/users/'+mail+'/drafts?access_token='+token);
    
    const data1 = await data.json();

    console.log('testing drafts...');
    let Draft_Ids = [];
    for(var key in data1){
       if(key=='drafts'){
           let items = data1[key];
            for(let i=0;i<items.length;i++){
                 Draft_Ids.push(items[i].id);   //storing all the draft ids
                
            }
       }
    }
let all_messages = []
    console.log(Draft_Ids);
    for(var i=0;i<Draft_Ids.length;i++){
        const data = await fetch("https://gmail.googleapis.com/gmail/v1/users/chetanharicharan@gmail.com/drafts/"+Draft_Ids[i]+"?access_token="+token);
    
        const data1 = await data.json();
        for(var key in data1){
            if(key == 'message'){
                let finalData = data1[key];
                for(var key1 in finalData){
                        
                        
                        if(key1 == 'snippet'){
                            all_messages.push(finalData[key1]);   
                        }
                        
                  
                }
            }
        }
    }
    //displaying all the messages corresponding to the drafts
    let mails = document.querySelector('.mail');
    mails.innerHTML = ``;
    for(let i=0;i<all_messages.length;i++){
        mails.innerHTML+=`<div class='inner-mail'><div class='draft'><span>Draft</span></div><span class='no-subject'></span><div>${all_messages[i].slice(0,100)}</div></div>`
    }



}

function displayDrafts()
{
    getDrafts();
}







