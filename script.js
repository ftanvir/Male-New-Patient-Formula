window.addEventListener("DOMContentLoaded", function () {
  
    // Get the form elements
    var form = document.getElementById("form");

  //add event listener for form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    calculateDoses();
  });

  
    function calculateDoses()
    {

        //calculate Dessicated Thyroide Dose
        var freeT3 = document.getElementById("freeT3").value;

        if(freeT3>=1 && freeT3<=3)
        {
            document.getElementById("desiccatedThyroidDose").innerHTML = "1 gr Orally";
        } 
        if(freeT3>3 || freeT3<1) 
        {
            document.getElementById("desiccatedThyroidDose").innerHTML = "0 gr Orally";
        }



        var flag = 0;
        //check if testorene is zero case1;
        if(isZeroTestorene1()===true) {
            flag = 1;
            let val = "0 mg pellets";
            // add val to the id="testosteroneDose"
            document.getElementById("testosteroneDose").innerHTML = val;
            
            let msg = "No Testosterone when Testosterone level is greater than 650 and the patient is not currently on Testosterone";

            // append a red color paragraph with msg to the div id= "testosteroneDoseBlock"
            let para = document.createElement("p");
            para.style.color = "white";
            para.style.fontStyle = "bold";
            para.innerHTML = msg;
            document.getElementById("testosteroneDoseBlock").appendChild(para);

        }

        //check if testorene is zero case2;
        if(isZeroTestorene2()===true) 
        {
            flag = 1;
            let val = "0 mg pellets";
            let msg = "No dose due to Prostate Cancer within 2 years.";
            document.getElementById("testosteroneDose").innerHTML = val;

            var para = document.createElement("p");
            para.style.color = "white";
            para.style.fontStyle = "bold";
            para.innerHTML = msg;
            document.getElementById("testosteroneDoseBlock").appendChild(para);
        }

        //calculate testosterone dose if its not zero;
        if(flag ===0 && document.getElementById("currentlyTestosterone").checked === true)
        {
            var result = calculateTestosteroneDose();
            let testosteroneDose = result[0];
            let testosteroneDoseFlag = result[1];

            document.getElementById("testosteroneDose").innerHTML = testosteroneDose + " mg pellets";
            // console.log(testoreneDose);

            if(testosteroneDoseFlag === 1 && testosteroneDose!=0 && testosteroneDose!=2600)
            {
                let msg = "Testosterone dose increased due to: higher Activity Level";
                // document.getElementById("testosteroneDose").innerHTML = val;

                var para = document.createElement("p");
                para.style.color = "white";
                para.style.fontStyle = "bold";
                para.innerHTML = msg;
                document.getElementById("testosteroneDoseBlock").appendChild(para);
            }

            if(testosteroneDoseFlag === 2 && testosteroneDose!=0 && testosteroneDose!=2600)
            {
                let msg = "Testosterone dose increased due to: currently taking ADD meds (Adderall, Concerta, Vyvanse, etc";
                // document.getElementById("testosteroneDose").innerHTML = val;

                var para = document.createElement("p");
                para.style.color = "white";
                para.style.fontStyle = "bold";
                para.innerHTML = msg;
                document.getElementById("testosteroneDoseBlock").appendChild(para);
            }

            if(testosteroneDoseFlag === 3 && testosteroneDose!=0 && testosteroneDose!=2600)
            {
                let msg = "Testosterone dose increased due to: chronic pain";
                // document.getElementById("testosteroneDose").innerHTML = val;

                var para = document.createElement("p");
                para.style.color = "white";
                para.style.fontStyle = "bold";
                para.innerHTML = msg;
                document.getElementById("testosteroneDoseBlock").appendChild(para);
            }

        }
        // calulateDesiccatedThyroidDose();
    }

    //calculate testosterone dose if its zero case1;
    function isZeroTestorene1()
    {
        var totalTestosterone = document.getElementById("totalTestosterone").value;
        
        if(document.getElementById("currentlyTestosterone").checked === false)
        {
            if(totalTestosterone>650) {
                return true;
            }
        }
    }

    //calculate testosterone dose if its zero case2;
    function isZeroTestorene2()
    {

        var prostateCancerFree = document.getElementById("yearsCancerFree").value;

        if(document.getElementById("prostateCancer").checked === true && prostateCancerFree === "Under")
        {
            return true;
        }

    }

    //calculate testosterone dose if its not zero;
    function calculateTestosteroneDose()
    {
        let weight = document.getElementById("patientWeight").value;
        let ActivityLevel = document.getElementById("activityLevel").value;
        let ActivityHigh = 0;
        if(ActivityLevel === "High") {
            ActivityHigh = 1;
        }
        let currentlyAdd = document.getElementById("currentlyADD").checked;
        let chronicPain = document.getElementById("chronicPain").checked;

        // console.log(weight);

        if(currentlyAdd === false && chronicPain === false && ActivityHigh === 0) {
            

            if(weight>=0 && weight<=100)
            {
                return [0,0];
            }
            if(weight>100 && weight<=140)
            {
                return [1400, 0];
            }
            if(weight>140 && weight<=160)
            {
                return [1800, 0];
            }
            if(weight>160 && weight<=190)
            {
                return [2000, 0];
            }
            if(weight>190 && weight<=200)
            {
                return [2200, 0];
            }
            if(weight>200 && weight<=225) 
            {
                return [2400, 0];
            }
            if(weight>225) 
            {
                return [2600, 0];
            }

        }

        //if activity level is high
        if(ActivityHigh===1) 
        {
            if(weight>=0 && weight<=100)
            {
                return [0,0];
            }
            if(weight>100 && weight<=140)
            {
                return [1800, 1];
            }
            if(weight>140 && weight<=160)
            {
                return [2000, 1];
            }
            if(weight>160 && weight<=190)
            {
                return [2200, 1];
            }
            if(weight>190 && weight<=200)
            {
                return [2400, 1];
            }
            if(weight>200 && weight<=225) 
            {
                return [2600, 1];
            }
            if(weight>225) 
            {
                return [2600, 0];
            }
        }

        //if taking ADD meds
        if(currentlyAdd === true)
        {
            if(weight>=0 && weight<=100)
            {
                return [0,0];
            }
            if(weight>100 && weight<=140)
            {
                return [1600, 2];
            }
            if(weight>140 && weight<=160)
            {
                return [2000, 2];
            }
            if(weight>160 && weight<=190)
            {
                return [2200, 2];
            }
            if(weight>190 && weight<=200)
            {
                return [2400, 2];
            }
            if(weight>200 && weight<=225) 
            {
                return [2600, 2];
            }
            if(weight>225) 
            {
                return [2600, 2];
            }
        }

        //if chronic pain patient
        if(chronicPain === true)
        {
            if(weight>=0 && weight<=100)
            {
                return [0,0];
            }
            if(weight>100 && weight<=140)
            {
                return [1600, 3];
            }
            if(weight>140 && weight<=160)
            {
                return [2000, 3];
            }
            if(weight>160 && weight<=190)
            {
                return [2200, 3];
            }
            if(weight>190 && weight<=200)
            {
                return [2400, 3];
            }
            if(weight>200 && weight<=225) 
            {
                return [2600, 3];
            }
            if(weight>225) 
            {
                return [2600, 0];
            }
        }


    }

    
    


    
});