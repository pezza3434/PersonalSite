$( function() {
    // init Isotope
    var $container = $('.isotope').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'

    });

    // bind filter button click
    $('#filters').on( 'click', 'button', function() {
        var filterValue = $( this ).attr('data-filter');
        $container.isotope({ filter: filterValue });
    });

    new aboutme().init();

});

var aboutme = function(){

    var _self = this;

    var previous_selected_class = null;

    this.init = function(){
      this.event_listeners();
    };

    this.event_listeners = function(){
        $('.skill').on('click', function(){
            _self.toggle_dropdown($(this));
        });
    };

    this.toggle_dropdown = function(element){

        var class_name = '.' + element.attr('data-box');

        if (class_name !== previous_selected_class){
            $(previous_selected_class).slideUp();
            $(class_name).slideToggle();
        } else {
            $(class_name).slideToggle();
        }

        previous_selected_class = class_name;

    };

}