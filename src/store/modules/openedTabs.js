import $router from '@/router'
export default {
  state: {
    pathsOfOpenedTabs: [],
    selectionOrder: [] // type: string array
  },
  mutations: {
    addATab: ({ pathsOfOpenedTabs}, tabRoute) => {
      // tabRoute.meta.showing = true
      pathsOfOpenedTabs.push(tabRoute.fullPath)
    },
    removeATab: (state, tabRoute) => {
      let index = state.pathsOfOpenedTabs.findIndex(element => element === tabRoute.fullPath)
      // state.openedTabs[index].meta.showing = false
      state.pathsOfOpenedTabs.splice(index, 1)
      state.selectionOrder = state.selectionOrder.filter(element => element.fullPath !== tabRoute.fullPath)
    },
    selectATab: (state, tabRoute) => {
        let index = state.selectionOrder.findIndex(element => element.fullPath === tabRoute.fullPath)
        if (index !== -1) {
          state.selectionOrder.push(...(state.selectionOrder.splice(index, 1)))
        } else {
          state.selectionOrder.push(tabRoute)
        }
    }
  },
  actions: {
    openNewTab: (context, tabRoute) => {
      context.commit('addATab', tabRoute)
      context.commit('selectATab', tabRoute)
    },
    cancelATab ({commit, state, getters: {selectedTab}}, {tabRoute, $router}) {
      commit('removeATab', tabRoute)
      if (selectedTab.fullPath === tabRoute.fullPath) {
        $router.push(state.selectionOrder[state.selectionOrder.length - 1 ])
      }
    },
    async destroyMessageReceiver () {
      let result = await new Promise(resolve => setTimeout(() => resolve(), 1000))
      return result
    }
  },
  getters: {
    openedTabs (state) {
      return state.pathsOfOpenedTabs.map(e => $router.resolve(e, '').route)
    },
    selectedTab ({selectionOrder}) {
      return selectionOrder[selectionOrder.length - 1]
    },
    includes (state) {
      return (tabRoute) => state.pathsOfOpenedTabs.includes(tabRoute.fullPath);
    },
    namesOfOpenedTabs (state, {openedTabs}) {
      return openedTabs.map(e => e.name || e.meta.title)
    }
  }
}