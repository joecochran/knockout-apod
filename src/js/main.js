// 1. handle routing
    // '/' & '#/today'
        // basic api call of the latest
        // GET https://api.nasa.gov/planetary/apod
    // '#/yyyy/mm/dd'
        // get api for a certain date
        // https://api.nasa.gov/planetary/apod?date=YYYY-MM-DD
        // if only year, go to Jan 1 of that year
        // if only year and month, go to the first of that month
function apodDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
}
function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}
function ApodViewModel() {
    var self = this;

    self.key = 'DEMO_KEY'; //change to DEMO_KEY before comitting

    self.copyright = ko.observable();
    self.date = ko.observable();
    self.explanation = ko.observable();
    self.url = ko.observable();
    self.title = ko.observable();
    self.mediaType = ko.observable();
    
    self.prettyDate = ko.computed(function() {
        if (self.date() instanceof Date) {
            return self.date().toDateString();
        }
    });
    self.prevDate = ko.computed(function(){
        if (self.date() instanceof Date) {
            date = new Date(self.date().toString());
            date.setDate(date.getDate() - 1);
            return apodDate(date);
        }
    });
    self.nextDate = ko.computed(function(){
        if (self.date() instanceof Date) {
            date = new Date(self.date().toString());
            date.setDate(date.getDate() + 1);
            return (date < new Date()) ? apodDate(date) : false;
        }
    });
    self.latest = apodDate(new Date());

    self.getDate = function(date) {
        $.getJSON('https://api.nasa.gov/planetary/apod?api_key=' + self.key + '&date=' + date, function(data){
            self.copyright(data.copyright);
            self.date( new Date(data.date.split('-').join('/')));
            self.explanation(data.explanation);
            self.url(data.url);
            self.title(data.title);
            self.mediaType(data.media_type);
        });
    }
    self.getRandom = function() {
        // return a date between 1995-09-22 and today. 
		var start = new Date('1995/09/22');
		var date = randomDate(start, new Date(), 0, 0);
		self.getDate(apodDate(date));
        // check for 500 error (which wil
    }
    
    // get the most recent one right away
    self.getDate(self.latest);
}
ko.applyBindings(new ApodViewModel());
