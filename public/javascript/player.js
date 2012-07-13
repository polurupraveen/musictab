$(document).ready(function(){
	if(html5_player){
		audio=$('.player audio').get(0);
		
		$(audio).bind('timeupdate', function() {
//			var rem = parseInt(audio.duration - audio.currentTime, 10),
			var rem = parseInt(audio.currentTime, 10),
			pos = (audio.currentTime / audio.duration) * 100,
			mins = Math.floor(rem/60,10),
			secs = rem - mins*60;
			$('#timeleft').text(mins + ':' + (secs > 9 ? secs : '0' + secs));
			$('#loading').css({width: pos + '%'});
			window.location.hash='!/'+$('.playing').children('#title').text()+'/'+$('.playing').children('#album').text()+'/'+$('.playing').children('#artist').text()+'/'+$('.playing').children('#id').text();//+'/'+parseInt(audio.currentTime);
		});
		
		window.play_track = function (td){
			audio.pause();
			$('.playing').removeClass('playing');
			td.parent().addClass('playing');
			$('.player audio').attr('src','/music/'+(parseInt(td.parent().attr("id"))));
			$('.player #title').html("<p><b>Song:</b>  "+td.parent().children('#title').text()+" <br><b>Album:</b>  "+td.parent().children('#album').text()+" <br><b>Artist:</b>  "+td.parent().children('#artist').text()+"</p>");
			audio.play();			
		}
		
		window.pause_toggle=function (){
			audio.paused?audio.play():audio.pause();
		}
		
		window.next_track = function (){
			play_track($('.playing').next().children('td#id'));
		}
		
		window.prev_track=function (){
			play_track($('.playing').prev().children('td#id'));
		}
		
		$('#gutter').click(function(event){
			pos=(event.offsetX/850);
			audio.currentTime=audio.duration*pos;
		});
		
		$(audio).bind("ended",function(){
			next_track();
		});
		
		
		if(window.location.hash!=''){
			hAsh=window.location.hash.split('/')
			if(hAsh[4]!=""){//&&hAsh[5]!=""){
				//audio.startTime=hAsh[5];
				play_track($('.list #'+hAsh[4]).children('td#id'));
									
			}
		}
		$('.list table tbody tr td').live("click",function(){
			play_track($(this));
		});
		$('#playtoggle').live("click",function(){
			pause_toggle();
		});

		
	}
});
