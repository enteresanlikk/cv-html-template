(function() {
    var DOM = {
        header: {
            class: 'header',
            nav: 'nav',
            scroll: 'scroll',
            mobileBtn: 'mobile-btn'
        },
        active: 'active'
    };

    Element.prototype.SetScroll = function(to, duration) {
        var _ = this;
        if (duration <= 0) return;
        var difference = to - this.scrollTop;

        var perTick = difference / duration * 10;
    
        setTimeout(function() {
            _.scrollTop = _.scrollTop + perTick;
            if (_.scrollTop === to) return;

            _.SetScroll(to, duration - 10);
        }, 10);
    }
    
    Element.prototype.Scrolled = function() {
        var scrollTop = document.querySelector('html, body').scrollTop;
        var headerEl = this;
        var headerHeight = headerEl.clientHeight;
        if(headerHeight < scrollTop) {
            headerEl.classList.add(DOM.header.scroll);
        } else {
            headerEl.classList.remove(DOM.header.scroll);
        }
    }

    Element.prototype.MobileMenu = function() {
        this.addEventListener('click', function(e) {
            document.querySelector(`.${DOM.header.class}`).classList.toggle(DOM.active);
        });
    }

    Element.prototype.SetSlide = function() {
        this.addEventListener('click', function() {
            document.querySelector(`.${DOM.header.class}`).classList.remove(DOM.active);
            var headerLinks = document.querySelectorAll(`${DOM.header.class} a`);
            for(var i=0; i< headerLinks.length; i++) {
                var link = headerLinks[i];
                link.classList.remove(DOM.active);
            }
            this.classList.add(DOM.active);

            var targetId = this.getAttribute('data-target');
            var targetElem = document.querySelector(`${targetId}`);

            document.querySelector('html, body').SetScroll(targetElem.offsetTop-document.querySelector(`.${DOM.header.class}`).clientHeight, 600);
        });
    }

    //Set pages
    var headerLinks = document.querySelectorAll(`${DOM.header.class} a`);
    for(var i=0; i< headerLinks.length; i++) {
        var link = headerLinks[i];
        link.SetSlide();
    }

    //Toogle Mobile Menu
    document.querySelector(`.${DOM.header.mobileBtn}`).MobileMenu();


    //Scroll event
    window.addEventListener('scroll', function(e) {
        document.querySelector(`.${DOM.header.class}`).Scrolled();
    });

})();