<template>
  <div class="hello">
    <div v-if="isOnline"><div class="indicator online"></div> Yeah! page is online</div>
    <div v-if="!isOnline"><div class="indicator offline"></div> Page is not online :(</div>
    <button @click="fetchPokemon()">Fetch Pokemon</button>
    <div>{{pokemon.name}}</div>
    <button @click="createGist()">Create Gist</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data () {
    return {
      pokemon: {},
      isOnline: false
    };
  },
  methods: {
    async fetchPokemon () {
      this.pokemon = {};
      let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + (Math.floor(Math.random() * 150) + 1), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let result = await response.json();
      this.pokemon = result;
    },
    handleGistResponse (status) {
      alert('Yeah, this is an ugly browser alert popup. The status code was ' + status);
    },
    async createGist () {
      try {
        // will respond unauthorized sinse there are no attached credentials
        let response = await fetch('https://api.github.com/gists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            description: 'Fetch API Post example',
            public: true,
            files: {
              "test.js": {
                content: '// Enter some JavaScript here\n// e.g\nhello world'
              }
            }
          })
        });
        this.handleGistResponse(response.status);
      } catch (error) {
        alert('[ERROR]: ' + error.message);
      }
    },
    checkNetworkStatus () {
      this.isOnline = navigator.onLine;
    },
    serviceWorkerResponse (event) {
      const message = event.data;
      if (message.name === 'queueDidReplay') {
        message.transactions.forEach(({url, status, body}) => {
          if (url === 'https://api.github.com/gists') {
            this.handleGistResponse(status);
          }
        })
      }
    },
  },
  mounted () {
    window.addEventListener('online', this.checkNetworkStatus);
    window.addEventListener('offline', this.checkNetworkStatus);
    navigator.serviceWorker.addEventListener('message', this.serviceWorkerResponse);
    this.checkNetworkStatus();
  },
  beforeDestroy () {
    window.removeEventListener('online', this.checkNetworkStatus);
    window.removeEventListener('offline', this.checkNetworkStatus);
    navigator.serviceWorker.removeEventListener('message', this.serviceWorkerResponse);
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.indicator {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 100%;
}
.online {
  background-color: green;
}
.offline {
  background-color: red;
}
</style>
