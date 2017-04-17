var monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

function GenericMonthCalendar(){
     //the model
     this.lines = [new Array(this.NUMCOLUNS),new Array(this.NUMCOLUNS),new Array(this.NUMCOLUNS),
                   new Array(this.NUMCOLUNS),new Array(this.NUMCOLUNS),new Array(this.NUMCOLUNS),
                   new Array(this.NUMCOLUNS)];
}
//the methods and attributes
GenericMonthCalendar.prototype={

         NUMCOLUNS: 7,

         setDate: function(date){
            date = new Date(date);
            date.setDate(1);
            this.month = date.getMonth();
            this.year = date.getFullYear();
            var x, y;

            for(y=0;y<date.getDay();y++){
               this.lines[0][y] = undefined;
            }            
            
            for(x = 0,y = date.getDay(); x < this.lines.length; x++,y=0){
               for(;y < this.lines[x].length; y++){
                  var value = date.getMonth() == this.month?date.getDate():undefined;
                  this.lines[x][y] = value;
                  date.setDate(date.getDate() + 1)
	       }
	       
            }
            
         },
         
         getValue: function(x,y){
            return this.lines[x][y];
         },
         
         getMonth: function (){
            return this.month;
         },
         
         getYear: function() {
            return this.year;
         }   
}



//inits everyhing and displayes the current month calendar
function init(){
  this.theDate = new Date();
  this.calen = new GenericMonthCalendar();
  setCal();
}

//redraws the calendar
function setCal(){
   calen.setDate(theDate);
   var table = document.getElementById('monthCalendar');
   printGenericCalendar(calen,table)
}

//increment the month and redraws the calendar
function nextMonth(){
    theDate.setDate(1);
    theDate.setMonth(theDate.getMonth()+1);
    setCal();
}

//decrement the month and redraws the calendar
function previousMonth(){
    theDate.setDate(1);
    theDate.setMonth(theDate.getMonth()-1);
    setCal();
}
//sets the calendar back to today
function hoje(){
    theDate = new Date();
    setCal();
}

//prints a GenericaCalendar object into an html table
function printGenericCalendar(genCalendar,table){
   
    setCalendarTitle(genCalendar.getMonth(),genCalendar.getYear());
    setLinksText(genCalendar.getMonth(),genCalendar.getYear());

    var highlightDay = false;
    var today = new Date();
    if(today.getFullYear() == genCalendar.getYear()
        && today.getMonth() == genCalendar.getMonth()){
       highlightDay = true;
    }
    
    var lines = table.tBodies.item(0).rows;
    
    var x,y;
    
    for(x = 0; x < lines.length; x++){
       var tr = lines.item(x);
       var cells = tr.cells;
       for(y = 0; y < cells.length; y++){
           var cell = cells.item(y);
           var value = genCalendar.getValue(x,y);
           if(value == undefined){
              value = "";
              cell.className = "";
           } else if(highlightDay && parseInt(value) == today.getDate()){
               cell.className = "today";
           } else {
               cell.className = "";
           }
           setText(cell,value);
       }
    }
}

//draws the month name
function setCalendarTitle(month,year){
   var cell = document.getElementById('monthNameCell');
   setText(cell,makeMonthFullName(month,year))
}

//update the text on the 'previous' and 'next' links
function setLinksText(month,year){
   var date = new Date(year,month,1);
   //the previuos month link
   date.setMonth(date.getMonth()-1);
   var link = document.getElementById('previousMonthLink');
   setDateLink(date,link);
   
   //the next month link
   date.setMonth(date.getMonth()+2);
   link = document.getElementById('nextMonthLink');
   setDateLink(date,link);
}
//update the text in one of the links (utility function)
function setDateLink(date,link){
   var text = makeMonthFullName(date.getMonth(),date.getFullYear());
   setText(link,text);
   link.title = text;
}
//forms the strign with the month name, as it will be shown in the links and the title
function makeMonthFullName(month,year){
   return monthNames[month] + " de " + year;
}
