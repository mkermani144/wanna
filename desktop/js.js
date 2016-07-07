$(function(){
	$('#add-input').on('focus', function(){
		$('#add-btn').css('border-color','#00DDE9');
		$(this).css('border-color','#00DDE9');
	});
	$('#add-input').on('blur', function(){
		$('#add-btn').css('border-color','gray');
		$(this).css('border-color','gray');
	});
	$('#add-input').typed({
		strings: ['write encrypt method @2+5', 'read 5 pages of the book @1w+4'],
		typeSpeed: 10,
		backDelay: 60000,
		loop: true
	});
});
