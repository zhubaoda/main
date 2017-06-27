<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input {
    border: none;
}

.index {
    position: relative;
    .list {
        position: absolute;
        top: 38px;
        z-index:2000;
        width:100%;
        height:300px;
        overflow:scroll;
        text-align:left;
        padding: 4px 5px;
        background-color: #D9D9D9;
        line-height:25px;
        .item{
            padding-left:20px;
            border-bottom:1px solid #ccc;
            background-color:#fff;
        }      
    }
    .search {
        position: relative;
        padding: 4px 5px;
        background-color: #D9D9D9;
        .search_img {
            position: absolute;
            left: 10px;
            top: 9px;
            height: 20px;
        }
        .box {
            width: 100%;
            display: flex;
            flex-direction: row;
            input {
                flex: 1;
                height: 30px;
                border-radius: 2px;
                padding-left: 30px;
            }
            .canel {
                background-color: #2693FF;
                color: #fff;
                line-height: 30px;
                font-size: 15px;
                padding: 0 10px;
                border-radius: 2px;
            }
        }
    }
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
        <!-- <mt-search autofocus v-model="value" :result="filterResult"></mt-search> -->
        <div class="search">
            <img src="/static/icon/search.png" class="search_img">
            <div class="box">
                <input type="text" v-model="value" placeholder="数据不不足，请输入英文~">
                <div class="canel" v-if="value" @click="cancel">取消</div>
            </div>
        </div>
        <div class="list" v-show="value">
            <div class="item" v-for="todo in filterResult">
                {{todo}}
            </div>
        </div>
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
            <span class="sign_out" v-if="!usrname" @click="goLogin">去登录</span>
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
                }],
                value: '',
                defaultResult: [
                    'Apple',
                    'Banana',
                    'Cherry',
                    'Durian',
                    'Each',
                    'Fig',
                    'Git',
                    'Haw',
                    'Iiem',
                    'Jack',
                    'Kait',
                    'Lemon',
                    'Melon',
                    'Num',
                    'Unit',
                    'Vitem',
                    'Witeh',
                    'Xiem',
                    'Yes',
                    'Zdex',
                    'Orange',
                    'Peach',
                    'Berry',
                    'Core',
                    'Plum',
                    'Pear',
                    'Peanut',
                    'Other'
                ]
            }
        },
        computed: {
            usrname() {
                return this.$store.state.user.username;
            },
            filterResult() {
                return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
            }
        },
        methods: {
            signOut() {
                let _self = this;

                function delet() {
                    _self.$store.dispatch('deleName')
                }
                common.$emit('confirm', {
                    message: '确定退出登陆？',
                    title: '提示',
                    ensure: delet
                })
            },
            goLogin() {
                this.$router.push('/login')
            },
            cancel(){
                this.value = '';
            }
        },
        created() {
            let _self = this;

        }

}
</script>
