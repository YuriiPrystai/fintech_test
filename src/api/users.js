import axios from 'axios'

const sendRequest = async (method, url) => {
  const config = {
    method,
    headers: {},
    params: {},
    url: url,
  }

  config.headers['Content-Type'] = 'application/json'

  return new Promise((resolve, reject) => {
    axios.request(config)
      .then((response) => {
        const { data, status, statusText } = response
        resolve({ data, status, statusText })
      })
      .catch(reject)
  })
}

export const getUsers = () => sendRequest('GET', 'https://api.github.com/users')

export const getUserByName = (userName) => sendRequest('GET', `https://api.github.com/users/${userName}`)
