$(function(){
	$('#add-input').on('focus', function(){
		$('#add-btn').css('border-color','rgb(255,50,100)')
		$(this).css('border-color','rgb(255,50,100)')
	})
	$('#add-input').on('blur', function(){
		$('#add-btn').css('border-color','white')
		$(this).css('border-color','white')
	})
	$('#add-input').typed({
		strings: ['write encrypt method @2+5', 'read 5 pages of the book @1w+4'],
		typeSpeed: 10,
		backDelay: 60000,
		loop: true
	})
})
