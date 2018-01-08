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
    },
    computed: {
        time() {
            return this.formate(this.cha);
            
        },
    },
    mounted() {
        if(this.endtime&&this.startTime&&((this.endtime-this.startTime)>1000)){
            this.cha=this.endtime-this.startTime;
        }else{
            this.cha=0;
        }
        this.fre=setInterval( ()=>{
            if(this.cha<1000){
                clearInterval(this.cha)
            }else{
                this.cha=this.cha-1000;
            }
        }, 1000);
    },

}
</script>
<style scoped>

</style>
