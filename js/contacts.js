function btnclick(){
    let u_name = $('#name').val();
    let u_gender = $("input[name='gender']:checked"). val();
    let u_email = $('#email').val();
    let u_comment = $('#comment').val();
    var user = new Contacts(u_name, u_gender, u_email, u_comment);
    user.add(appendData);
};

function Contacts(name, gender, email, comment) {
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.comment = comment;
}

Contacts.prototype.status = 'new';
Contacts.prototype.add = function(callback) {
    callback(this);
}

function appendData(data){
    var elm = "<tr>";
        elm += "<td>" + data.status + "</td>";
        elm += "<td>" + data.name + "</td>";
        elm += "<td>" + data.gender + "</td>";
        elm += "<td>" + data.email + "</td>";
        elm += "<td>" + data.comment + "</td>";
        elm += "</tr>";
    $('#list_question').append(elm);
}
