<template>
  <div class="pointPopup">
    <div class="pop-inner">
      <div class="pop-inner-view-point">
        <div class="pop-inner-view-title-point">{{ scopeData.tip === 1 ? '新增' : '编辑' }}物流信息</div>
        <i
          class="el-icon-close"
          @click="cancel('rule')"/>
        <!-- content -->
          <el-form :model="rule" :rules="rules" ref="rule" label-width="100px" class="demo-ruleForm">
          <ul class="point-ul">
            <li class="point-ul-li ">
              <el-form-item label="寄件人:" prop="name">
                <el-input v-model="rule.name"></el-input>
              </el-form-item>
            </li>
            <li class="point-ul-li ">
              <el-form-item label="联系电话:" prop="tel">
                <el-input v-model="rule.tel"></el-input>
              </el-form-item>
            </li>
            <li class="point-ul-li ">
              <el-form-item label="物流公司:" prop="company">
                <el-select v-model="rule.company" placeholder="请选择物流公司">
                  <el-option label="中通快递" value="中通快递"></el-option>
                  <el-option label="圆通快递" value="圆通快递"></el-option>
                  <el-option label="顺丰快递" value="顺丰快递"></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li class="point-ul-li ">
              <el-form-item label="物流单号：" prop="number">
                <el-input v-model="rule.number"></el-input>
              </el-form-item>
            </li>
            <li class="point-ul-li ">
              <el-form-item label="运输方式：" prop="transport">
                <el-select v-model="rule.transport" placeholder="请选择运输方式">
                  <el-option label="空运" value="空运"></el-option>
                  <el-option label="陆运" value="陆运"></el-option>
                  <el-option label="海运" value="海运"></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li class="point-ul-li ">
              <el-form-item label="备注：" prop="remarks">
                <el-input type="textarea" v-model="rule.remarks" placeholder="选填项，小于200字"></el-input>
              </el-form-item>
            </li>
          </ul>
          <el-form-item>
          <div class="pop-inner-view-btn-point">
            <el-button
              class="btn-point1"
              type="primary"
              @click="submit('rule')"
              >确定</el-button>
            <el-button
              class="btn-point2"
              @click="cancel('rule')"
              >取消</el-button>
          </div>
        </el-form-item>
          </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  props: {
    scopeData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    var REGName = function (rule, value, callback) {
      var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
      if ((regName.test(value))) {
        callback()
      } else {
        callback(new Error('提示!请输入正确的姓名!'))
      }
    }
    var REGTel = function (rule, value, callback) {
      var regTel = /^[1][3,4,5,7,8][0-9]{9}$/
      if ((regTel.test(value))) {
        callback()
      } else {
        callback(new Error('提示!请输入正确的电话号码!'))
      }
    }
    var REGNumber = function (rule, value, callback) {
      var regNumber = /^[1-9]\d{14,21}$/
      if ((regNumber.test(value))) {
        callback()
      } else {
        callback(new Error('提示!请输入正确的快递单号!'))
      }
    }
    return {
      rule: {
        name: '',
        tel: '',
        company: '',
        number: '',
        transport: '',
        remarks: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入寄件人名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
          { validator: REGName, trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: REGTel, trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请选择物流公司', trigger: 'change' }
        ],
        number: [
          { required: true, message: '请输入15位到22为物流单号', trigger: 'blur' },
          { min: 15, max: 22, message: '长度在 15 到 22 个字符', trigger: 'blur' },
          { validator: REGNumber, trigger: 'blur' }
        ],
        transport: [
          { required: true, message: '请选择运输方式', trigger: 'change' }
        ],
        remarks: [
          { min: 0, max: 200, message: '长度小于200个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    scopeData (vm) {
      if (vm.tip === 2) {
        Object.assign(this.rule, vm.data)
      }
    }
  },
  mounted () {
  },
  methods: {
    // 判断是新增还是编辑
    submit (rule) {
      if (this.scopeData.tip === 1) {
        // 执行新增
        this.addFoo(rule)
      } else {
        this.editFoo(rule)
      }
    },
    cancel (rule) {
      let data = {
        cancel: true
      }
      this.$refs[rule].resetFields()
      this.$emit('cancelPop', data)
    },
    // 新增
    addFoo (rule) {
      this.$refs[rule].validate((valid) => {
        if (valid) {
          this.$store.dispatch('table/addInfo', this.rule).then(res => {
            this.$message({
              type: 'success',
              message: res.data.Message
            })
            this.$emit('getTableList', {getTableList: true})
            this.$refs[rule].resetFields()
          })
        } else {
          return false
        }
      })
    },
    // 编辑
    editFoo (rule) {
      this.$refs[rule].validate((valid) => {
        if (valid) {
          this.$store.dispatch('table/modifyInfo', this.rule).then(res => {
            this.$message({
              type: 'success',
              message: res.data.Message
            })
            this.$emit('getTableList', {getTableList: true})
            this.$refs[rule].resetFields()
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
}
.pointPopup {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    .pop-inner {
    width: 600px;
    max-height: 500px;
    margin: 100px auto;
    }
  }
.pop-inner-view-point {
    float: left;
    width: 600px;
    height: auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
    font-size: 14px;
    text-align: left;
    background-color: #fff;

}
.pop-inner-view-title-point {
    height: 40px;
    padding: 0;
    line-height: 40px;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    background: #49a1ea;
}
.pop-table-wrapper-point {
    position: relative;
    width: 600px;
    height: auto;
    padding: 15px;
    padding-bottom: 30px;
}
.pop-inner-view-btn-point {
    padding: 25px 60px 15px 0;
    border-top: 1px solid #e7eaec;
    line-height: 60px;
}
.point-ul-li{
  width: 80%;
  margin: 0 auto;
  margin-top: 30px;
}
.point-ul-li span{
  float: left;
}
.pointImg{
  padding-right: 20px;
  line-height: 150px;
}
.btn-point1 {
    float: left;
    width: 100px;
    height: 40px;
    margin: 0 20px 20px 100px;
}
.btn-point2 {
  float: left;
  width: 100px;
  height: 40px;
  // margin-right: 180px;
}
/* icon */
.el-icon-close{
  float: right;
  margin: -35px 10px 0 0;
  font-size: 30px;
  color: #ffffff;

}
</style>
