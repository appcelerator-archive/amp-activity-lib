import consul from 'consul'
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
  }

  async save(data) {
    this.data = merge(this.data, data || {})
    await save(this.id, {
      name: this.name,
      state: this.state,
      data: this.data
    })
  }

  async saveState(state, data) {
    this.state = state
    return await save(data)
  }

}

function getNewActivityID() {
  return new Promise((resolve, reject) => {
    try {
      // TODO this will be replaced by a flake id
      resolve(uuid.v1)
    } catch (err) {
      reject(err)
    }
  })
}

async function save(id, value) {
  const options = {
    host: 'consul',
    port: '8500',
    promisify: true
  }
  const c = consul(options)

  // TODO: spec key-value space schema
  await c.kv.set(id, value)
}
