import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $parseAndExecuteQuery(query: string): void
  }
}

Vue.prototype.$parseAndExecuteQuery = (query: string) => {
  if (query === '') {
    console.log('No query made')
    return
  }

  let arr: Array<string> = []
  arr = query.split(/[ +]/g)
  if (arr.length === 0) {
    return
  }

  const cmd : string = arr[0]
  console.log('Cmd: ' + cmd)

  const configKey : string = 'hipityhop-config'
  const configCmd : string = 'hipityhop-cmd'

  if (cmd === 'reset') {
    localStorage.setItem(configKey, '')
    return
  }

  let config : string = localStorage.getItem(configKey) ?? ''
  if (config === '') {
    console.log('Flushing default config')
    config = 'default'
    flushDefaultConfigToLocalStorage()
    localStorage.setItem(configKey, config)
  }

  executeCmdFromLocalStorage(arr)

  function flushDefaultConfigToLocalStorage () {
    addCmdToLocalStorage('g', 'https://www.google.com/search?q=')
    addCmdToLocalStorage('dg', 'https://duckduckgo.com/?q=')
  }

  function addCmdToLocalStorage (cmdKey:string, urlPattern:string) {
    localStorage.setItem(configCmd + '-' + cmdKey, urlPattern)
  }

  function executeCmdFromLocalStorage (queryArray:Array<string>) {
    let redirectUrl : string = localStorage.getItem(configCmd + '-' + queryArray[0]) ?? ''

    if (redirectUrl === '') {
      console.log('Cmd Not Found: ' + queryArray[0])
      return
    }

    if (queryArray.length > 1) {
      for (let i = 1; i < queryArray.length; i++) {
        if (i !== 1) {
          redirectUrl += '+'
        }
        redirectUrl += queryArray[i]
      }
    }
    window.location.replace(redirectUrl)
  }
}
