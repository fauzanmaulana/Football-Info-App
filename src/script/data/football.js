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

    static matches(id){
        return fetch(`https://api.football-data.org/v2/competitions/${id}/matches?status=SCHEDULED`, {
            headers: {
                'X-Auth-Token' : 'f96362dc928944c3b83892aae3b05bb1'
            }
        })
        .then(response => response.json())
    }

    static standings(id){
        return fetch(`https://api.football-data.org/v2/competitions/${id}/standings`, {
            headers: {
                'X-Auth-Token' : 'f96362dc928944c3b83892aae3b05bb1'
            }
        })
        .then(response => response.json())
    }

}

export default footballData;