package app42chatadmin

class User {
    String email, password, phone, name, capacity, status = "ACTIVE"
    Date createdOn = new Date(), updatedOn = new Date()
    
    static hasMany = [roles : Role]

    static constraints = {
        email(email:true)
        email(unique:true)
        name (nullable:true)
        phone (nullable:true)
        capacity (nullable:true)
    }
}
