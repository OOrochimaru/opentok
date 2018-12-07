function sessionStarting(){
  // var apiKey = "46224992";
  // var sessionId = "2_MX40NjIyNDk5Mn5-MTU0Mjk1MTYzNjUyNH5NNnczUUd0ZVVsb1VCNDg2b0VXbERCZnh-fg";
  // var token = "T1==cGFydG5lcl9pZD00NjIyNDk5MiZzaWc9MGRiYTA5MTg4NmU4N2FiNjk0OTdlY2ZmNmVkYWJhYmZhMGU3Y2Q2NjpzZXNzaW9uX2lkPTJfTVg0ME5qSXlORGs1TW41LU1UVTBNamsxTVRZek5qVXlOSDVOTm5jelVVZDBaVlZzYjFWQ05EZzJiMFZYYkVSQ1puaC1mZyZjcmVhdGVfdGltZT0xNTQyOTUxNjYyJm5vbmNlPTAuNTQ2MTE1NDQ5NTc0NTU5NSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQyOTczMjYxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";
  
  // (optional) add server code here
  initializeSession();
  
  
  // Handling all of our errors here by alerting them
  function handleError(error) {
      if (error) {
        alert(error.message);
      }
    }
    
    function initializeSession() {

     var apii =  api.get('server').subscribe(s=>{
       console.log(s);
       return s;
     });

      var session = apii.session
      var token = apii.token  
    
      // Subscribe to a newly created stream
      session.on('streamCreated', function(event) {
          session.subscribe(event.stream, 'subscriber', {
            insertMode: 'append',
            width: '100%',
            height: '100%'
          }, handleError);
        });
    
      // Create a publisher
      var publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      }, handleError);
    
      // Connect to the session
      session.connect(token, function(error) {
        // If the connection is successful, publish to the session
        if (error) {
          handleError(error);
        } else {
          session.publish(publisher, handleError);
        }
      });
    }
  }