
window.cronometro = function(){

    return {

        timer: {
            title: '',
            time: '00:01:00',
            alarm: 'emergency_nuclear',
            reverse: true
        },

        alarms: [
            {name: 'Emergency Alarm 1', file: 'emergency_alarm_1'},
            {name: 'Emergency Alarm 2', file: 'emergency_alarm_2'},
            {name: 'Emergency Bell', file: 'emergency_bell'},
            {name: 'Emergency Nuclear', file: 'emergency_nuclear'},
            {name: 'Digital Beeps 1', file: 'science_fiction_alarm'},
            {name: 'Digital Beeps 2', file: 'digital_beeps_2'},
            {name: 'Science Fiction Alarm', file: 'digital_beeps_1'},
            {name: 'Harsh', file: 'harsh'},
        ],

        lastTime: 0,
        interval: null,
        currentSecs: 0,
        audio: null,

        timers: [],
        title: null,

        state: 'ready',

        init: function(){
            
            this.timers = localStorage.getItem('timers') ?? '[]';
            this.timers = JSON.parse(this.timers)

            _this = this;
            this.$watch('timers', function(){
                console.log(_this.timers);
                localStorage.setItem('timers', JSON.stringify( _this.timers) );
            });

            this.title = document.querySelector('title');
            this.$watch('currentSecs', function(){
                if( _this.state == 'running'){
                    _this.title.innerText = _this.currentTime();                    

                }else{
                    _this.title.innerText = 'Timer/Cronômetro Online';
                }
            })
        },

        toggleState: function(){
            if( this.state == 'ready' || this.state == 'stoped'){
                this.startTimer();
            }else if(this.state == 'running'){
                this.state = 'paused';
            }else if(this.state == 'paused'){
                this.lastTime = Date.now();
                this.state = 'running';
            }else if(this.state == 'playing_alarm') {
                this.state = 'stop';
                this.audio.pause();
            }
        },


        startTimer: function(){
            this.currentSecs = 0;
            this.lastTime = Date.now();
            this.state = 'running';
            this.audio = new Audio(`/alarms/${this.timer.alarm}.mp3`);
            this.audio.addEventListener('ended', () => {
                this.state = 'stop';
            });

            _this = this;
            this.interval = setInterval(function(){
                
                if( _this.state == 'running'){

                    const sec = _this.currentSecs + ( (Date.now() - _this.lastTime) / 1000 ); 
                    
                    if( sec >= _this.text2secs(_this.timer.time) ){
                        _this.stopTimer()
                    }        
                    _this.currentSecs =  sec;
                                
                    _this.lastTime = Date.now();
                }
       
            }, 200);
        },


        reset: function(){
            this.currentSecs = 0;
            this.lastTime = 0;
            this.state = 'ready';
            this.audio = null;
            clearInterval(this.interval);
        },
       

        currentTime: function(){
            if(this.timer.reverse){
                return this.time2text( this.text2secs(this.timer.time) - this.currentSecs );
            }
            return this.time2text(this.currentSecs);
        },

        percentage: function(){
            return parseInt(this.currentSecs * 100 / this.text2secs(this.timer.time)) + '%'
        },


        stopTimer: function(){
            clearInterval( _this.interval );
            _this.state = 'playing_alarm';
            _this.audio.play();
        },


        saveTimer: function(){
            this.timer.title = this.timer.title ?  this.timer.title:  'Sem Título';
            this.timers.push( this.timer );
        },

        newTimer: function(){
            this.timer = {
                title: '',
                time: '00:01:00',
                alarm: 'emergency_nuclear',
                reverse: true
            };
        },


        loadTimer: function(timerSaved){
            this.timer = Object.assign({}, timerSaved);
        },

        deleteTimer: function(timer){
            const index = this.timers.indexOf(timer);
            if (index !== -1) {
                this.timers.splice(index, 1);
            }
        },


        time2text: function(totalSecs){
            totalSecs = parseInt(totalSecs)
            const hours = Math.floor(totalSecs / 3600).toString().padStart(2, '0');
            const minutes = Math.floor(totalSecs % 3600 / 60).toString().padStart(2, '0');
            const seconds = Math.floor(totalSecs % 60).toString().padStart(2, '0');

            return hours +':' + minutes + ':' + seconds ;
        },

        text2secs: function(time){
            let text = time.split(':');
            return Math.floor(text[0]) * 3600 + parseInt(text[1]) * 60 + parseInt(text[2]);
        }

    }
}