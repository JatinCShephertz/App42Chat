package app42chatadmin

class User {
    String email
    String password
    Date createOn = new Date()

    static constraints = {
        email(email:true)
        email(unique:true)
    }
}
