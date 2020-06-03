class footballData {

    static competitions(){
        return fetch('https://api.football-data.org/v2/competitions', {
            headers: {
                'X-Auth-Token' : 'f96362dc928944c3b83892aae3b05bb1'
            }
        })
        .then(response => response.json())
        .then(responseJson => responseJson.competitions)
    }

}

export default footballData;