const Pool=require("pg").Pool;

const pool=new Pool({
    user:"postgres",
    password:"V@g1@2641045152",
    host:"localhost",
    database:'webproject_2020',
    port:5432
});

module.exports=pool;