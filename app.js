const store = Vuex.createStore({
  state () {
    return {
      result: {},
      success: true
    }
  },
  mutations: {
		setSuccess(state, success) {
			state.success = success
		},
		setDescription(state, payload) {
			state.result[payload.id].extract = payload.extract;
		},
		setData(state, data) {
			state.result = data
		}
  }
})

const comp = {
  template: `
    <div class="row" v-if="$store.state.success">
      <div v-for="i in Object.keys(this.$store.state.result)" class="col">
        <div class="card">
          <div class="card-body">
						<h4>{{ $store.state.result[i].title }}</h4>
						<p class="card-text">{{ $store.state.result[i].desc }}</p>
						<p class="d-inline-flex gap-1">
							<button type="button" data-bs-toggle="collapse" :data-bs-target="'#wiki_expand_'+$store.state.result[i].wiki_id" aria-expanded="false" :aria-controls="'wiki_expand_'+$store.state.result[i].wiki_id" @click="expand_desc($store.state.result[i].id, $store.state.result[i].wiki_id, $store.state.result[i].title)" style="margin-left: 30px; background-color: white; box-shadow: 2px 0 2px 0">
							Expand
							</button>
						</p>
						<div class="collapse" :id="'wiki_expand_'+$store.state.result[i].wiki_id">
							<div class="card card-body">
								{{ $store.state.result[i].extract }}
							</div>
						</div>
					</div>
				</div>
      </div>
    </div>
    <div v-else>
      <h1 style="margin: 100px; margin-left: 420px;" class="display-6"> No data found </h1>
    </div>
  `,
  methods: {
    expand_desc: async function(id, wiki_id, title){
      fetch(`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURIComponent(title)}`)
        .then((response) => {
          console.log(response)
          if (!response.ok){
            console.log(`Response not okay`)
            throw new Error('HTTP error, status = ' + response.status);
          }
          return response.json()
        })
        .then(data => {
          console.log("Success:", data)
          store.commit('setDescription', {id: id, extract: data.query.pages[wiki_id]['extract']});
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
      fetch(`https://api.wikimedia.org/core/v1/wikipedia/en/search/title?q=${encodeURIComponent(this.title)}&limit=5`)
        .then((response) => {
          console.log(response)
          if (!response.ok){
            console.log(`Response not okay`)
						console.log(store.state.success)
            store.commit('setSuccess', false)
            console.log(store.state.success)
            throw new Error('HTTP error, status = ' + response.status);
          }
					store.commit('setSuccess', true)
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
						obj["wiki_id"] = data.pages[i].id
						obj["extract"] = ""
						search[i] = obj
						this.title = "";
          }
          console.log(search)
          store.commit('setData', search)
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