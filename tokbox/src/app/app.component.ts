import { Component,  OnInit  } from '@angular/core';
import { sessionStarting } from '../assets/app.js';
import { ApiService } from './services/api.service.js';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'tokbox';
  sessionStarted: Boolean = false;
  constructor(private api: ApiService) { }
  startSession() {



    this.sessionStarted = true;
    // var apiKey = "46224992";
    // var sessionId = "2_MX40NjIyNDk5Mn5-MTU0Mjk1MTYzNjUyNH5NNnczUUd0ZVVsb1VCNDg2b0VXbERCZnh-fg";
    // var token = "T1==cGFydG5lcl9pZD00NjIyNDk5MiZzaWc9MGRiYTA5MTg4NmU4N2FiNjk0OTdlY2ZmNmVkYWJhYmZhMGU3Y2Q2NjpzZXNzaW9uX2lkPTJfTVg0ME5qSXlORGs1TW41LU1UVTBNamsxTVRZek5qVXlOSDVOTm5jelVVZDBaVlZzYjFWQ05EZzJiMFZYYkVSQ1puaC1mZyZjcmVhdGVfdGltZT0xNTQyOTUxNjYyJm5vbmNlPTAuNTQ2MTE1NDQ5NTc0NTU5NSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQyOTczMjYxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

    // (optional) add server code here
    this.initializeSession();


  }
  ngOnInit(){
    var socket = io();
  }

  // Handling all of our errors here by alerting them
  handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
  acceptSession() {
    
  }

   initializeSession() {
    var apii;
    apii = this.api.get('server').subscribe(s => {
      apii = s;
      console.log(apii);

      var session = apii.session;
      var api_key = apii.api_key;
      var sessionID = apii.sessionId;
      var token = apii.token;
      console.log('1')
      console.log(session);

      var OT_session = OT.initSession(api_key, sessionID);

      // Connect to the session
      OT_session.connect(token, function (error) {
        // If the connection is successful, publish to the session
        if (error) {
          this.handleError(error);
        } else {

          // Subscribe to a newly created stream
          OT_session.on('streamCreated', function (event) {
            OT_session.subscribe(event.stream, 'subscriber', {
              insertMode: 'append',
              audioVolume: 100,
              width: '100%',
              height: '100%'
            }, this.handleError);
          });

          // Create a publisher
          var publisher = OT.initPublisher('publisher', {
            insertMode: 'append',
            width: '100%',
            height: '100%'
          });
          OT_session.publish(publisher);
        }
      });
    });

  }

}
