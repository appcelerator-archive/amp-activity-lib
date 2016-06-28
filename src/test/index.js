import 'source-map-support/register'
import chai from 'chai'
import unirest from 'unirest'
import Activity from '../Activity'
import { Consul } from 'amp-consul-lib'

const expect = chai.expect

function sleep(delayInSeconds) {
  return new Promise((resolve) => {
    setTimeout(()=> {
      resolve()
    }, delayInSeconds * 1000)
  })
}

function consulHealthCheck() {
  return new Promise((resolve, reject) => {
    unirest.get('http://consul:8500/v1/health/checks/consul').end((response)=> {
      if (response.error) {
        return reject(response.error)
      }
      if (response.status == 401) {
        return reject('Unauthorized')
      }
      resolve()
    })
  })
}

describe('Activity', function() {
  const consul = new Consul()

  before('Wait for consul', async function(done) {
    this.timeout(10 * 1000)

    let success = false
    for (let i = 0; i < 10; i++) {
      try {
        await consulHealthCheck()
        success = true
        break
      } catch (err) {
        // Ignore error and wait
        await sleep(1)
      }
    }

    if (success) {
      done()
    } else {
      done('Timed out waiting for consul')
    }
  })

  it('details should be available in consul after creation', async(done) => {
    try {
      const data = { test: 'data' }
      const activity = await Activity.newActivity('test')
      await activity.save(data)
      const value = await consul.get(activity.id)
      expect(JSON.parse(value.Value).data).to.deep.equal(data)
      done()
    } catch (err) {
      done(err)
    }
  })
})
