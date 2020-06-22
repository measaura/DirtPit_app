import {Platform} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as RNLocalize from 'react-native-localize'
import DeviceInfo from 'react-native-device-info'

// var base_url = 'http://192.168.0.100:8000/api'
var base_url = 'https://demo.shortcircuitworks.com/dirtpit23/index.php?route='
var tz = RNLocalize.getTimeZone()
let iPhoneX = DeviceInfo.hasNotch()

export default API = {
    fetchHandler(method, url, params = null) {
        return new Promise((resolve, reject) => {
            var tokenKey = null
            var paramBody = null

            if (params) {
                paramBody = JSON.stringify(params)
            }

            AsyncStorage.getItem('tokenKey', (err, key) => {
                if (!err && key != null) {
                    tokenKey = key
                }

                fetch(url, {
                    method: method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + tokenKey,
                    },
                    body: paramBody,
                })
                    .then(response => {
                        return Promise.all([response.status, response.json()])
                    })
                    .then(([responseCode, responseObj]) => {
                        resolve([responseCode, responseObj])
                    })
                    .catch(error => {
                        console.log('fetch error')
                        console.error(error)
                        reject(error)
                    })
            })
        })
    },

    fetchHandlerMultiPart(method, url, params = null) {
        return new Promise((resolve, reject) => {
            var tokenKey = null

            AsyncStorage.getItem('tokenKey', (err, key) => {
                if (!err && key != null) {
                    tokenKey = key
                }

                fetch(url, {
                    method: method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + tokenKey,
                    },
                    body: params,
                })
                    .then(response => {
//                     	console.log('fetchHandlerMultiPart',response)
                        return Promise.all([response.status, response.json()])
                    })
                    .then(([responseCode, responseObj]) => {
                        resolve([responseCode, responseObj])
                    })
                    .catch(error => {
                        console.log('fetch error')
                        console.error(error)
                        reject(error)
                    })
            })
        })
    },

    // all api declare here

    login(data) {
    console.log(data)
        return new Promise(resolve => {
            this.fetchHandlerMultiPart('POST', base_url + 'api/userlogin', data).then(
            	([code, response]) => {
                if (code === 200) {
                console.log(response)
                    if (!response.error_warning){
											AsyncStorage.setItem('tokenKey', response.access_token)
											resolve(response)
                    }
                } else if (code === 401) {
                    alert('Wrong email or password!')
                }
            })
        })
    },

    logout() {
        return new Promise(resolve => {
            this.fetchHandler('POST', base_url + 'api/userlogout', {
                device_token: '-',
            }).then(([code, response]) => {
                if (code === 200) {
                    AsyncStorage.removeItem('tokenKey')
                    resolve(response)
                }
            })
        })
    },

    userDetail(data) {
        return new Promise(resolve => {
            this.fetchHandlerMultiPart('POST', base_url + 'api/userdetail',data).then(
                ([code, response]) => {
                    if (code === 200) {
                        resolve(response)
                    }
                },
            )
        })
    },

    userUpdate(data) {
//     console.log('userUpdate',data)
			const dataForm = new FormData();
			if(data.firstname){
				dataForm.append("firstname", data.firstname);
			}
			if(data.lastname){
				dataForm.append("lastname", data.lastname);
			}
			if(data.email){
				dataForm.append("email", data.email);			
			}
			if(data.telephone){
				dataForm.append("telephone", data.telephone);
			}
			if(data.fcm_token){
				dataForm.append("fcm_token" ,data.fcm_token);
			}
        return new Promise(resolve => {
            this.fetchHandlerMultiPart('POST', base_url + 'api/userupdate',data).then(([code, response]) => {
                if (code === 200) {
                    resolve(response)
                }
            })
        })
    },

    userUpdateCurrentDevice(data) {
        return new Promise(resolve => {
            this.fetchHandler('POST', base_url + '/update', {
                current_device: data,
            }).then(([code, response]) => {
                if (code === 200) {
                    AsyncStorage.setItem('devicehash', data)
                    resolve([code, response])
                }
            })
        })
    },

    deviceLocation() {
        return new Promise(resolve => {
            this.fetchHandler('GET', base_url + '/location').then(
                ([code, response]) => {
                    if (code === 200) {
                        AsyncStorage.setItem('devicehash', response.hashid)
                    }
                    resolve([code, response])
                },
            )
        })
    },

    deviceList() {
        return new Promise(resolve => {
            this.fetchHandler('GET', base_url + '/device/list').then(
                ([code, response]) => {
                    resolve([code, response])
                },
            )
        })
    },

    deviceNotification() {
        return new Promise(resolve => {
            this.fetchHandler('GET', base_url + '/device/notification').then(
                ([code, response]) => {
                    resolve([code, response])
                },
            )
        })
    },

    requestLocationUpdate(deviceHash) {
        return new Promise(resolve => {
            this.fetchHandler(
                'GET',
                base_url + '/device/' + deviceHash + '/location',
            ).then(([code, response]) => {
                resolve([code, response])
            })
        })
    },

    deviceTracking(data) {
        return new Promise(resolve => {
            AsyncStorage.getItem('devicehash', (err, deviceHash) => {
                if (!err && deviceHash != null) {
                    this.fetchHandler(
                        'POST',
                        base_url + '/device/' + deviceHash + '/tracking',
                        {
                            start: data.start,
                            end: data.end,
                        },
                    ).then(([code, response]) => {
                        if (code === 200) {
                            resolve(response)
                        }
                    })
                }
            })
        })
    },

    deviceInfo() {
        return new Promise(resolve => {
            AsyncStorage.getItem('devicehash', (err, deviceHash) => {
                if (!err && deviceHash != null) {
                    this.fetchHandler(
                        'GET',
                        base_url + '/device/' + deviceHash + '/info',
                    ).then(([code, response]) => {
                        resolve([code, response])
                    })
                }
            })
        })
    },

    devicePowerOff() {
        return new Promise(resolve => {
            AsyncStorage.getItem('devicehash', (err, deviceHash) => {
                if (!err && deviceHash != null) {
                    this.fetchHandler(
                        'GET',
                        base_url + '/device/' + deviceHash + '/poweroff',
                    ).then(([code, response]) => {
                        resolve([code, response])
                    })
                }
            })
        })
    },

    deviceUnbind() {
        return new Promise(resolve => {
            AsyncStorage.getItem('devicehash', (err, deviceHash) => {
                if (!err && deviceHash != null) {
                    this.fetchHandler(
                        'GET',
                        base_url + '/device/' + deviceHash + '/reset',
                    ).then(([code, response]) => {
                        resolve([code, response])
                    })
                }
            })
        })
    },

    deviceSetInterval(interval) {
        return new Promise(resolve => {
            AsyncStorage.getItem('devicehash', (err, deviceHash) => {
                if (!err && deviceHash != null) {
                    this.fetchHandler(
                        'POST',
                        base_url + '/device/' + deviceHash + '/updateinterval',
                        {
                            interval: interval,
                        },
                    ).then(([code, response]) => {
                        resolve([code, response])
                    })
                }
            })
        })
    },

    deviceSetAutoAnswer(auto) {
        return new Promise(resolve => {
            AsyncStorage.getItem('devicehash', (err, deviceHash) => {
                if (!err && deviceHash != null) {
                    this.fetchHandler(
                        'POST',
                        base_url +
                            '/device/' +
                            deviceHash +
                            '/updateautoanswer',
                        {
                            auto: auto,
                        },
                    ).then(([code, response]) => {
                        resolve([code, response])
                    })
                }
            })
        })
    },

    deviceSetTimeZone(timezone) {
        return new Promise(resolve => {
            AsyncStorage.getItem('devicehash', (err, deviceHash) => {
                if (!err && deviceHash != null) {
                    this.fetchHandler(
                        'POST',
                        base_url + '/device/' + deviceHash + '/updatetimezone',
                        {
                            timezone: timezone,
                        },
                    ).then(([code, response]) => {
                        resolve([code, response])
                    })
                }
            })
        })
    },

    assigneeUpdate(assigneehash, data) {
        return new Promise(resolve => {
            this.fetchHandlerMultiPart(
                'POST',
                base_url + '/assignee/' + assigneehash + '/update',
                data,
            ).then(([code, response]) => {
                resolve([code, response])
            })
        })
    },

    userUpdateMulti(data) {
        return new Promise(resolve => {
            this.fetchHandlerMultiPart('POST', base_url + '/update', data).then(
                ([code, response]) => {
                    resolve([code, response])
                },
            )
        })
    },

    trackingDetails(hashid) {
        return new Promise(resolve => {
            this.fetchHandlerMultiPart(
                'GET',
                base_url + '/tracking/' + hashid,
            ).then(([code, response]) => {
                resolve([code, response])
            })
        })
    },

    scan(code) {
        return new Promise(resolve => {
            this.fetchHandler('POST', base_url + '/device/scan', {
                code: code,
            }).then(([code, response]) => {
                resolve([code, response])
            })
        })
    },

    requestMonitor(deviceHash) {
        return new Promise(resolve => {
            this.fetchHandler(
                'GET',
                base_url + '/device/' + deviceHash + '/requestmonitor',
            ).then(([code, response]) => {
                resolve([code, response])
            })
        })
    },

    monitorResponse(monitorid, approval) {
        return new Promise(resolve => {
            this.fetchHandler('POST', base_url + '/device/monitorresponse', {
                monitorid: monitorid,
                approval: approval,
            }).then(([code, response]) => {
                resolve([code, response])
            })
        })
    },

    requestGeoZone(deviceHash) {
        return new Promise(resolve => {
            this.fetchHandler(
                'GET',
                base_url + '/device/' + deviceHash + '/geozone',
            ).then(([code, response]) => {
                resolve([code, response])
            })
        })
    },

    addGeoZone(deviceHash, name, coordinates) {
        return new Promise(resolve => {
            this.fetchHandler(
                'POST',
                base_url + '/device/' + deviceHash + '/geozone/add',
                {
                    coordinates: coordinates,
                    name: name,
                },
            ).then(([code, response]) => {
                resolve([code, response])
            })
        })
    },

    triggerZone(deviceHash, hashgeozone) {
        return new Promise(resolve => {
            this.fetchHandler(
                'post',
                base_url + '/device/' + deviceHash + '/geozone/trigger',
                {
                    hashgeozone: hashgeozone,
                },
            ).then(([code, response]) => {
                resolve([code, response])
            })
        })
    },

    deleteZone(deviceHash, hashgeozone) {
        return new Promise(resolve => {
            this.fetchHandler(
                'DELETE',
                base_url + '/device/' + deviceHash + '/geozone/delete',
                {
                    hashgeozone: hashgeozone,
                },
            ).then(([code, response]) => {
                resolve([code, response])
            })
        })
    },
}
