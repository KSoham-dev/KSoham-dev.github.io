const store = Vuex.createStore({
  state () {
    return {
      result: {},
      success: true
    }
  },
  mutations: {
    setData(state, data) {
      state.result = data
    }
  }
})

const comp = {
    data() {
      return {
        exapnd: false
      }
    },
    template: `
    <div class="row" v-if="this.$store.state.success">
        <div v-for="i in Object.keys(this.$store.state.result)" class="col">
          <div class="card">
            <div class="card-body">
                      <h4> {{this.$store.state.result[i].title}} </h4>
                      <p class="card-text"> {{this.$store.state.result[i].desc}} </p>
                      <button @click="expand_desc(this.$store.state.result[i].id)" style="margin-left: 30px; background-color: white; box-shadow: 2px 0 2px 0;"> Expand </button>
            </div>
          </div>
        </div>
    </div>
    <div v-else>
        <h1 style="margin: 100px; margin-left: 420px;" class="display-6"> No data found </h1>
    </div>
    `,
    methods: {
      expand_desc: async function(id){
        for (obj in store.state.result){
          console.log(obj)
        }
        title="earth"
        fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Earth`,{
          method: "GET",
          headers: {
            mode: "no-cors",
            "Access-Control-Allow-Credentials": false,
            "Access-Control-Allow-Origin": true
          }
        })
        .then((response) => {
         console.log(response)
         if (!response.ok){
            console.log(`Response not okay`)
            throw new Error('HTTP error, status = ' + response.status);
         }
         return response.text()
     })
         .then(data => {
              console.log("Success:", data)
             })
         .catch((e) => {
              console.error('@SKdebugger Error:', e)
     })
     }
    }
  };


const app = Vue.createApp({
  data() {
    return {
      title: "",
    }
  },

  methods: {
    Submit: async function(){
       fetch(`https://api.wikimedia.org/core/v1/wikipedia/en/search/title?q=${this.title}&limit=5`)
       .then((response) => {
        console.log(response)
        if (!response.ok){
            console.log(`Response not okay`)
            console.log(store.state.success)
            store.state.success = false
            console.log(store.state.success)
            throw new Error('HTTP error, status = ' + response.status);
        }
        return response.json()
    })
        .then(data => {
              console.log("Success:", data)
              let search = {};
              for (let i=0; i < data.pages.length; i++){
                let obj={}
                obj["id"] = i
                obj["title"] = data.pages[i].title
                obj["desc"] = data.pages[i].description
                obj["expand"] = false
                search[i] = obj 
                this.title = "";
            }
            store.state.success = true
            console.log(store.state.success)
            console.log(search)
            this.$store.commit('setData', search)
            console.log(this.$store.state.result)
            })
        .catch((e) => {
              console.error('@SKdebugger Error:', e)
    })
    }
} 
    });
app.use(store)
app.component('searchrcomp', comp)
app.mount('#app')