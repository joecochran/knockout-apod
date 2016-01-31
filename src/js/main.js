// 1. handle routing
    // '/' & '#/today'
        // basic api call of the latest
        // GET https://api.nasa.gov/planetary/apod
    // '#/yyyy/mm/dd'
        // get api for a certain date
        // https://api.nasa.gov/planetary/apod?date=YYYY-MM-DD
        // if only year, go to Jan 1 of that year
        // if only year and month, go to the first of that month

// function apod(data) {
//     this.copyright = ko.observable();
//     this.date = ko.observable();
//     this.explanation = ko.observable();
//     this.url = ko.observable();
//     this.title = ko.observable();
//     this.mediaType = ko.observable();
// }

function ApodViewModel() {
    var self = this;

    self.copyright = ko.observable();
    self.date = ko.observable();
    self.explanation = ko.observable();
    self.url = ko.observable();
    self.title = ko.observable();
    self.mediaType = ko.observable();

    // compute the day before

    //compute the day after
    self.nextDate = ko.computed(function(){
        return true;
    });

    self.getLatest = function() {
        $.getJSON('https://api.nasa.gov/planetary/apod?api_key=gmTH7lAYpfdU5nKs3qqQXOND8WimG1qLpshtcoxg', function(data){
            self.copyright(data.copyright);
            self.date(data.date);
            self.explanation(data.explanation);
            self.url(data.url);
            self.title(data.title);
            self.mediaType(data.media_type);
        });
    }
    self.prevDate = ko.computed(function(){
        var dateString = self.date();
        if (typeof dateString == "string") {
            var arr = dateString.split('-').join('/');
            var date = new Date(arr);
            date.setDate(date.getDate() - 1);
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth() + 1).toString();
            var dd = date.getDate().toString();
            return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
        }
        return false;
        // var date = new Date();
    });
    self.nextDate = ko.computed(function(){
        var dateString = self.date();
        if (typeof dateString == "string") {
            var arr = dateString.split('-').join('/');
            var date = new Date(arr);
            date.setDate(date.getDate() + 1);
            if (date > new Date()) {
                return false;
            }
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth() + 1).toString();
            var dd = date.getDate().toString();
            return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
        }
        return false;
    });
    self.getPrevious = function() {
        $.getJSON('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY' + '&date=' + self.prevDate(), function(data){
            self.copyright(data.copyright);
            self.date(data.date);
            self.explanation(data.explanation);
            self.url(data.url);
            self.title(data.title);
            self.mediaType(data.media_type);
        });
    }
    self.getNext = function() {
        $.getJSON('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY' + '&date=' + self.nextDate(), function(data){
            self.copyright(data.copyright);
            self.date(data.date);
            self.explanation(data.explanation);
            self.url(data.url);
            self.title(data.title);
            self.mediaType(data.media_type);
        });
    }
    self.getDate = function(date) {
    }
    
    // get the most recent one right away
    self.getLatest();
}
ko.applyBindings(new ApodViewModel());
function makeDate(date) {
    var arr = date.split('-').join('/');
    // var arr = date.split('-');
    // var year = parseInt(arr[0]).toString();
    // var month = parseInt(arr[1]).toString();
    // var day = parseInt(arr[2]).toString();
    // console.log(year + ' ' + month + ' ' + day);
    var date = new Date(arr);
    return date;

}
