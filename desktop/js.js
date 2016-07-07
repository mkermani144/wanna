$(function(){
	$('#add-input').on('focus', function(){
		$('#add-btn').css('border-color','#00DDE9');
		$(this).css('border-color','#00DDE9');
	});
	$('#add-input').on('blur', function(){
		$('#add-btn').css('border-color','gray');
		$(this).css('border-color','gray');
	});
});
