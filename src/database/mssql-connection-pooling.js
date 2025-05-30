import pkg from 'mssql';
const { ConnectionPool } = pkg;
const pools = {};

// create a new connection pool
function CreatePool(config) {
    let key = JSON.stringify(config);

    if (GetPool(key))
        throw new Error('Pool already exists');

    pools[key] = (new ConnectionPool(config)).connect();
    return pools[key];
};

// get a connection pool from all pools
function GetPool(name) {
    if (pools[name])
        return pools[name]
    else
        return null
}

// if pool already exists, return it, otherwise create it
function GetCreateIfNotExistPool(config) {
    let key = JSON.stringify(config)

    let pool = GetPool(key)
    if (pool)
        return pool
    else
        return CreatePool(config)
}

// close a single pool
function ClosePool(config) {
    let key = JSON.stringify(config)

    if (pools[key]) {
        const pool = pools[key];
        delete pools[key];
        pool.close()
        return true
    }
    return false
}

// close all the pools
function CloseAllPools() {
    pools.forEach((pool) => {
        pool.close()
    })
    pools = {}
    return true
}

export {
    ClosePool,
    CloseAllPools,
    CreatePool,
    GetPool,
    GetCreateIfNotExistPool
}