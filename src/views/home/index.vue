<style lang="less" scoped>
.index {
    .name {
        text-align: left;
    }
    .swiper {
        height: 205px;
        img {
            width: 100%;
            min-height: 205px
        }
    }
    .sign_out {
        color: #FA6705;
    }
}
</style>
<template>
    <div class="index">
        <div class="swiper">
            <mt-swipe :auto="4000" :prevent="false">
                <mt-swipe-item v-for="(todo,index) in arr">
                    <img v-bind:src="todo.url">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="name">尊敬的
            <span v-if="!usrname" class="sign_out">???</span>
            <span v-if="usrname" class="sign_out">{{usrname,7 | filterTxt}}</span> 用户您好~
            <span class="sign_out" @click="signOut" v-if="usrname">退出登录</span>
            <span class="sign_out"  v-if="!usrname" @click="goLogin">去登录</span>
        </div>
    </div>
</template>
<script>
import filters from '../../filters/filters.js'
import common from '../../common/common.js'
export default {
    data() {
            return {
                arr: [{
                    url: '/static/icon/1.jpg'
                }, {
                    url: '/static/icon/2.jpg'
                }, {
                    url: '/static/icon/3.jpg'
                }, {
                    url: '/static/icon/4.jpg'
                }]
            }
        },
        computed: {
            usrname() {
                return this.$store.state.user.username;
            }
        },
        methods: {
            signOut() {
                let _self = this;
                function delet() {
                    _self.$store.dispatch('deleName')
                }
                common.$emit('confirm',{
                    message:'确定退出登陆？',
                    title:'提示',
                    ensure:delet
                })
            },
            goLogin() {
                this.$router.push('/login')
            }
        },
        created() {
            let _self = this;

        }

}
</script>
