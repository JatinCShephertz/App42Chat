package app42chatadmin

class Role {
    String name
    Integer status = 1
   

    static constraints = {
        name(unique:true)
    }
}
