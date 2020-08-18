// middlewareとして定義した関数は第一引数としてコンテキストオブジェクトを受け取る
export default ({ store, route, redirect }) => {
	// ユーザーが認証されていないとき
	if (!store.getters.isAuthenticated) {
		return redirect('/login')
	}
}
