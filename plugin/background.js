function onMessage(request, sender, sendResponse){	
	var icons = { 
		'person': chrome.extension.getURL('images/person.png'), 
		'office': chrome.extension.getURL('images/office.png'), 
		'officeOld': chrome.extension.getURL('images/office.png')
	}
	
	var situations = {
		'app':{
			'priority': 100, 
			'link': 'https://www.facebook.com/apps/application.php?id=',
			'icon': icons.office, 
			'text': 'Linked to application', 
			'textLong': 'This webpage meta tag links it to a Facebook Application. This is the opticial way to link and control who has access to the Facebook insights. '
		}, 
		'page':{
			priority: 101, 
			link: 'https://www.facebook.com/',
			icon: icons.officeOld, 
			text: 'Linked to page',
			textLong: 'This webpage meta tag links it to a facebook page. This menthod is nolonger accpeted for new sites.'
		}, 
		'admin':{
			priority: 1, 
			link: 'https://www.facebook.com/',
			icon: icons.person, 
			text: 'Linked to Facebook profile',
			textLong: 'This webpage meta tag links it to a Facebook profile. This could identify the person with some associated with this site.'
		}
	}
	
	//TODO: process these in a sorted fashion
	for (i in request.links){
		var linkType = request.links[i].type;
		var linkSituation = situations[linkType];
		var tabLink = linkSituation.link + request.links[i].id;
		chrome.pageAction.setIcon({'tabId':sender.tab.id, 'path':linkSituation.icon});
		chrome.pageAction.setTitle({'tabId':sender.tab.id, 'title':linkSituation.text});
		chrome.pageAction.setPopup({'tabId':sender.tab.id, 'popup':'redirect.html?'+ tabLink});
		chrome.pageAction.show(sender.tab.id);
		
	}
	sendResponse();
};

chrome.extension.onMessage.addListener(onMessage);

