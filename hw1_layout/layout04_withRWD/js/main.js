$(function () {

    /*
     * Slideshow
     */
    
    $('.slideshow').each(function () {

        var $slides = $(this).find('img'), 
            slideCount = $slides.length,   
            currentIndex = 0;              
        
        $slides.eq(currentIndex).fadeIn();
        
        setInterval(showNextSlide, 7500);
        
        function showNextSlide () {
						//下張Slide的index
						//(如果是最後一張Slide，則會到第一張)
            var nextIndex = (currentIndex + 1) % slideCount;            
            $slides.eq(currentIndex).fadeOut();            
            $slides.eq(nextIndex).fadeIn();            
            currentIndex = nextIndex;
        }

    });

    /*
     * Sticky header
     */
    $('.page-header').each(function () {

        var $window = $(window), 
            $header = $(this),   
        
            headerOffsetTop = $header.offset().top;       
        
        $window.on('scroll', function () {
            
            if ($window.scrollTop() > headerOffsetTop) {
                $header.addClass('sticky');
            } else {
                $header.removeClass('sticky');
            }
        });
                
        $window.trigger('scroll');
    });

    /*
     * Tabs
     */
    $('#work').each(function () {        
        var $tabList    = $(this).find('.tabs-nav'),   
            $tabAnchors = $tabList.find('a'),          
            $tabPanels  = $(this).find('.tabs-panel'); 

        //點擊Tab時的處理
        //傳入作為參數的事件物件
        $tabList.on('click', 'a', function (event) {            
            event.preventDefault();
            var $this = $(this);

            if ($this.hasClass('active')) {
                return;
            }
            
            $tabAnchors.removeClass('active');
            $this.addClass('active');
            
            $tabPanels.hide();
            $($this.attr('href')).show();

        });

        $tabAnchors.eq(0).trigger('click');
    });

    /*
     * Back-toTop button (Smooth scroll)
     */
    $('.back-to-top').each(function () {
        
        var $el = $(scrollableElement('html', 'body'));
        
        $(this).on('click', function (event) {
            event.preventDefault();
            $el.animate({ scrollTop: 0 }, 250);
        });
    });

    
    function scrollableElement (elements) {
        var i, len, el, $el, scrollable;
        for (i = 0, len = arguments.length; i < len; i++) {
            el = arguments[i],
            $el = $(el);
            if ($el.scrollTop() > 0) {
                return el;
            } else {
                $el.scrollTop(1);
                scrollable = $el.scrollTop() > 0;
                $el.scrollTop(0);
                if (scrollable) {
                    return el;
                }
            }
        }
        return [];
    }

});
