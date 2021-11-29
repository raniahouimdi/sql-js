//En utilisant le code de la demo 9 Ajax.js, 
//On a réussi à construire le nôtre
function genereTableau(donnees, id){
    var nb = donnees.length;
    if(nb>0){
        var htmltable="<tr>";
        for(var attr in donnees[0]){
            htmltable=htmltable+"<th>"+attr+"</th>";
        };
        htmltable=htmltable+"</tr>";
        for(var x=0;x<nb;x++){
            htmltable=htmltable+"<tr>";
            for(var a in donnees[x]){
                htmltable=htmltable+"<td>"+donnees[x][a]+"</td>";
            }
            htmltable=htmltable+"</tr>";
        }
        $("#"+id).html(htmltable);
    }else{
        alert("La réponse à la requête est vide.");
        $("#"+id).html("");
    }
};

function poste(requete){
    var postData = {};
    postData["db"] = "dift6800_baseball";
    postData["query"] = requete;	
    $.post(
      "http://www-ens.iro.umontreal.ca/~dift6800/baseball/db.php",
      postData,
      function(reponse,status){
         console.log(status);
         var obj = JSON.parse(reponse);
        if(obj.error==""){  
            genereTableau(obj.data, "table");
        }else{
          alert("Erreur:"+obj.error);
        }
      }
    );
};

function chargeDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         alert("status:"+this.status);
         $("#demo").text = this.responseText;
      };
    };
    xhttp.open("GET", "requete1.txt", true);
    xhttp.send();
   
}
$(document).ready(function(){
    let yearID;
    $( "#date" ).change(function() {
    yearID = $( this ).val();
  })
  .keyup();
    
$("#lance").click(function(event){
    console.log(yearID)
    $("#titre").text("Requete SQL en Javascript");
    poste("Master.nameLast as nom, Master.nameFirst as prenom, Salaries.teamID, Salaries.salary FROM Salaries JOIN Master ON Salaries.playerID=Master.playerID where yearID="+yearID+" HAVING salary = (SELECT MAX(salary) FROM Salaries where yearID="+yearID+")");
});
});