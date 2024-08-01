import {useState, useEffect} from 'react'
import axios from 'axios'

function useFlip(initialFlipState = true) {
    const [isFlipped, setFlipped] = useState(initialFlipState)
    const flip = () => {
        setFlipped(isUp => !isUp)
    }

    return [isFlipped, flip]
} 

function useAxios(keyInLS, baseURL) {
    const [res, setRes] = useLocalStorage(keyInLS)

    const addResponseData = async (formatter = data => data, restOfUrl = '') => {
        const resp = await axios.get(`${baseURL}${restOfUrl}`)
        setRes(data => [...data, formatter(resp.data)])
    }

    const clearResp = () => setRes([])
    return [res, addResponseData, clearResp]
}

function useLocalStorage(key, initialValue = []) {
    if(localStorage.getItem(key)) {
        initialValue = JSON.parse(localStorage.getItem(key))
    }
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}

export default useLocalStorage
export {useFlip, useAxios, useLocalStorage}