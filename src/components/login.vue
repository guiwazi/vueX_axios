<template>
<div id="backgroundCanvas">
  <div class="content">
    <span>Welcome</span>
    <!-- login -->
    <div class="loginContent" v-show="loginShow === 1">
      <p>用户名：</p>
      <el-input
      placeholder="请输入用户名，由6位汉字组成"
      v-model="loginForm.loginName"
      style="width:300px;"
      clearable>
      </el-input>
      <p>密码：</p>
      <el-input
      type="password"
      placeholder="由数字字母组成，6-18位"
      v-model="loginForm.loginPassword"
      style="width:300px;"
      clearable>
      </el-input>
      <div class="btn">
        <el-button @click="login()" type="primary">登陆</el-button>
        <el-button @click="regBtn()">注册</el-button>
      </div>
    </div>
    <!-- reg -->
    <div class="regContent" v-show="regShow === 1">
      <p>用户名：</p>
      <el-input
      placeholder="请输入用户名，由6位汉字组成"
      v-model="regForm.regName"
      style="width:300px;"
      clearable>
      </el-input>
      <p>密码：</p>
      <el-input
      type="password"
      placeholder="由数字字母组成，6-18位"
      v-model="regForm.regPassword"
      style="width:300px;"
      clearable>
      </el-input>
      <p>确认密码：</p>
      <el-input
      type="password"
      placeholder="请重复密码"
      v-model="regForm.regSurePassword"
      style="width:300px;"
      clearable>
      </el-input>
      <div class="btn">
        <el-button @click="reg()" type="primary">确定</el-button>
        <el-button @click="goLogin()">取消</el-button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import $ from 'jquery'
