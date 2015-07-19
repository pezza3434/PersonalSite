$(window).load(function () {
    new isotope();
    new aboutme().init();
    new portfolio().init();
});

var portfolio = function () {

    var _self = this;

    var previous_selected_class = null;

    this.init = function () {
        this.event_listeners();
    };

    this.event_listeners = function () {
        $('.showcase-item').on('click', function () {
            _self.toggle_showcase($(this));

        });

        $('.close').on('click', function () {
            $(previous_selected_class).slideUp();
        });
    };

    this.toggle_showcase = function (element) {

        var class_name = '.' + element.attr('data-showcase') + '-app-portfolio';

        if (class_name !== previous_selected_class) {
            $(previous_selected_class).slideUp();
            $(class_name).slideToggle();
        } else {
            $(class_name).slideToggle();
        }
        previous_selected_class = class_name;

    };
};

var isotope = function () {
    // init Isotope
    var $container = $('.isotope').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });

    // bind filter button click
    $('#filters').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $('#filters button').removeClass('active');
        $(this).addClass('active');
        $container.isotope({
            filter: filterValue
        });

        if ($('.portfolio-showcase').is(':visible')) {
            $('.portfolio-showcase').slideUp();
        }

    });

    $container.isotope({
        filter: '.websites'
    });
}

var aboutme = function () {

    var _self = this;

    var previous_selected_class = null;

    this.init = function () {
        this.event_listeners();
    };

    this.event_listeners = function () {
        $('.skill').on('click', function () {
            _self.toggle_dropdown($(this));
        });
    };

    this.toggle_dropdown = function (element) {

        var class_name = '.skill-box.' + element.attr('data-box');

        if (class_name !== previous_selected_class) {
            $(previous_selected_class).slideUp();
            $(class_name).slideToggle();
        } else {
            $(class_name).slideToggle();
        }

        previous_selected_class = class_name;

    };

}
