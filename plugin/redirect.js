function redirect(e){
	console.log('called');
	//TODO: remove posiblity of null pointer 
	window.open(document.location.search.substring(1));
}
			
addEventListener('DOMContentLoaded', function () {
	document.querySelector('a').addEventListener('click', redirect);
});
