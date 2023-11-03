<template>
    <link v-bind:href="activate" rel="stylesheet" type="text/css">
</template>

<script>
export default {
    data() {
        return {
            styles : {
                android : "/assets/css/android.css",
                windows : "/assets/css/windows.css"
            },
            user_agent : "",
            activate : ""
        };
    },
  mounted() {
    this.loaded();
  },
    methods: {
        loaded() {
            if (navigator.userAgent.indexOf("Android") != -1) {
                this.activate = this.styles.android;
            } else if (navigator.userAgent.indexOf("Windows") != -1) {
                this.activate = this.styles.windows;
            }

            this.user_agent = navigator.userAgent;
        }
    }
};
</script>

