var app = new (function () {
    this.fruits = [];
    this.updateindex = 0;
    this.getFruits = function () {
      fetch("https://localhost:5001/api/Fruits")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          this.fruits = data;
          console.log(this.fruits);
          var html = "<table border='1|1'>";
          html += "<tr>";
          html += "<td>" + "ID" + "</td>";
          html += "<td>" + "Name" + "</td>";
          html += "<td>" + "Action" + "</td>";
          html += "</tr>";
          for (var i = 0; i < this.fruits.length; i++) {
            //   alert(this.fruits[i].id);
            html += "<tr>";
            html += "<td>" + this.fruits[i].id + "</td>";
            html += "<td>" + this.fruits[i].name + "</td>";
            html +=
              '<td><button onclick="app.edit(' + i + ')">Edit</button></td>';
            html +=
              '<td><button onclick="app.delete(' + i + ')">Delete</button></td>';
            html += "</tr>";
          }
          html += "</table>";
          document.getElementById("box").innerHTML = html;
        });
    };
    this.saveorUpdate = function () {
      ((document.getElementById("myBtn").innerHTML == "Save") ?  this.save():this.update());
    }
    this.save = function () {
      document.getElementById("fname").value;
      alert(document.getElementById("fname").value);
      fetch("https://localhost:5001/api/Fruits", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //make sure to serialize your JSON body
        body: JSON.stringify({
          // id: 0,
          name: document.getElementById("fname").value
        }),
      }).then((response) => {
        //do something awesome that makes the world a better place
      });
      //   call PowerAutomate
      //this.callPowerAutomate();
    };
    this.edit = function (i) {
      alert("edit called " +i);
      document.getElementById("myBtn").innerHTML = "Update";
      document.getElementById("fname").value = this.fruits[i].name;
      this.updateindex = this.fruits[i].id;
        
      
    };
    this.update = function () {
      alert("update called " + this.updateindex);
      alert(JSON.stringify({
          id: this.updateindex,
          name: document.getElementById("fname").value
      }));
      // PUT to the resource with id = 5 to change the name of task
  fetch('https://localhost:5001/api/Fruits/'+this.updateindex, {
      method: 'PUT',
      body: JSON.stringify({
          id: this.updateindex,
          name: document.getElementById("fname").value
      }),
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      }
      })
      .then(response => response.json())
      .then(json => console.log(json))
      this.updateindex=0;
      document.getElementById("fname").value = "";
      document.getElementById("myBtn").innerHTML = "Save";
      this.getFruits();
    };
  this.delete=function(i){
    
    this.updateindex = this.fruits[i].id;
    alert("delete called " +this.updateindex);
    fetch('https://localhost:5001/api/Fruits/'+this.updateindex, {
    // fetch(`${uri}/${id}`, {
      method: 'DELETE'
    })
    .then(() => this.getFruits())
    .catch(error => console.error('Unable to delete item.', error));
    this.updateindex=0;
  }
    this.callPowerAutomate = function () {
      fetch(
        "https://prod-22.southeastasia.logic.azure.com:443/workflows/c5b541b69ec6496a9a8feb5454909430/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rDKGxTATEFbg45fHaMghIkL57mIDAndUpJrJCxBnEV8",
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          //make sure to serialize your JSON body
          body: JSON.stringify({
            emailaddress: "baraneetharan.r@kgisl.com",
            emailSubject: "Hello",
            emailBody: "Hello from Power Automate flow",
          }),
        }
      ).then((response) => {
        //do something awesome that makes the world a better place
      });
    };
  })();
  