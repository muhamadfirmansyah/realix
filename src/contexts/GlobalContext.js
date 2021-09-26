import axios from "axios";
import Cookies from "js-cookie";
import { createContext } from "react";

export const GlobalContext = createContext()

export const GlobalProvider = (props) => {

    // Get Movies
    const getMovies = async (cb) => {
        let datacb = {
            data: [],
            error: false
        }

        try {
            const res = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            datacb.data = await res.data
            return cb(datacb)

        } catch (err) {
            datacb.error = true
            return cb(datacb)
        }
    }

    // Get Games
    const getGames = async (cb) => {
        let datacb = {
            data: [],
            error: false
        }

        try {
            const res = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            datacb.data = await res.data
            return cb(datacb)

        } catch (err) {
            datacb.error = true
            return cb(datacb)
        }
    }

    // Get Movie
    const getMovie = async (id, cb) => {
        let datacb = {
            data: {},
            error: false
        }

        try {
            const res = await axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
            datacb.data = await res.data
            return cb(datacb)

        } catch (err) {
            datacb.error = true
            return cb(datacb)
        }
    }

    // Get Game
    const getGame = async (id, cb) => {
        let datacb = {
            data: {},
            error: false
        }

        try {
            const res = await axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
            datacb.data = await res.data
            return cb(datacb)

        } catch (err) {
            datacb.error = true
            return cb(datacb)
        }
    }

    // Register
    const setRegister = (data, cb) => {

        axios.post(`https://backendexample.sanbersy.com/api/register`, data).then((res) => {
            return cb({
                data: res.data,
                error: false,
                message: '',
                http: res.status
            })
        }).catch(err => {
            return cb({
                message: err.response.data,
                error: true,
                http: err.response.status
            })
        })
    }

    // Login
    const setLogin = async (data, cb) => {

        const { email, password } = data

        await axios.post(`https://backendexample.sanbersy.com/api/user-login`,
            { email, password }).then(res => {
                return cb({
                    data: res.data,
                    error: false,
                    message: '',
                    http: res.status
                })
            }).catch(err => {
                return cb({
                    message: err.response.data,
                    error: true,
                    http: err.response.status
                })
            })
    }

    const deleteMovie = (id, cb) => {

        let token = JSON.parse(Cookies.get("realix_user_token")).token
        let config = {
            headers: {"Authorization": `Bearer ${token}`}
        }

        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`, config).then(res => {
            return cb({
                error: false,
            })
        }).catch(err => {
            return cb({
                message: err.response.data,
                error: true,
                http: err.response.status
            })
        })
    }

    const addMovie = ((data, cb) => {
        let token = JSON.parse(Cookies.get("realix_user_token")).token
        let config = {
            headers: {"Authorization": `Bearer ${token}`}
        }

        axios.post(`https://backendexample.sanbersy.com/api/data-movie`, data, config).then(res => {
            return cb({
                error: false,
            })
        }).catch(err => {
            return cb({
                message: err.response.data,
                error: true,
                http: err.response.status
            })
        })
    })

    const updateMovie = ((id, data, cb) => {
        let token = JSON.parse(Cookies.get("realix_user_token")).token
        let config = {
            headers: {"Authorization": `Bearer ${token}`}
        }

        axios.put(`https://backendexample.sanbersy.com/api/data-movie/${id}`, data, config).then(res => {
            return cb({
                error: false,
            })
        }).catch(err => {
            return cb({
                message: err.response.data,
                error: true,
                http: err.response.status
            })
        })
    })

    const deleteGame = (id, cb) => {

        let token = JSON.parse(Cookies.get("realix_user_token")).token
        let config = {
            headers: {"Authorization": `Bearer ${token}`}
        }

        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${id}`, config).then(res => {
            return cb({
                error: false,
            })
        }).catch(err => {
            return cb({
                message: err.response.data,
                error: true,
                http: err.response.status
            })
        })
    }

    const addGame = ((data, cb) => {
        let token = JSON.parse(Cookies.get("realix_user_token")).token
        let config = {
            headers: {"Authorization": `Bearer ${token}`}
        }

        axios.post(`https://backendexample.sanbersy.com/api/data-game`, data, config).then(res => {
            return cb({
                error: false,
            })
        }).catch(err => {
            return cb({
                message: err.response.data,
                error: true,
                http: err.response.status
            })
        })
    })

    const updateGame = ((id, data, cb) => {
        let token = JSON.parse(Cookies.get("realix_user_token")).token
        let config = {
            headers: {"Authorization": `Bearer ${token}`}
        }

        axios.put(`https://backendexample.sanbersy.com/api/data-game/${id}`, data, config).then(res => {
            return cb({
                error: false,
            })
        }).catch(err => {
            return cb({
                message: err.response.data,
                error: true,
                http: err.response.status
            })
        })
    })

    const updatePassword = (data, cb) => {
        let token = JSON.parse(Cookies.get("realix_user_token")).token
        let config = {
            headers: {"Authorization": `Bearer ${token}`}
        }

        axios.post(`https://backendexample.sanbersy.com/api/change-password`, data, config).then(res => {
            return cb({
                error: false,
            })
        }).catch(err => {
            return cb({
                message: err.response.data,
                error: true,
                http: err.response.status
            })
        })
    }

    return (
        <GlobalContext.Provider value={{
            getMovies,
            getGames,
            getMovie,
            getGame,
            setRegister,
            setLogin,
            deleteMovie,
            addMovie,
            updateMovie,
            deleteGame,
            addGame,
            updateGame,
            updatePassword,
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}