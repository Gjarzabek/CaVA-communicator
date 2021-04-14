<template>
  <div>
    <Navi v-if="!appOpened" @login="showLogin"/>
    <router-view :userCredits="user" @logout="logout"/>
    <LoginPanel v-if="!appOpened"
    :show="loginVisable"
    :loginState="loginStatus"
    :registerState="registerStatus"
    @hideLogin="hideLogin"
    @login="loginRequest"
    @register="registerRequest"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginPanel from "@/components/LandingPage/LoginPanel.vue";
import Navi from "@/components/LandingPage/Navi.vue";
import {HttpClient} from "@/ts_classes/HttpClient";
import {SHA3} from 'sha3';
import {pbkdf2} from 'pbkdf2';
import {CTREncryptor, CTRDecryptor, Counter} from 'aes-ts';
import NodeRSA from 'node-rsa';

export default defineComponent({
    props: [],
    components: {Navi, LoginPanel},
    data() {
      return {
        loginVisable:false,
        user: {id:'', name:'', email:'', authToken: '', refresh: '', secret: ""},
        httpClient: new HttpClient(),
        loginStatus: {status: 'out', message: ''},
        registerStatus: '',
      };
    },
    methods: {
      showLogin() {
        this.loginVisable = true;
      },
      hideLogin() {
        this.loginVisable = false;
      },
      loginRequest(user: Map<string, string>) {
        const hash: SHA3<512> = new SHA3();
        const pass: any = user.get('pass');
        hash.update(pass);
        user.set('pass', hash.digest('hex'));
        this.httpClient.login(user,
        (data:any) => {
          this.loginStatus = {
            status: "out",
            message: "Odszyfrowywanie.."
          }
          pbkdf2(pass, `be4896cfa0f8pd2109141c41197${user.get('email')}jtg5`, 205092, 256 / 8, (err, derivedKey) => {
            if (err) {
              this.loginStatus = {status: 'out', message:"Błąd logowania"};
              console.warn(err);
              return;
            }
            else {
                this.loginStatus = {status: 'in', message:""};
                this.user = data.user;
                let deserializeS: any = this.user.secret;
                deserializeS = deserializeS.split(',').map((el: string) => {return parseInt(el)});
                const decryptor = new CTRDecryptor(derivedKey, new Counter(5));
                const decryptedKey = String.fromCharCode(...decryptor.decrypt(deserializeS));
                this.user.secret = decryptedKey;
                setTimeout(()=>{this.user.secret = ''; console.log(this.user.secret)}, 2000);
                this.$router.push('app');
            }
          });
        },
        (reponse:any)=>{
          console.warn(reponse);
          this.loginStatus = {
            status: "error",
            message: "Niepoprawne dane"
          }
        });
      },
      registerRequest(user: Map<string, any>) {
        this.registerStatus = "computing";
        setTimeout(()=>this.genRegisterCredits(user), 30);
      },
      logout() {
        this.httpClient.logout(this.user.authToken);
      },
      async genRegisterCredits(user: Map<string, any>): Promise<void> {
        const pass: any = user.get('pass');
        const hash: SHA3<512> = new SHA3();
        hash.update(pass);
        user.set('pass', hash.digest({format: 'hex'}));
        const nodersa = new NodeRSA({b:2048});
        user.set('public', nodersa.exportKey('public'));
        pbkdf2(pass, `be4896cfa0f8pd2109141c41197${user.get('email')}jtg5`, 205092, 256 / 8, (err, derivedKey) => {
          if (err) {
            this.registerStatus = "fatal";
            console.warn(err);
          }
          else {
            const AesKey = derivedKey;
            const encryptor = new CTREncryptor(AesKey, new Counter(5));
            const encryptedPrivateKey = encryptor.encrypt([...Buffer.from(nodersa.exportKey('private'))]);
            user.set('private', encryptedPrivateKey.toString());

            this.registerStatus = "loading";
            this.httpClient.register(user, ()=>{this.registerStatus="succeed"}, ()=>{this.registerStatus="failed"});
          }
        });
      }
    },
    computed: {
      appOpened: function() : boolean {
        return this.$route.name === "Main";
      }
    }
})
</script>

<style>

@font-face {
    font-family: NovaFlat;
    src: url(assets/NovaFlat-Regular.ttf);
}

@font-face {
    font-family: NovaCut;
    src: url(assets/NovaCut-Regular.ttf);
}

@font-face {
    font-family: NovaScript;
    src: url(assets/NovaScript-Regular.ttf);
}

@font-face {
    font-family: NovaSquare;
    src: url(assets/NovaSquare-Regular.ttf);
}

@font-face {
    font-family: Sen;
    src: url(assets/Sen-Regular.ttf);
}

body {
  background-color: #1d1d1d;
}

*::-webkit-scrollbar {
  background-color: rgba(255, 255, 255, 0.05);
  width: 0.7vw;
  border-radius: 1vh;
}

*::-webkit-scrollbar-track {
  width: 0.7vw;
  border-radius: 1vh;
  background-color: rgba(255, 255, 255, 0.05);
}

*::-webkit-scrollbar-thumb {
  border-radius: 1vh;
  background-color: rgb(32, 32, 32);
}

*::-webkit-scrollbar-thumb:hover {
  background-color: rgb(82, 130, 134);
}

.arrow {
  transition: 0.2s;
  border: solid #C6BDBD;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  margin-bottom: 1%;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.down {
  transform: rotate(45deg);
  margin-bottom: 2%;
  -webkit-transform: rotate(45deg);
}
  
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.dostępny {
  background-color: #63dd33;
}

.niedostępny {
  background-color: #0f0f0f;
}

.zaraz-wracam {
  background-color: #ff9900;
}

.zajęty {
  background-color: #e64444;
}

#app {
  font-family: NovaFlat, NovaCut, NovaScript, NovaSquare;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  cursor:default;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
