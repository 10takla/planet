const SERVER_HOSTS = {
    django: 'http://localhost:5000'
}


export const requestURL = (endpoint: string, server: keyof typeof SERVER_HOSTS = 'django') => {
    return [SERVER_HOSTS[server], endpoint].join('/')
}