<template>
  <div class="home">
    <div class="home__container">
      <div class="home__nav">
        <button :class="{active: activeTab == 0}" @click="activeTab = 0">Create</button>
        <button :class="{active: activeTab == 1}" @click="activeTab = 1">Sign In</button>
      </div>

      <form v-if="activeTab == 0" @submit.prevent="createUser()">
        <div class="form-content">
          <input v-model="newUserData.name" placeholder="Name"/>
          <input v-model="newUserData.username" placeholder="Username"/>
          <input v-model="newUserData.password" placeholder="Password"/>
          <button type="submit">{{isCreating ? 'Loading...' : 'Create'}}</button>
        </div>
      </form>
      <form v-if="activeTab == 1" @submit.prevent="loginUser()">
        <div class="form-content">
          <input v-model="loginUserData.username" placeholder="Username"/>
          <input v-model="loginUserData.password" placeholder="Password"/>
          <button type="submit">{{isLogingIn ? 'Loading...' : 'Login'}}</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {
    
  },
  data() {
    return {
      activeTab: 0,
      isCreating: false,
      isLogingIn: false,
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
      axios.post('https://awesome-bartik-15953b.netlify.com/.netlify/functions/user-create', this.newUserData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    loginUser() {
      axios.post('https://awesome-bartik-15953b.netlify.com/.netlify/functions/user-auth', this.loginUserData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
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

    &__container {
      margin-top: 25%;
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
      margin-bottom: 32px;

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
          background: rgb(245, 244, 244);
        }
        &:focus {
          outline: 0;
        }
        &.active {
          border-color: rgb(24, 113, 185);
        }
      }
    }
  }


  form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100% - 40px);

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