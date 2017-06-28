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

.perfect_id {
    background-color: #F5F5F5;
    position: relative;
    height: 100vh;
    .box {
        background-color: #F5F5F5;
        padding-top: 20px;
        padding-bottom: 30px;
        height: 92vh;
        overflow-y: auto;
    }
    .title_1 {
        padding-top: 20px;
        font-size: 17px;
        color: #0C9E4C;
        line-height: 17px;
    }
    .title_2 {
        font-size: 14px;
        line-height: 14px;
        color: #808080;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .search_box {
        background-color: #fff;
        padding: 18px 13px;
        .search {
            padding: 7px 13px;
            border: 1px solid #ccc;
            border-radius: 17px;
            display: flex;
            flex-direction: row;
            position: relative;
            .icon {
                height: 20px;
            }
            .cancel {
                height: 20px;
            }
            input {
                flex: 1;
                margin-left: 10px;
            }
            .data {
                position: absolute;
                left: 0;
                z-index: 30;
                width: 100%;
                height: 220px;
                overflow-y: scroll;
                text-align: left;
                background-color: #fff;
                top: 36px;
                .search_data {
                    background-color: #e6e6e6;
                    font-size: 15px;
                    color: #000;
                    padding: 5px 10px;
                }
            }
        }
        .selected {
            font-size: 15px;
            background-color: #fff;
            padding: 0px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .todo {
                padding: 6px 13px;
                background-color: #fff;
                border: 1px solid #FF0000;
                border-radius: 3px;
                margin-left: 17px;
                margin-top: 14px;
                color: #FF0000;
                position: relative;
                img {
                    position: absolute;
                    height: 16px;
                    right: -8px;
                    top: -8px;
                }
            }
        }
    }
    .hot {
        .title {
            text-align: left;
            padding: 13px 17px;
            font-size: 16px;
            color: #000;
            span {
                font-size: 14px;
                color: #666;
            }
        }
        .main {
            font-size: 15px;
            background-color: #fff;
            padding: 15px 17px 10px 9px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .item {
                padding: 6px 13px;
                background-color: #F5F5F5;
                border-radius: 3px;
                margin-left: 17px;
                margin-bottom: 14px;
                color: #888888;
            }
        }
    }
    .footer {
        height: 8vh;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: #fff;
        div {
            flex: 1;
            height: 100%;
            line-height: 8vh;
        }
        .back {
            background-color: #FFC600;
        }
        .next {
            background-color: #FA6705;
        }
    }
}
</style>
<template>
    <div class="perfect_id">
        <div class="box">
            <div class="title_1">您主要会什么忍术</div>
            <div class="title_2">我们会实时推送相关忍术至您的手机</div>
            <div class="search_box">
                <div class="search">
                    <img src="/static/icon/search.png" class="icon">
                    <input type="text" placeholder="输入品种后，点击出现的选项" v-model="value">
                    <img src="/static/icon/cancels.png" class="cancel" v-show="value" @click="clear">
                    <div class="data" v-if="datas.length > 0">
                        <div class="search_data" v-for="todo in datas" @click="getSearch(todo)">
                            {{todo.breedName}}
                        </div>
                    </div>
                </div>
                <div class="selected" v-if="arr.length > 0">
                    <div class="todo" v-for="todo in arr">
                        {{todo}}
                        <img src="/static/icon/red-canel.png" @click="clearArr(todo)">
                    </div>
                </div>
            </div>
            <div class="hot">
                <div class="title">
                    热门人物 <span>(最少一个人物，最多三个人物)</span>
                </div>
                <div class="main">
                    <div class="item" v-for="todo in todos" @click="selected(todo)">
                        {{todo.keyWord}}
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="back" @click="back">返回上一步</div>
            <!-- <div class="next" @click="next">完成注册</div> -->
        </div>
    </div>
</template>
<script>
import common from '../common/common.js'
export default {
    data() {
            return {
                value: '',
                todos: [],
                arr: [],
                datas: []
            }
        },
        components: {

        },
        created() {
            this.hotDrug();
        },
        methods: {
            hotDrug() {
                let _self = this;
                _self.$http.get('/static/data/hotList.json').then((suc) => {
                        _self.todos = suc.body;
                    }).catch((err) => {
                        common.$emit('message', 'sorry,加载错误~~')
                    })
            },
            back() {
               window.history.go(-1)
            },
            clear() {
                let _self = this;
                _self.value = '';
                _self.datas = [];
            },
            selected(todo) {
                let _self = this;
                if (_self.datas.length == 0) {
                    if (_self.arr.length < 3) {
                        for (var i = 0; i < _self.arr.length; i++) {
                            if (_self.arr[i] == todo.keyWord) {
                                common.$emit('message', '请不要重复选择同一个人物！')
                                return
                            }
                        }
                        _self.arr.push(todo.keyWord);
                    } else {
                        common.$emit('message', '您选择的品种已经超过三个！')
                    }
                }

            },
            getSearch(todo) {
                let _self = this;
                _self.datas = [];
                _self.value = '';
                if (_self.arr.length < 3) {
                    for (var i = 0; i < _self.arr.length; i++) {
                        if (_self.arr[i] == todo.breedName) {
                            common.$emit('message', '请不要重复选择同一个人物！')
                            return
                        }
                    }
                    _self.arr.push(todo.breedName);
                } else {
                    common.$emit('message', '您选择的人物已经超过三个！')
                }
            },
            clearArr(todo) {
                let _self = this;
                for (var i = 0; i < _self.arr.length; i++) {
                    if (_self.arr[i] == todo) {
                        _self.arr.splice(i, 1);
                    }
                }
            }
        },
        watch: {
            value: function(newValue, oldValue) {
                let _self = this;
                window.clearTimeout(this.time);
                this.time = setTimeout(() => {
                    if (_self.value) {
                        _self.$http.get('/static/data/search.json').then((suc) => {

                                _self.datas = suc.body;
                            }).catch((err) => {
                                common.$emit('message', 'sorry,加载错误~~')
                            })
                    } else {
                        _self.datas = [];
                    }
                }, 300)
            }
        },
        mounted() {
            // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
            //this.wrapperHeight = window.screen.height - this.$refs.wrapper.getBoundingClientRect().top;
            //alert()
        }
}
</script>
