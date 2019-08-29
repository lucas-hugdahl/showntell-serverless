<template>
  <div class="home">
    <!-- Background -->
    <h1 class="home__bg">SHOW AND TELL CLOUD FUNCTIONS SHOW AND TELL CLOUD FUNCTIONS SHOW AND TELL CLOUD FUNCTIONS SHOW AND TELL CLOUD FUNCTIONS</h1>
    
    
    <div id="clouds">
      <div class="cloud x1"></div>
        <!-- Time for multiple clouds to dance around -->
        <div class="cloud x2"></div>
        <div class="cloud x3"></div>
        <div class="cloud x4"></div>
        <div class="cloud x5"></div>
    </div>
    
    <div class="home__container">
      <!-- Reset -->
      <button class="home__reset" @click="refreshPage()">
        <img :src="reset"/>
      </button>

      <!-- Nav tabs -->
      <div class="home__nav" v-if="activeTab != 3" :class="{disabled: requestSucess}">
        <button :class="{active: activeTab == 0}" @click="activeTab = 0; requestError = null; requestSucess = null">Create</button>
        <button :class="{active: activeTab == 1}" @click="activeTab = 1; requestError = null; requestSucess = null">Sign In</button>
      </div>

      <!-- Errow messages -->
      <div class="home__err">
        <p style="color:green;" v-if="requestSucess">{{requestSucess}}</p>
        <p style="color:red;" v-else-if="requestError">{{requestError}}</p>
      </div>

      <!-- Create form -->
      <form v-if="activeTab == 0" @submit.prevent="createUser()" :class="{loading: isLoading, success: requestSucess}">
        <div class="form-content">
          <input v-model="newUserData.name" placeholder="Name"/>
          <input v-model="newUserData.username" placeholder="Username"/>
          <input v-model="newUserData.password" placeholder="Password" type="password"/>
          <button type="submit">Create</button>
        </div>
        <img class="form-loader" :src="loader"/>
        <img class="form-success" :src="check"/>
      </form>

      <!-- Login form -->
      <form v-if="activeTab == 1" @submit.prevent="loginUser()" :class="{loading: isLoading, success: requestSucess}">
        <div class="form-content">
          <input v-model="loginUserData.username" placeholder="Username"/>
          <input v-model="loginUserData.password" placeholder="Password" type="password"/>
          <button type="submit">Login</button>
        </div>
        <img class="form-loader" :src="loader"/>
        <img class="form-success" :src="check"/>
      </form>


      <!-- Show user on login -->
      <div class="home__user" v-if="activeTab == 3">
        <h3>{</h3>
        <h3 v-for="(value, name) in currentUser" :key="name">
            <strong>{{name}}:</strong>
          {{value}}
        </h3>
        <h3>}</h3>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import loader from "@/assets/giphy.gif"
import check from "@/assets/check.png"
import reset from "@/assets/reset.png"
import CONSTANTS from "@/CONSTANTS";
export default {
  components: {
    
  },
  data() {
    return {
      reset,
      loader,
      check,
      activeTab: 0,
      isLoading: false,
      requestSucess: null,
      requestError: null,
      isLoggedIn: false,
      newUserData: {
        name: "",
        username: "",
        password: ""
      },
      loginUserData: {
        username: "",
        password: ""
      },
      currentUser: {
        name: "",
        username: "",
        password: ""
      }
    }
  },
  methods: {
    refreshPage() {
      location.reload();
    },
    createUser() {
      this.isLoading = true;
      this.requestSucess = null
      this.requestError = null
      axios({
        method: 'post',
        url:  `${CONSTANTS.API_ENDPOINT}/user-create`,
        data: JSON.stringify(this.newUserData),
      })
      .then(() => {
        this.requestSucess = "User created";
        this.isLoading = false;
      })
      .catch((error) => {
        this.requestError = error.response.data;
        this.isLoading = false;
      });
    },
    loginUser() {
      this.isLoading = true;
      this.requestSucess = null
      this.requestError = null
      axios({
        method: 'post',
        url: `${CONSTANTS.API_ENDPOINT}/user-auth`,
        data: JSON.stringify(this.loginUserData),
      })
      .then((response) => {
        this.activeTab = 3;
        this.currentUser = response.data;
        this.requestError = null;
        this.requestSucess = "Login Success";
        this.isLoading = false;
      })
      .catch((error) => {
        this.requestSucess = null;
        this.requestError = error.response.data;
        this.isLoading = false;
      });
    }
  }
}
</script>

