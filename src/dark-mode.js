

window.darkMode = function(){
    return {
        darkMode: false,

        init: function(){
            this.darkMode = localStorage.getItem('darkMode') === 'true';
            _this = this;
            this.$watch('darkMode', function(){
                localStorage.setItem('darkMode', _this.darkMode)
            })
        }
    };
}