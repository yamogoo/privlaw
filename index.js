// import NavigationComponet from './components/navigation.vue'

// export default {
//     components: {
//         NavigationComponet
//     }
// }

var app = new Vue({
    el: '#app',
    data: {
        isThemeHeaderLight: true,
        scrollOffset: document.getElementById("app-scroll-view").scrollY
    },
    methods: {
        changeThemeOfHeader() {
            this.isThemeHeaderLight = !this.isThemeHeaderLight;
        },

        get_scroll_offset() {
            window.addEventListener('scroll', () => {
                this.scrollOffset = document.getElementById("app-scroll-view").scrollY;
                console.log(this.scrollOffset);
            });
            return this.scrollOffset;
        }
    },
})


var appScrollView = new Vue({
    el: '.app-scroll-view',
    data: {
        scrollOffset: window.scrollY
    },
    methods: {
        get_scroll_offset() {
            window.addEventListener('scroll', () => {
                this.scrollOffset = window.scrollY;
                console.log(this.scrollOffset);
            });
            return this.scrollOffset;
        }
    }
})