<style lang="scss">
  .home {
    width: 100vw;
    height: 100vh;
    background: rgb(24, 113, 185);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
    position: relative;

    &__user {
      text-align: left;
      h3 {
        text-align: left;
      }
    }

    &__reset {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 40px;
      height: 40px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border-width: 0;
      &:hover {
        cursor: pointer;
      }
      img {
        width: 100%;
      }
    }

    &__bg {
      position: absolute;
      width: 100%;
      margin: 0;
      left: 0;
      top: 0;
      text-align: left;
      color: white;
      opacity: .5;
      font-size: 10rem;
      line-height: 10rem;
      pointer-events: none;
      z-index:  1;
    }

    &__container {
      z-index:  2;
      position: relative;
      margin-top: 20vh;
      background: white;
      border-radius: 5px;
      box-shadow: 4px 4px 7px 2px rgb(0, 0, 0);
      padding: 2rem;
    }

    &__nav {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      &.disabled {
        opacity: .5;
        pointer-events: none;
      }

      button {
        height: 100%;
        width: 40%;
        border: none;
        font-size: 1.2rem;
        border-width: 0 0 4px 0;
        border-color: rgba(24, 112, 185, 0);
        border-style: solid;
        &:hover {
          cursor: pointer;
          border-color: rgb(208, 222, 233);
        }
        &:focus {
          outline: 0;
        }
        &.active {
          border-color: rgb(24, 113, 185);
        }
      }
    }

    &__err {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        margin: 0;
      }
    }
  }


  form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100% - 40px);
    position: relative;
    img {
      display: none;
      position: absolute;
      left: 50%;
      top: 50%;
      height: 75%;
      transform: translate(-50%, -50%)
    }

    &.loading {
      .form-loader {
        display: block;
      }

      .form-content {
        opacity: 0;
        pointer-events: none;
      }
    }

    &.success {
      .form-loader {
        display: none;
      }
      .form-success{
        display: block;
      }
      .form-content {
        opacity: 0;
        pointer-events: none;
      }
    }

    .form-content {
      max-width: 300px;
      input {
        border-radius: 5px;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(0, 0, 0, 0.37);
        padding: 10px 10px;
        font-size: 16px;
        width: 100%;
        margin-bottom: 16px;
      }

      button {
        padding: 10px 64px;
        background: rgb(51, 148, 51);
        color: white;
        appearance: none;
        border-width: 0;
        border-radius: 5px;
        font-size: 16px;
        margin-top: 16px;
      }
    }
  }


  #clouds{
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
	padding: 100px 0;
	background: #c9dbe986;
	background: -webkit-linear-gradient(top, #c9dbe9 0%, #fff 100%);
	background: -linear-gradient(top, #c9dbe9 0%, #fff 100%);
	background: -moz-linear-gradient(top, #c9dbe9 0%, #fff 100%);
}

/*Time to finalise the cloud shape*/
.cloud {
	width: 200px; height: 60px;
	background: #fff;
	
	border-radius: 200px;
	-moz-border-radius: 200px;
	-webkit-border-radius: 200px;
	
	position: relative; 
}

.cloud:before, .cloud:after {
	content: '';
	position: absolute; 
	background: #fff;
	width: 100px; height: 80px;
	position: absolute; top: -15px; left: 10px;
	
	border-radius: 100px;
	-moz-border-radius: 100px;
	-webkit-border-radius: 100px;
	
	-webkit-transform: rotate(30deg);
	transform: rotate(30deg);
	-moz-transform: rotate(30deg);
}

.cloud:after {
	width: 120px; height: 120px;
	top: -55px; left: auto; right: 15px;
}

/*Time to animate*/
.x1 {
	-webkit-animation: moveclouds 15s linear infinite;
	-moz-animation: moveclouds 15s linear infinite;
	-o-animation: moveclouds 15s linear infinite;
}

/*variable speed, opacity, and position of clouds for realistic effect*/
.x2 {
	left: 200px;
	
	-webkit-transform: scale(0.6);
	-moz-transform: scale(0.6);
	transform: scale(0.6);
	opacity: 0.6; /*opacity proportional to the size*/
	
	/*Speed will also be proportional to the size and opacity*/
	/*More the speed. Less the time in 's' = seconds*/
	-webkit-animation: moveclouds 25s linear infinite;
	-moz-animation: moveclouds 25s linear infinite;
	-o-animation: moveclouds 25s linear infinite;
}

.x3 {
	left: -250px; top: -200px;
	
	-webkit-transform: scale(0.8);
	-moz-transform: scale(0.8);
	transform: scale(0.8);
	opacity: 0.8; /*opacity proportional to the size*/
	
	-webkit-animation: moveclouds 20s linear infinite;
	-moz-animation: moveclouds 20s linear infinite;
	-o-animation: moveclouds 20s linear infinite;
}

.x4 {
	left: 470px; top: -250px;
	
	-webkit-transform: scale(0.75);
	-moz-transform: scale(0.75);
	transform: scale(0.75);
	opacity: 0.75; /*opacity proportional to the size*/
	
	-webkit-animation: moveclouds 18s linear infinite;
	-moz-animation: moveclouds 18s linear infinite;
	-o-animation: moveclouds 18s linear infinite;
}

.x5 {
	left: -150px; top: -150px;
	
	-webkit-transform: scale(0.8);
	-moz-transform: scale(0.8);
	transform: scale(0.8);
	opacity: 0.8; /*opacity proportional to the size*/
	
	-webkit-animation: moveclouds 20s linear infinite;
	-moz-animation: moveclouds 20s linear infinite;
	-o-animation: moveclouds 20s linear infinite;
}

@-webkit-keyframes moveclouds {
	0% {margin-left: 1000px;}
	100% {margin-left: -1000px;}
}
@-moz-keyframes moveclouds {
	0% {margin-left: 1000px;}
	100% {margin-left: -1000px;}
}
@-o-keyframes moveclouds {
	0% {margin-left: 1000px;}
	100% {margin-left: -1000px;}
}
</style>