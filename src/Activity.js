import { Consul } from 'amp-consul-lib'
import { merge } from 'ramda'
import uuid from 'uuid'

export default class Activity {
  static async newActivity(name) {
    let activity = new Activity()
    activity.name = name
    activity.id = await getNewActivityID()
    return activity
  }

  static async fromID(id) {
    let activity = new Activity()
    activity.id = id

    // TODO implement
    /*
    let { state, name } = await getActivity(id)
    activity.state = state
    activity.name = name
    */
    return activity
  }

  constructor() {
    this.data = {}
    this.consul = new Consul()
  }

  async save(data) {
    this.data = merge(this.data, data || {})
    await this._save(this.id, {
      name: this.name,
      state: this.state,
      data: this.data
    })
  }

  async saveState(state, data) {
    this.state = state
    return await this._save(data)
  }

  async _save(id, value) {
    // TODO: spec key-value space schema
    await this.consul.set(id, JSON.stringify(value))
  }
}

function getNewActivityID() {
  return new Promise((resolve, reject) => {
    try {
      // TODO this will be replaced by a flake id
      resolve(uuid.v1())
    } catch (err) {
      reject(err)
    }
  })
}
