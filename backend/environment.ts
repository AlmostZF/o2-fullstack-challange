enum Environments{
    local = 'local',
    development = 'dev',
    production = 'prod'
}


class Environment{

    private environment: string

    constructor(environment: string){
        this.environment = environment
    }


    getPort(): number{
        return 5001;
    }
}

export default new Environment(Environments.development);