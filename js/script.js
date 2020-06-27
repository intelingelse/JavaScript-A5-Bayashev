if(window.localStorage.length > 0){
    //if local storage has values then do nothing
}
else {
    //Create and declare localStorage keys & values.
    //Web page will remember the last values passed to it even
    //if the user closes tab or browser.
    localStorage.setItem('text1', "var1")
    localStorage.setItem('text2', "var2");
    localStorage.setItem('text3', "var3");
    localStorage.setItem('text4', "var4");
    localStorage.setItem('text5', "var5");
    localStorage.setItem('text6', "var6");
    localStorage.setItem('text7', "speach");
}

const form = $(".form");
const ryaba_api = 'https://api.jsonbin.io/b/5e905926172eb643896166e7';

form.hide();

    $("#start-button").click(function(){
        //setting form placeholders for current values
        
        setPlaceholders();

        form.show();

        console.log("first button: SUCCESS");
        // document.getElementById("start-button").classList.add("invisible");
        $("#start-button").hide();

        $("#show-modal").click(function(){
            console.log("second button: SUCCESS");
    
            
            //assigning input values to localStorage
            
            for(let i = 1; i<8; i++){
                //assign new values for local storage if passed input values are not empty strings
                if($("#text"+i).val() !== ""){
                    localStorage.setItem("text"+i, $("#text"+i).val());
                }   
            }

            setPlaceholders();

            //loading JSON

            $.getJSON(ryaba_api, function (data){
                
                //formatting json text
                
                let changedText;

                for(let i = 0; i < data.text.length; i++){

                    if(i === 0){
                        changedText = data.text[i] + ". ";
                    }

                    else if (i!== 5 && i!== 6){
                        changedText += data.text[i] + ". ";
                    }
                    else{
                        changedText = changedText + data.text[i] + " ";
                    }
                }

                changedText = changedText.replace(/{var1}/g, localStorage.text1).replace(/{var2}/g, localStorage.text2)
                .replace(/{var3}/g, localStorage.text3).replace(/{var4}/g, localStorage.text4)
                .replace(/{var5}/g, localStorage.text5).replace(/{var6}/g, localStorage.text6).replace("{speach}", localStorage.text7);

                
                displayModal(changedText);
                $(".loading").hide();
                $(".modal-text").show();

            });




            // function that displays modal window with changed text
            function displayModal(finalizedText){
                const $resultText = $(".modal-text");
                $resultText.html(finalizedText);
            }
            
        });

        function setPlaceholders(){
            for(let i = 1; i<8; i++){
                $("#text"+i).attr("placeholder",
                localStorage.getItem("text"+i) === "var"+i || localStorage.getItem("text"+i) === "" || localStorage.getItem("text"+i) === "speach" ?
                "текущее значение: пусто" :
                "текущее значение: "+localStorage.getItem("text"+i)
                );
            }
        }

        //clear local storage variables

        $("#clear-local-storage").click(function(){
            localStorage.clear();
            location.reload();
        });         

    });


