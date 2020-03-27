<template>
  <div>
    <search-focus @keyup="focusSearch" />
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="shrink"
        type="text"
        placeholder="Search (Press  &quot;/&quot; to focus)"
        v-model="query"
        @blur="searchResultsVisible = false"
        @focus="searchResultsVisible = true"
        @keydown.esc="searchResultsVisible = false"
        @input="softReset"
        ref="search"
        @keyup="performSearch"
        @keydown.up.prevent="highlightPrevious"
        @keydown.down.prevent="highlightNext"
        @keydown.enter="gotoLink"
        
      />

      

      <transition name="fade">
      <div v-if="query.length > 0 && searchResultsVisible" class="absolute normal-case bg-white border left-0 right-0 w-108 text-left mb-4 mt-2 rounded-lg shadow overflow-hidden z-10 overflow-y-auto" style="max-height: 32rem">
        <div class="flex flex-col" ref="results">
          <a
            v-for="(post, index) in searchResults"
            :key="index"
            :href="post.item.path"
            @mousedown.prevent="searchResultsVisible = true"
            class="border-b border-gray-400 text-xl cursor-pointer p-4 hover:bg-blue-100"
            :class="{ 'bg-blue-100': index === highlightedIndex }"
          >
            {{ post.item.avatar }}

            <span class="block font-normal text-sm my-1">{{ post.item.email }}</span>
          </a>

          <div v-if="searchResults.length === 0" class="font-normal w-full border-b cursor-pointer p-4">
            <p class="my-0">No results for '<strong>{{ query }}</strong>'</p>
          </div>
        </div>
      </div>
    </transition>

    
  </div>
</template>

<script>
import SearchFocus from './SearchFocus'
import axios from 'axios'
export default {
  components: {
    SearchFocus,
  },
  data() {
    return {
      query: '',
      searchResultsVisible: false,
      posts: [],
      searchResults: [],
      highlightedIndex: 0,
      options: {
        shouldSort: true,
        includeMatches: true,
        threshold: 0.5,
        location: 0,
        distance: 500,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['avatar', 'email']
      }
    }
  },
  created() {
    axios.get('https://reqres.in/api/users')
      .then(response => {
        console.log(response.data.data)
        this.posts = response.data.data
      
      })
  },
  methods: {
    reset() {
      this.query = ''
      this.highlightedIndex = 0
    },
    softReset() {
      this.searchResultsVisible = true
      this.highlightedIndex = 0
    },
    focusSearch(e) {
      if (e.key === '/') {
        this.$refs.search.focus()
      }
    },
    performSearch() {
      this.$search(this.query, this.posts, this.options)
        .then(results => {
          this.searchResults = results
        
        })
    },
    highlightPrevious() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex = this.highlightedIndex - 1
        this.scrollIntoView()
      }
    },
    highlightNext() {
      if (this.highlightedIndex < this.searchResults.length - 1) {
        this.highlightedIndex = this.highlightedIndex + 1
        this.scrollIntoView()
      }
    },
    scrollIntoView() {
      this.$refs.results.children[this.highlightedIndex].scrollIntoView({ block: 'nearest' })
    },
    gotoLink() {
      if (this.searchResults[this.highlightedIndex]) {
        window.location = this.searchResults[this.highlightedIndex].item.path
      }
    }
  }
}
</script>
