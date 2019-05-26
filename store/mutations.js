const date = new Date()

export const auth = function (state, user) {
  state.auth = user
}

export const notification = function (state, notification) {
  const id = date.getTime()
  state.notifications.push(Object.assign({}, notification, { id }))
}

export const removeNotification = function (state, id) {
  state.notifications = state.notifications.filter(notification => !(notification.id === id))
}

export const exploreText = function (state, text) {
  state.exploreText = text
}

export const exploreResult = function (state, result) {
  state.exploreResult = result
}
