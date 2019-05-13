import { random } from 'faker'

export const auth = function (state, user) {
  state.auth = user
}

export const notification = function (state, notification) {
  const id = random.uuid()
  state.notifications.push(Object.assign({}, notification, { id }))
}

export const removeNotification = function (state, id) {
  state.notifications = state.notifications.filter(notification => notification.id !== id)
}
