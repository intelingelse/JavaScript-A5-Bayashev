
// HTML code for form
//each input has a placeholder value of a previous change occurance
//each input has a default value of previous change occurance. This made so that if user doesn't pass the values for some
// of the form field it just remains the same.



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




const form =`
    <div class="input-group mb-3">
    <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">Дед</span>
    </div>
    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="text1" value="${localStorage.text1}" placeholder="Текущее значение: ${localStorage.text1}">
    </div>

    <div class="input-group mb-3">
    <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Баба</span>
    </div>
    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="text2" value="${localStorage.text2}" placeholder="Текущее значение: ${localStorage.text2}">
    </div>

    <div class="input-group mb-3">
    <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">Курочка Ряба</span>
    </div>
    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="text3" value="${localStorage.text3}" placeholder="Текущее значение: ${localStorage.text3}">
    </div>

    <div class="input-group mb-3">
    <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">яичко</span>
    </div>
    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="text4" value="${localStorage.text4}" placeholder="Текущее значение: ${localStorage.text4}">
    </div>

    <div class="input-group mb-3">
    <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">мышка</span>
    </div>
    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="text5" value="${localStorage.text5}" placeholder="Текущее значение: ${localStorage.text5}">
    </div>

    <div class="input-group mb-3">
    <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">хвостиком</span>
    </div>
    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="text6" value="${localStorage.text6}" placeholder="Текущее значение: ${localStorage.text6}">
    </div>

    <div class="input-group mb-3">
    <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">реплика в конце</span>
    </div>
    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="text7" value="${localStorage.text7}" placeholder="Текущее значение: ${localStorage.text7}">
    </div>
    <div class="main-buttons">
    <button type="button" class="btn btn-dark main" id="show-modal" data-toggle="modal" data-target="#my-modal">показать получившийся текст</button>
    <button type="button" class="btn btn-dark main" id="clear-local-storage">очистить локальное хранилище</button>
    </div>
    `;



    
    $("#start-button").click(function(){

        console.log("first button: SUCCESS");

        const $resultForm = $(".result-form");
        $resultForm.html(form);
        document.getElementById("start-button").classList.add("invisible");

        $("#show-modal").click(function(){
            console.log("second button: SUCCESS");
    
    
            //assigning input values to localStorage
    
            localStorage.text1 = $("#text1").val();
            localStorage.text2 = $("#text2").val();
            localStorage.text3 = $("#text3").val();
            localStorage.text4 = $("#text4").val();
            localStorage.text5 = $("#text5").val();
            localStorage.text6 = $("#text6").val();
            localStorage.text7 = $("#text7").val();
    
            
    
            //loading JSON

    
            $.getJSON('https://api.jsonbin.io/b/5e905926172eb643896166e7',
            function (data){
                
                //trying to add dots to the end of the sentences
                
                let changedText;
                let counter;

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


            //displaying modal window with changed text
            function displayModal(finalizedText){
                const $resultText = $(".modal-text");
                $resultText.html(finalizedText);
            }  
        });
        $("#clear-local-storage").click(function(){
            localStorage.clear();
            location.reload();
        });         

    });


