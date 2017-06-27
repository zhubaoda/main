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

.login {
    .back {
        width: 150px;
        margin-top: 30px;
        margin-left: 20px;
        float: left;
        border-radius: 3px;
    }
    background-image: url('/static/icon/4444.jpg');
    background-position: 0 0;
    background-size: auto 100%;
    overflow-y: scroll;
    height: 100vh;
    position: relative;
    .box {
        .go_login {
            width: 120px;
            margin-top: 20px;
        }
        margin: auto;
        width: 80%;
        min-height: 200px;
        background-color: #fff;
        border-radius: 10px;
        margin-top: 120px;
        box-shadow: 10px 10px 5px #888888;
        .top {
            font-size: 14px;
            line-height: 30px;
            color: #fa6705;
            border-bottom: 1px solid #00D9D9;
        }
        .content {
            width: 100%;
            padding-top: 10px;
            .name_box {
                display: flex;
                flex-direction: row;
                justify-content: center;
                margin-top: 10px;
                .name {
                    width: 40px;
                    text-align: left;
                    line-height: 30px;
                    color: #333;
                }
                .other {
                    width: 60%;
                    input {
                        width: 100%;
                        padding: 0px 10px;
                        height: 30px;
                        border: 1px solid #ccc;
                        border-radius: 3px;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="login">
        <img src="/static/icon/back.png" class="back" @click="back">
        <div class="box">
            <div class="top">
                账号和密码可随便填写~
            </div>
            <div class="content">
                <div class="name_box">
                    <div class="name">账号</div>
                    <div class="other">
                        <input type="text" placeholder="请输入" v-model="name">
                    </div>
                </div>
                <div class="name_box">
                    <div class="name">密码</div>
                    <div class="other">
                        <input type="password" placeholder="请输入" v-model="password">
                    </div>
                </div>
            </div>
            <img src="/static/icon/go-login.png"  class="go_login" @click="jump">
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {
                name: '',
                password: ''
            }
        },
        computed: {
            usrname() {
                return this.$store.state.user.username;
            }
        },
        methods: {
            jump() {
                let _self = this;
                if (!this.usrname) {
                    if (this.name && this.password) {
                        _self.$store.dispatch('saveName', this.name);
                        _self.$router.push('/home/index');
                    } else {
                        common.$emit('message', '请输入账号和密码~')
                    }
                }else{
                    common.$emit('message', '您已经登陆~')
                }
            },
            back(){
                this.$router.push('/home/index')
            }
        },
        created() {

        }

}
</script>
