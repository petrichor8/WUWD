/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var playing = false;
var media=null;
var mpic = null;
var timer = null;
var logEvents = true;
var actbtn = null;

var app = {

    // Application Constructor
    initialize: function() {
        app.logger('initializing'); 
        this.bindEvents();
    }

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    ,bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    ,onDeviceReady: function() {
        app.logger('onDeviceReady called'); 
        app.receivedEvent('deviceready');
        app.initMedia();

    }

    // Update DOM on a Received Event
    ,receivedEvent: function(id) {        
        app.logger('Received Event: ' + id);
    }

    // initialize media
    ,initMedia: function(){
        var src = "img/clip.mp3";  
        x = new Image();
        x.src = 'img/snl2a.gif';
        app.logger('initMedia called');
        app.logger('vvvvv IMG vvvvv');
        app.logger(x);
        app.logger('^^^^^ IMG ^^^^^');
        app.logger('device platform: ' + device.platform);
        src = app.getPhoneGapPath() + src;
        app.logger('media src: ' + src);
        media = new Media(src,app.onMediaSuccess,app.onMediaError,app.onMediaStatus);
        mpic = document.getElementById('switchpic');
        actbtn = document.getElementById('clickplaybtn');
    }

    // handle media click event
    ,mediaClick: function(){
        app.logger('mediaClick called');
        app.logger('vvvvv MEDIA vvvvv');  
        app.logger(media);
        app.logger('^^^^^ MEDIA ^^^^^');
        if(!playing){app.playSound();}
        else{app.stopSound();}
        return false;
    }

    // play media 
    ,playSound: function(){
            app.logger('playSound called');
            media.play();
            playing=true;
            app.imgSwap();
            timer = setTimeout(app.resetImg,13200);
    }

    // stop media
    ,stopSound: function(){
            app.logger('stopSound called');
            media.stop();
            app.logger('media stopped');
            playing=false;
            app.imgSwap();
            clearTimeout(timer);
    }

    // swap images out
    ,imgSwap: function(){
        app.logger('imgSwap called');        
        if(playing){
            app.logger('playing images swapped');
            mpic.src="img/snl2a.gif";
            actbtn.src = 'img/stop.png';
        }
        else{
            app.logger('non-playing images swapped');
            mpic.src="img/snl2b.jpg";  
            actbtn.src = 'img/play.png';          
        }
    }

    // reset to default
    ,resetImg: function(){
        app.logger('resetImg called');
        mpic.src="img/snl2b.jpg";
        actbtn.src = 'img/play.png';
        playing=false;
    }

    // get path to file
    ,getPhoneGapPath: function() {
        var path = '';
        if(device.platform == "Android"){
            path = window.location.pathname;
            path = path.substr( path, path.length - 10 );
        }
        //return 'file://' + path;

        return path;
    }

    // log to console if global var is true
    ,logger: function(el){       
        if(logEvents){
            if(!window.console) {console = {log: function() {}}; }
            console.log(el);
        }
    }

    // handle close click
    ,closeApp: function(){   
        mpic.src="img/snl.png";
        media.release();
        document.getElementById('mybutton').innerHTML='';
        document.getElementById('closebtn').innerHTML='<h3>GOODBYE!</h3>';
        var t = setTimeout(app.shutdown,3000);
    }

    // exit app
    ,shutdown: function(){    
        app.logger("shutdown called");
        app.logger(navigator);
        if (navigator.app) {
            navigator.app.exitApp();
        }
        else if (navigator.device) {
            navigator.device.exitApp();
        }
        else {
            window.close();
        }
    }

    // media onSuccess Callback
    ,onMediaSuccess: function() {
        app.logger("onMediaSuccess called");
    }
    
    // media onError Callback 
    ,onMediaError: function(error) {
        app.logger("onMediaError called");
        app.logger(error);
        playing = false;
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }

    // media onStatus Callback
    ,onMediaStatus: function(code) {
        app.logger("onMediaStatus called");
        app.logger('code: ' + code);
    }
};
