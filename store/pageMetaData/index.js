export const state = () => ({
  pageTitle: "K-ANS ECon System"
})

export const mutations = {
  updatePageTitle(state, pageTitle) {
    state.pageTitle = pageTitle
  }
}