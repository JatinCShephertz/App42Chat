package app42chatadmin

import groovy.sql.Sql
class AccountService {
    static transactional = true
    def dataSource;
    def serviceMethod() {

    }
    def validateAccount(params){
        def db = new Sql(dataSource);
        def password = params.password //.encodeAsSHA256()
        def query = "select * from user where email=? and password=?";
        def result = db.firstRow(query,[params.email,password]);
        return result;
    }
}
