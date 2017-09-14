
$(() => {
  
  $("#broad").tabs();  
  var all = $('#channel-list1')
  updateData(all);
  var input = $("#search1");
  
  input.autocomplete({
    minLength: 0,
    source: channels,

    
  });
$('#but1').click(function(){
    let channel = input.val();
    let w = 'Please input a value!';
    if (channel == '') { 
      $('#notification').empty();
      let newWaring = createWarning(w)
      $('#notification').append(newWaring);
      return;}
    
    list = 'ALL';
    var channelList = $('#channel-list1');
    channelList.empty();
    $('#notification').empty();
  $.getJSON(twitchApi + "/streams/" + channel + "/", function(json){   
        
       if (json.stream) { 
         if (list === 'ONLINE' || list === 'ALL')
         
         listChannel(true,channel,channelList);          
       } else {
         if (list === 'OFFLINE' || list === 'ALL')
         listChannel(false,channel,channelList); 
       }        
         
    
  });
  
});

});
var twitchApi = "https://wind-bow.glitch.me/twitch-api";

var channels = ["ESL_SC2", 
                "OgamingSC2", 
                "cretetion", 
                "freecodecamp",
                "storbeck", 
                "habathcx", 
                "RobotCaleb", 
                "noobs2ninjas",
                "comster404",
                "bigdatarrr"];
var list = 'ALL';

function createWarning(msg){
  
  return $('<div id="notification">' + msg + '</div>');
  
}                   

function createItem(isOnline,data){
  var item = '';  
  item += '<div id="content" class="row">';
  item += '<div class="col-xs-1 col-md-1">';
  item += '<figure><img src=' + data.logo +'></figure>';
  item += '</div>';
  item += '<div class="col-xs-11 col-md-11">';
  item += '<p>' + data.display_name + '</p>';  
  item += '<p>';  
  item += '<a target="_blank" href=' + data.url + '>@' + data.name + '</a>'
  if (isOnline){
      item += '<i id="indicator" class="fa fa-check" style="color:green"></i>';
     
  } else {  
  item += '<i id="indicator" class="fa fa-exclamation" style="color:red"></i>';
   
  }   
 
  item += '</p>';  
  item += '</div>';  
  if (data.status){
  item += '<div>' + data.status;
  } else { item += '<strong> No status.</strong>';}
  
  item += '</div>';
  item += '</div>';
  return $(item);  
  
}
function listChannel(isOnline,name,channelList){
  $.getJSON(twitchApi + "/channels/" + name + "/", function(data){
    if (data.status === 404){
       //var msg1 = data.message + "!";        
       let warning = createWarning(data.message);
       
       $('#notification').append(warning);
      return;
    }
    
    var item = createItem(isOnline,data);
    channelList.append(item);
  });
  
}
function updateData(channelList){
  $.map(channels,function(channel){
     $.getJSON(twitchApi + "/streams/" + channel + "/", function(json){   
        
       
       if (json.stream) { 
         if (list === 'ONLINE' || list === 'ALL')
         
         listChannel(true,channel,channelList);          
       } else {
         if (list === 'OFFLINE' || list === 'ALL')
         listChannel(false,channel,channelList); 
       }        
         
    
  });
  });
 }

function onlineClicked(){
  $('#notification').empty();
  $('#channel-list2').empty();
  list = 'ONLINE';
  let online = $('#channel-list2');
  updateData(online); 
  
  
}
  function offlineClicked(){
  $('#notification').empty();
  $('#channel-list3').empty();
  list = 'OFFLINE';
  let offline = $('#channel-list3');
  updateData(offline); 
  
  
}

  function allClicked(){
  $('#notification').empty();
  $('#channel-list1').empty();
  
  list = 'ALL';
  let all = $('#channel-list1');
  updateData(all);   
  
}