(function($) {

    function init() {
        /* Sidebar height set */
        $sidebarStyles = $('.sidebar').attr('style')
        $sidebarStyles += ' min-height: ' + $(document).height() + 'px;';
        $('.sidebar').attr('style', $sidebarStyles);

        /* Secondary contact links */
        var $scontacts = $('#contact-list-secondary');
        var $contactList = $('#contact-list');

        $scontacts.hide();
        $contactList.mouseenter(function(){ $scontacts.fadeIn(); });
        $contactList.mouseleave(function(){ $scontacts.fadeOut(); });

        /**
         * Tags & categories tab activation based on hash value. If hash is undefined then first tab is activated.
         */
        function activateTab() {
            if(['/tags.html', '/categories.html'].indexOf(window.location.pathname) > -1) {
                var hash = window.location.hash;
                if(hash)
                    $('.tab-pane').length && $('a[href="' + hash + '"]').tab('show');
                else
                    $('.tab-pane').length && $($('.cat-tag-menu li a')[0]).tab('show');
            }
        }

        // watch hash change and activate relevant tab
        $(window).on('hashchange', activateTab);

        // initial activation
        activateTab();
    }

    // run init on document ready
    $(document).ready(init);

    $('.about-me-link').click(function() {
        $(document.getElementsByClassName('sidebar')[0]).click();
    })

})(jQuery);

function showAboutMe() {
    let sidebar = $(document.getElementsByClassName('sidebar')[0]);
    sidebar.addClass('about-me-fs');

    let sidebarFixed = $(document.getElementsByClassName('sidebar-fixed')[0]);
    sidebarFixed.removeClass('sidebar-hover');

    $(document.getElementById('contact-list')).addClass('contact-list-fs');

    let aboutMeDiv = $(document.getElementById('about-me'));
    aboutMeDiv.fadeIn(3000);
}
