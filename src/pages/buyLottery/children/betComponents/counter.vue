<template>
    <div>{{time}}</div>
</template>
<script>
export default {
    data() {
        return {
            fre:null,
            cha:null
        };
    },
    props: ['endtime','startTime'],
    methods: {
        formate(time) {
            let cha = time / 1000;
            let hour = parseInt(cha / 3600);
            let minute = parseInt((cha % 3600) / 60);
            let second = parseInt((cha % 3600) % 60);
            return this.p(hour) + ':' + this.p(minute) + ':' + this.p(second);
        },
        p(n) {
            return n < 10 ? '0' + n : n;
        },
        refreshTime(){
            if(this.endtime&&this.startTime&&((this.endtime-this.startTime)>1000)){
                this.cha=this.endtime-this.startTime;
            }else{
                this.cha=0;
            }
            if (this.fre) {
                clearInterval(this.fre)
            }
            this.fre=setInterval( ()=>{
                if(this.cha<1000){
                    clearInterval(this.cha)
                    this.$emit('onTimeOut')
                }else{
                    this.cha=this.cha-1000;
                }
            }, 1000);
        }
    },
    computed: {
        time() {
            return this.formate(this.cha);
            
        },
    },
    watch: {
        startTime (val) {
            this.refreshTime()
        }
    },
    mounted() {
        this.refreshTime()
    },

}
</script>
<style scoped>

</style>
