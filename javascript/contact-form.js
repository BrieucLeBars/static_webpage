/**
 * Created by brieuc on 31/01/18.
 */

$(document).ready(function() {
    $("#contact-form").submit(function (event) {
        event.preventDefault(); //prevent default action
        var proceed = true;
        var form = this;
        var output = '';
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields
        $(form).find(':required').each(function () {
            $(this).css('border-color', '');
            if (!$.trim($(this).val())) { //if this field is empty
                $(this).css('border-color', 'red'); //change border color to red
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
                $(this).css('border-color', 'red'); //change border color to red
                proceed = false; //set do not proceed flag
                output += '<div class="card-header bg-danger text-white">' +
                    'Email non valide</div>';
            }

            if ($(this).attr("id") == "formName" && $(this).val().length < 2) {
                $(this).css('border-color', 'red'); //change border color to red
                proceed = false; //set do not proceed flag
                output += '<div class="card-header bg-danger text-white">' +
                        'Le nom est trop court</div>';
                }

            if ($(this).attr("id") == "formMessage" && $(this).val().length < 4) {
                $(this).css('border-color', 'red'); //change border color to red
                proceed = false; //set do not proceed flag
                output += '<div class="card-header bg-danger text-white">' +
                        'Votre message est trop court</div>';
                }


            $("#contact_results").html(output);

        }).keyup(function () { //reset previously set border colors on .keyup()
            $(this).css('border-color', '');
        }).change(function () {  //for select box
            $(this).css('border-color', '');
        });
        if (proceed) { //everything looks good! proceed...
            //get input field values data to be sent to server
            var post_url = "php/send_form_email.php"; //get form action url
            var request_method = "POST"; //get form GET/POST method
            var form_data = $(this).serialize(); //Encode form elements for submission
            //Ajax post data to server
            $.ajax({
                url: post_url,
                type: request_method,
                dataType: 'json',
                data: form_data
            });
            $(form)[0].reset();
            var output = '<div class="card-header bg-success text-white">' + 'Merci pour votre message' + '</div>';
            $("#contact_results").html(output);
        }
    });
});