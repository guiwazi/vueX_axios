<template>
    <div class="content">
        <h2 class="contentTitle">用户信息</h2>
        <div class="userInfo">
            <div class="imgContent">
              <img :src="userInfo.data === undefined ? '暂无数据' : userInfo.data.img" alt="用户头像">
            </div>
            <span><strong>用户名：</strong>
            <p v-show="showPage === 1">{{userInfo.data === undefined ? '暂无数据' : userInfo.data.username}}</p>
            <el-input
              v-show="editPage === 1"
              placeholder="请输入你的用户名"
              class="editInput"
              v-model="edit.username"
              clearable>
            </el-input>
            </span>
            <span><strong>性别：</strong>
            <p v-show="showPage === 1">{{userInfo.data === undefined ? '暂无数据' : userInfo.data.gender}}</p>
            <el-input
              v-show="editPage === 1"
              class="editInput"
              placeholder="请输入你的性别"
              v-model="edit.gender"
              clearable>
            </el-input>
            </span>
            <span><strong>年龄：</strong>
            <p v-show="showPage === 1">{{userInfo.data === undefined ? '暂无数据' : userInfo.data.age}}岁</p>
            <el-input
              v-show="editPage === 1"
              class="editInput"
              placeholder="请输入你的年龄"
              v-model="edit.age"
              clearable>
            </el-input>
            </span>
            <el-button type="text" class="buttonCan" v-show="editPage === 1" @click="CanUserInfo()">取消</el-button>
             <el-button type="primary" icon="el-icon-edit" v-show="showPage === 1" class="buttonEdit" circle @click="editUserInfo()"></el-button>
             <el-button type="primary"  v-show="editPage === 1" class="buttonEdit"  @click="submitBtn()">确定</el-button>
        </div>
        <router-link to="/table"><el-button type="primary" class="buttonEdit">Table</el-button></router-link>
    </div>
</template>
<script>
export default{
  data () {
    return {
      showPage: 1,
      editPage: 0,
      id: '',
      edit: {
        username: '',
        gender: '',
        age: ''
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    }
  },
  mounted () {
    this.id = localStorage.getItem('_id')
    this.$nextTick(function () {
      this.$store.dispatch('user/userInfo', this.id).then(res => {
        this.edit = res.data
      })
    })
  },
  methods: {
    submitBtn () {
      let params = Object.assign({}, this.edit)
      this.$delete(params, 'habby')
      this.$delete(params, 'img')
      this.$delete(params, 'password')
      this.$store.dispatch('user/editUserInfo', params).then(res => {
        this.$store.dispatch('user/userInfo', this.id).then(res => {
          this.edit = res.data
          this.CanUserInfo()
        })
        this.$message({
          message: res.data.Message,
          type: 'success'
        })
      })
    },
    editUserInfo () {
      this.showPage = 0
      this.editPage = 1
      this.$store.dispatch('user/userInfo', this.id).then(res => {
        this.edit = res.data
      })
    },
    CanUserInfo () {
      this.showPage = 1
      this.editPage = 0
      this.$store.dispatch('user/userInfo', this.id).then(res => {
      })
    }
  }
}
</script>
<style scoped lang="scss">
.content{
    .contentTitle{
        font-family: "PingFang SC";
    }
    .userInfo{
        width: 600px;
        height: 480px;
        margin:20px auto;
        border-radius: 5px;
        border: 1px solid #bcbcbc;
        box-shadow: #d8d6d9 1px 1px 1px;
        position: relative;
        .imgContent{
            margin: 10px auto;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 120px;
                height: 120px;
                border-radius: 50%;
                transition: all 0.2s;
                &:hover {
                    transform: scale(1.2);
                }
            }
        }
        span{
            width: 100%;
            height: 80px;
            display: block;
            // padding: 0 -20px 0 -20px;
            font-size: 16px;
            color:#333333;
            position: relative;
            strong{
                width: 300px;
                display: block;
                text-align: right;
                line-height: 80px;
            }
            p{
                position: absolute;
                top: 12px;
                left: 300px;
            }
        }
        .editInput{
            width: 300px;
            position: absolute;
            top: 60px;
            right:150px;
        }
        .buttonEdit{
            position: absolute;
            top: 420px;
            left: 280px;
        }
        .buttonCan{
            position: absolute;
            top: 0px;
            left: 560px;
        }
    }
}
</style>