export default{
  data () {
    return {
      loginForm: {
        loginName: '',
        loginPassword: ''
      },
      // login
      loginShow: 1,
      // reg
      regForm: {
        regName: '',
        regPassword: '',
        regSurePassword: ''
      },

      regShow: 2
    }
  },
  computed: {
  },
  mounted () {
    let maxParticles = 100
    let particles = []
    let frequency = 100
    let initNum = maxParticles
    let maxTime = frequency * maxParticles
    let timeToRecreate = false

    // Enable repopolate
    setTimeout(function () {
      timeToRecreate = true
    }, maxTime)

    // Popolate particles
    popolate(maxParticles)

    let tela = document.createElement('canvas')
    tela.width = $('#backgroundCanvas').width()
    tela.height = $('#backgroundCanvas').height()
    $('#backgroundCanvas').append(tela)

    let canvas = tela.getContext('2d')

    class Particle {
      constructor (canvas, options) {
        let colors = ['#feea00', '#a9df85', '#5dc0ad', '#ff9a00', '#fa3f20']
        let types = ['full', 'fill', 'empty']
        this.random = Math.random()
        this.canvas = canvas
        this.progress = 0

        this.x = ($('#backgroundCanvas').width() / 4) + (Math.random() * 200 - Math.random() * 200)
        this.y = ($('#backgroundCanvas').height() / 2) + (Math.random() * 200 - Math.random() * 200)
        this.w = $('#backgroundCanvas').width()
        this.h = $('#backgroundCanvas').height()
        this.radius = 1 + (8 * this.random)
        this.type = types[this.randomIntFromInterval(0, types.length - 1)]
        this.color = colors[this.randomIntFromInterval(0, colors.length - 1)]
        this.a = 0
        this.s = (this.radius + (Math.random() * 1)) / 10
        // this.s = 12 //Math.random() * 1;
      }

      getCoordinates () {
        return {
          x: this.x,
          y: this.y
        }
      }

      randomIntFromInterval (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

      render () {
        // Create arc
        let lineWidth = 0.2 + (2.8 * this.random)
        let color = this.color
        switch (this.type) {
          case 'full':
            this.createArcFill(this.radius, color)
            this.createArcEmpty(this.radius + lineWidth, lineWidth / 2, color)
            break
          case 'fill':
            this.createArcFill(this.radius, color)
            break
          case 'empty':
            this.createArcEmpty(this.radius, lineWidth, color)
            break
        }
      }

      createArcFill (radius, color) {
        this.canvas.beginPath()
        this.canvas.arc(this.x, this.y, radius, 0, 2 * Math.PI)
        this.canvas.fillStyle = color
        this.canvas.fill()
        this.canvas.closePath()
      }

      createArcEmpty (radius, lineWidth, color) {
        this.canvas.beginPath()
        this.canvas.arc(this.x, this.y, radius, 0, 2 * Math.PI)
        this.canvas.lineWidth = lineWidth
        this.canvas.strokeStyle = color
        this.canvas.stroke()
        this.canvas.closePath()
      }

      move () {
        this.x += Math.cos(this.a) * this.s
        this.y += Math.sin(this.a) * this.s
        this.a += Math.random() * 0.4 - 0.2

        if (this.x < 0 || this.x > this.w - this.radius) {
          return false
        }

        if (this.y < 0 || this.y > this.h - this.radius) {
          return false
        }
        this.render()
        return true
      }

      calculateDistance (v1, v2) {
        let x = Math.abs(v1.x - v2.x)
        let y = Math.abs(v1.y - v2.y)
        return Math.sqrt((x * x) + (y * y))
      }
    }

    /*
 * Function to clear layer canvas
 * @num:number number of particles
 */
    function popolate (num) {
      for (let i = 0; i < num; i++) {
        setTimeout(
          (function (x) {
            return function () {
              // Add particle
              particles.push(new Particle(canvas))
            }
          }(i))
          , frequency * i)
      }
      return particles.length
    }

    function clear () {
      // canvas.globalAlpha=0.04;
      canvas.fillStyle = '#111111'
      canvas.fillRect(0, 0, tela.width, tela.height)
      // canvas.globalAlpha=1;
    }

    function connection () {
      let oldElement = null
      $.each(particles, function (i, element) {
        if (i > 0) {
          let box1 = oldElement.getCoordinates()
          let box2 = element.getCoordinates()
          canvas.beginPath()
          canvas.moveTo(box1.x, box1.y)
          canvas.lineTo(box2.x, box2.y)
          canvas.lineWidth = 0.45
          canvas.strokeStyle = '#3f47ff'
          canvas.stroke()
          canvas.closePath()
        }

        oldElement = element
      })
    }

    /*
 * Function to update particles in canvas
 */
    function update () {
      clear()
      connection()
      particles = particles.filter(function (p) { return p.move() })
      // Recreate particles
      if (timeToRecreate) {
        if (particles.length < initNum) { popolate(1) }
      }
      requestAnimationFrame(update.bind(this))
    }

    update()
  },
  methods: {
    reg () {
      let rName = /[\u4e00-\u9fa5]{6}/
      let rPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      if ((rName.test(this.regForm.regName))) {
        if ((rPassword.test(this.regForm.regPassword))) {
          if (this.regForm.regPassword === this.regForm.regSurePassword) {
            let data = {
              name: this.regForm.regName,
              password: this.regForm.regPassword
            }
            this.$store.dispatch('user/getReg', data).then(res => {
              if (res.data.code === 100) {
                this.$message({
                  message: res.data.Message,
                  type: 'warning'
                })
              } else {
                this.$message({
                  message: res.data.Message,
                  type: 'success'
                })
                this.goLogin()
              }
            })
          } else {
            this.$message({
              message: '两次输入的密码不一致！',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '请输入正确的密码！',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请输入正确的用户名！',
          type: 'warning'
        })
      }
    },
    regBtn () {
      this.loginShow = 2
      this.regShow = 1
    },
    goLogin () {
      this.loginShow = 1
      this.regShow = 2
    },
    // 登陆
    login () {
      let rName = /[\u4e00-\u9fa5]{6}/
      if ((rName.test(this.loginForm.loginName))) {
        let data = {
          name: this.loginForm.loginName,
          password: this.loginForm.loginPassword
        }
        this.$store.dispatch('user/login', data).then(res => {
          if (res.data.code === 100) {
            this.$message({
              message: res.data.Message,
              type: 'warning'
            })
          } else {
            this.$message({
              message: res.data.Message,
              type: 'success'
            })
            // 存储用户id
            localStorage.setItem('_id', res.data._id)
            this.$router.push({path: '/home'})
          }
        })
      } else {
        this.$message({
          message: '请输入正确的用户名！',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
#backgroundCanvas {
  z-index: 1!important;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .content{
    position: absolute;
    border-radius: 10px;
    width: 600px;
    height: 460px;
    left: 50%;
    top:50%;
    transform: translate(40%, -60%);
    background:linear-gradient(rgba(255,0,255,0.8),rgba(0,219,888,0.7),rgba(17,17,17,0.6));
    span{
      font-size: 36px;
      line-height: 80px;
      color:#ffffff;
    }
    p{
      font-size: 16px;

      display: block;
      line-height:32px;
      margin: 20px 0 0 -220px;
    }
    .btn{
      margin:30px 0 0 0;
    }
  }
}
</style>
