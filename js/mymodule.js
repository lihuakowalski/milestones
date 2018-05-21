function mycontacts(name, gender, email, comment) {
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.comment = comment;
};

Contacts.prototype.status = 'new';
Contacts.prototype.add = function(callback) {
    callback(this);
};

module.exports = mycontacts;
