$(document).ready(function(){
    $("#mybut").click(function(){

    });
});


function addText(data){
    var msg='<div class="row">'+
        '<div class="col-lg-12">'+
        '<p class="text-center text-muted small">'+getDate()+'</p>'+
        '</div>'+
        '</div>'+
        '<div class="row">'+
        '<div class="col-lg-12">'+
        '<div class="media">'+
        '<a class="pull-left" href="#">'+
        '<img class="media-object img-circle" src="http://lorempixel.com/30/30/people/1/" alt="">'+
        '</a>'+
        '<div class="media-body">'+
        '<h4 class="media-heading">'+data.user+
        '<span class="small pull-right">12:23 PM</span>'+
        '</h4>'+
        '<p>'+data.msg+'</p>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<hr>';
    return msg;
}

function getDate(){
    return "";
}