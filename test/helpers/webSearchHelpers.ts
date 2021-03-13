import config from "../pageobjects/config"

export default {
    generateRandomKeySearch: ():string => {
        return config.WEBSEARCH_PREFIX + Math.floor(Math.random()*10000).toString()
    }
}