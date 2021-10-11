export default {
  state: {
    // 主入口标签页
    teamId: sessionStorage.getItem("teamId")==null?'请选择账号':sessionStorage.getItem("teamId"),
    visible:false,
    envShow:false
  },
  mutations: {
    updateTeamId (state, teamId) {
      state.teamId = teamId
    },
    updateVisible (state, visible) {
        state.visible = visible
    },
    updateEnvShow (state, envShow) {
      state.envShow = envShow
    }
  }
}