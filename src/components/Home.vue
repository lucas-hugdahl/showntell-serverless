<template>
  <div class="home">
    <h1 class="home__bg">SHOW<br>AND<br>TELL</h1>
    <div class="home__container">
      <div class="home__nav" :class="{disabled: requestSucess}">
        <button :class="{active: activeTab == 0}" @click="activeTab = 0; requestError = null; requestSucess = null">Create</button>
        <button :class="{active: activeTab == 1}" @click="activeTab = 1; requestError = null; requestSucess = null">Sign In</button>
      </div>

      <div class="home__err">
        <p style="color:green;" v-if="requestSucess">{{requestSucess}}</p>
        <p style="color:red;" v-else-if="requestError">{{requestError}}</p>
      </div>


      <form v-if="activeTab == 0" @submit.prevent="createUser()" :class="{loading: isLoading, success: requestSucess}">
        <div class="form-content">
          <input v-model="newUserData.name" placeholder="Name"/>
          <input v-model="newUserData.username" placeholder="Username"/>
          <input v-model="newUserData.password" placeholder="Password" type="password"/>
          <button type="submit">{{isCreating && !requestSucess ? 'Loading...' : 'Create'}}</button>
        </div>
        <img class="form-loader" :src="loader"/>
        <img class="form-success" :src="check"/>
      </form>
      <form v-if="activeTab == 1" @submit.prevent="loginUser()" :class="{loading: isLoading, success: requestSucess}">
        <div class="form-content">
          <input v-model="loginUserData.username" placeholder="Username"/>
          <input v-model="loginUserData.password" placeholder="Password" type="password"/>
          <button type="submit">{{isLogingIn && !requestSucess ? 'Loading...' : 'Login'}}</button>
        </div>
        <img class="form-loader" :src="loader"/>
        <img class="form-success" :src="check"/>
      </form>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import loader from "@/assets/giphy.gif"
import check from "@/assets/check.png"
export default {
  components: {
    
  },
  data() {
    return {
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
      }
    }
  },
  methods: {
    createUser() {
      this.isLoading = true;
      this.requestSucess = null
      this.requestError = null
      axios({
        method: 'post',
        url: 'http://localhost:9000/.netlify/functions/user-create',
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
        url: 'http://localhost:9000/.netlify/functions/user-auth',
        data: JSON.stringify(this.loginUserData),
      })
      .then(() => {
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

    &__bg {
      position: absolute;
      width: 100%;
      margin: 0;
      left: 0;
      top: 0;
      text-align: left;
      color: white;
      opacity: .4;
      font-size: 15rem;
      pointer-events: none;
    }

    &__container {
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
</style>