Array.prototype.forEach.call(document.querySelectorAll('.clearable-input'), function(elm) {
	var input = elm.querySelector('input');

	hideClearIcon();

	input.addEventListener('input', hideClearIcon);
	elm.querySelector('[data-clear-input]').addEventListener('click', function(e) {
		input.value = '';
		hideClearIcon();
	});

	function hideClearIcon(e) {
		var target = (e && e.target) || input;
		target.nextElementSibling.style.display = target.value ? 'block' : 'none';
	}
});