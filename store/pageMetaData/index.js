export const state = () => ({
  pageTitle: "ANS 경제성 분석"
})

export const mutations = {
  updatePageTitle(state, pageTitle) {
    state.pageTitle = pageTitle
  }
}