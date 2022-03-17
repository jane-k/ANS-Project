export const state = () => ({
  pageTitle: "ANS 경제성 분석 도구"
})

export const mutations = {
  updatePageTitle(state, pageTitle) {
    state.pageTitle = pageTitle
  }
}